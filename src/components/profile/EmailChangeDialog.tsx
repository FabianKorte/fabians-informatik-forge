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

export const EmailChangeDialog = () => {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChangeEmail = async () => {
    if (!newEmail) {
      toast({
        title: "Fehler",
        description: "Bitte gib eine neue E-Mail-Adresse ein",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) throw error;

      toast({
        title: "Bestätigungs-E-Mail versendet",
        description: "Prüfe beide E-Mail-Postfächer zur Bestätigung der Änderung",
      });
      setOpen(false);
      setNewEmail("");
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
        <Button variant="outline" size="sm">
          <Mail className="w-4 h-4 mr-2" />
          E-Mail ändern
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>E-Mail-Adresse ändern</DialogTitle>
          <DialogDescription>
            Du erhältst Bestätigungs-E-Mails an beide Adressen. Bestätige beide, um die Änderung abzuschließen.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-email">Neue E-Mail-Adresse</Label>
            <Input
              id="new-email"
              type="email"
              placeholder="neue-email@beispiel.de"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleChangeEmail} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                E-Mail ändern
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
