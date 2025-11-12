import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { MessageSquare, RefreshCw, User, Clock, Lock, Search, Bug, Lightbulb, Star, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { logger } from "@/lib/logger";

const FEEDBACK_CATEGORIES = {
  general: { label: 'Allgemein', icon: MessageSquare, color: 'text-gray-500' },
  bug: { label: 'Fehlermeldung', icon: Bug, color: 'text-red-500' },
  feature: { label: 'Feature-Wunsch', icon: Star, color: 'text-yellow-500' },
  suggestion: { label: 'Verbesserungsvorschlag', icon: Lightbulb, color: 'text-blue-500' },
};



interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
  status: string;
  category: keyof typeof FEEDBACK_CATEGORIES;
  upvotes: number;
}

const FeedbackItem = ({ feedback, isAdmin }: { feedback: Feedback; isAdmin: boolean }) => {
  
  const categoryConfig = FEEDBACK_CATEGORIES[feedback.category] || FEEDBACK_CATEGORIES.general;
  const CategoryIcon = categoryConfig.icon;

  return (
    <div className="space-y-3 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <User className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="font-medium text-sm">{feedback.name}</span>
          
          <Badge variant="outline" className={`text-xs ${categoryConfig.color}`}>
            <CategoryIcon className="w-3 h-3 mr-1" />
            {categoryConfig.label}
          </Badge>
          
          {feedback.status && (
            <Badge variant={
              feedback.status === 'resolved' ? 'default' :
              feedback.status === 'in_progress' ? 'secondary' :
              'outline'
            } className="text-xs">
              {feedback.status === 'new' ? 'Neu' :
               feedback.status === 'in_progress' ? 'In Arbeit' :
               'Erledigt'}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <Clock className="w-3 h-3" />
          {formatDistanceToNow(new Date(feedback.created_at), {
            addSuffix: true,
            locale: de
          })}
        </div>
      </div>
      
      <p className="text-sm leading-relaxed pl-6">{feedback.message}</p>
      
    </div>
  );
};

export const FeedbackList = ({ refreshTrigger }: { refreshTrigger?: number }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent'>('recent');
  const { isAdmin } = useAuth();

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setHasAccess(true);
      setFeedbacks((data || []) as Feedback[]);
    } catch (error) {
      logger.error('Error fetching feedbacks:', error);
      setHasAccess(false);
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshTrigger, isAdmin]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...feedbacks];

    // Search filter
    if (searchQuery) {
      result = result.filter(f => 
        f.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(f => f.category === categoryFilter);
    }

    // Sort by recent
    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setFilteredFeedbacks(result);
  }, [feedbacks, searchQuery, categoryFilter, sortBy]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Feedback wird geladen...</p>
        </CardContent>
      </Card>
    );
  }

  // Show access restricted message for non-admins
  if (!isLoading && !hasAccess) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Feedback-Übersicht
          </CardTitle>
          <CardDescription>
            Feedbacks können nur von Administratoren eingesehen werden.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">Geschützter Bereich</p>
            <p className="text-sm text-muted-foreground">
              Um Feedbacks einzusehen, melde dich als Administrator an.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Feedback List */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Feedback-Verwaltung
                <Badge variant="secondary" className="ml-2">
                  {filteredFeedbacks.length} {filteredFeedbacks.length === 1 ? 'Eintrag' : 'Einträge'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Übersicht aller eingereichten Feedbacks
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchFeedbacks}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Aktualisieren
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {Object.entries(FEEDBACK_CATEGORIES).map(([key, { label, icon: Icon, color }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${color}`} />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">
                {searchQuery || categoryFilter !== 'all' 
                  ? 'Keine Feedbacks gefunden.' 
                  : 'Noch kein Feedback vorhanden.'}
              </p>
              {!searchQuery && categoryFilter === 'all' && (
                <p className="text-sm text-muted-foreground">Sei der Erste, der Feedback gibt!</p>
              )}
            </div>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <FeedbackItem key={feedback.id} feedback={feedback} isAdmin={false} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
