import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MFAVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mfaCode: string;
  onMfaCodeChange: (code: string) => void;
  onVerify: () => void;
}

export const MFAVerificationDialog = ({
  open,
  onOpenChange,
  mfaCode,
  onMfaCodeChange,
  onVerify,
}: MFAVerificationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>2FA bestätigen</DialogTitle>
          <DialogDescription>
            Bitte gib den 6-stelligen Code aus deiner Authenticator‑App ein, um die Anmeldung abzuschließen.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mfa-code">Bestätigungscode</Label>
            <Input
              id="mfa-code"
              placeholder="6-stelliger Code"
              value={mfaCode}
              onChange={(e) => onMfaCodeChange(e.target.value)}
              maxLength={6}
              autoFocus
            />
          </div>
          <Button onClick={onVerify} className="w-full">
            Bestätigen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
