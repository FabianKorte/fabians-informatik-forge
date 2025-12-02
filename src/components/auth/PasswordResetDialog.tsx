import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";

export const PasswordResetDialog = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: "Fehler",
        description: "Bitte gib deine E-Mail-Adresse ein",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate password reset link
      const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (resetError) throw resetError;

      // Send custom email via Resend
      const resetLink = `${window.location.origin}/auth?reset=true`;
      
      const { error: emailError } = await supabase.functions.invoke('send-password-reset', {
        body: { 
          email,
          resetLink 
        }
      });

      if (emailError) {
        console.error('Custom email error:', emailError);
        // Still show success to user since Supabase sent the default email
      }

      toast({
        title: "E-Mail versendet",
        description: "Prüfe dein E-Mail-Postfach für den Reset-Link",
      });
      setOpen(false);
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0 text-sm">
          Passwort vergessen?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Passwort zurücksetzen</DialogTitle>
          <DialogDescription>
            Gib deine E-Mail-Adresse ein. Wir senden dir einen Link zum Zurücksetzen.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">E-Mail-Adresse</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="admin@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleResetPassword} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Reset-Link senden
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
