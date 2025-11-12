import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Fetch user's learning analytics
    const { data: analytics, error: analyticsError } = await supabase
      .from("learning_analytics")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (analyticsError) throw analyticsError;

    // Delete old recommendations
    await supabase
      .from("ai_recommendations")
      .delete()
      .eq("user_id", user.id);

    // Analyze data and generate recommendations
    const recommendations: Array<{
      user_id: string;
      category_id: string;
      module_type: string;
      module_index: number;
      recommendation_reason: string;
      priority: number;
    }> = [];

    if (!analytics || analytics.length === 0) {
      // No data yet - recommend starting with basics
      recommendations.push({
        user_id: user.id,
        category_id: "grundlagen-it",
        module_type: "flashcards",
        module_index: 0,
        recommendation_reason: "Beginne mit den IT-Grundlagen, um eine solide Basis aufzubauen.",
        priority: 5,
      });
    } else {
      // Group by category and calculate performance
      const categoryStats: Record<string, { total: number; count: number; sessions: number }> = {};
      
      analytics.forEach((item: any) => {
        if (!categoryStats[item.category_id]) {
          categoryStats[item.category_id] = { total: 0, count: 0, sessions: 0 };
        }
        categoryStats[item.category_id].total += item.performance_score;
        categoryStats[item.category_id].count += 1;
        categoryStats[item.category_id].sessions += 1;
      });

      // Find weak categories (performance < 70%)
      Object.entries(categoryStats).forEach(([categoryId, stats]) => {
        const avgPerformance = stats.total / stats.count;
        if (avgPerformance < 70 && stats.sessions >= 2) {
          recommendations.push({
            user_id: user.id,
            category_id: categoryId,
            module_type: "quiz",
            module_index: 0,
            recommendation_reason: `Deine Performance in dieser Kategorie liegt bei ${Math.round(avgPerformance)}%. Wiederhole die Inhalte, um dich zu verbessern.`,
            priority: 4,
          });
        }
      });

      // Find categories with few sessions
      Object.entries(categoryStats).forEach(([categoryId, stats]) => {
        if (stats.sessions < 3) {
          recommendations.push({
            user_id: user.id,
            category_id: categoryId,
            module_type: "flashcards",
            module_index: 0,
            recommendation_reason: "Du hast diese Kategorie erst wenig geübt. Vertiefe dein Wissen durch mehr Übung.",
            priority: 3,
          });
        }
      });

      // Recommend based on time performance
      const timeStats: Record<number, { total: number; count: number }> = {};
      analytics.forEach((item: any) => {
        if (!timeStats[item.session_hour]) {
          timeStats[item.session_hour] = { total: 0, count: 0 };
        }
        timeStats[item.session_hour].total += item.performance_score;
        timeStats[item.session_hour].count += 1;
      });

      const bestHour = Object.entries(timeStats)
        .map(([hour, stats]) => ({
          hour: parseInt(hour),
          avgPerf: stats.total / stats.count,
        }))
        .sort((a, b) => b.avgPerf - a.avgPerf)[0];

      if (bestHour) {
        const currentHour = new Date().getHours();
        if (Math.abs(currentHour - bestHour.hour) <= 2) {
          recommendations.push({
            user_id: user.id,
            category_id: Object.keys(categoryStats)[0] || "grundlagen-it",
            module_type: "quiz",
            module_index: 0,
            recommendation_reason: `Jetzt ist eine gute Zeit zum Lernen! Du performst am besten um ${bestHour.hour}:00 Uhr.`,
            priority: 5,
          });
        }
      }
    }

    // Insert recommendations (limit to top 5)
    if (recommendations.length > 0) {
      const topRecommendations = recommendations
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 5);

      const { error: insertError } = await supabase
        .from("ai_recommendations")
        .insert(topRecommendations);

      if (insertError) throw insertError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: recommendations.length,
        message: "Empfehlungen wurden erfolgreich generiert" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});