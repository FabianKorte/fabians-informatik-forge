import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MFAVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mfaCode: string;
  onMfaCodeChange: (code: string) => void;
  onVerify: () => void;
  onVerifyBackupCode?: (code: string) => void;
}

export const MFAVerificationDialog = ({
  open,
  onOpenChange,
  mfaCode,
  onMfaCodeChange,
  onVerify,
  onVerifyBackupCode,
}: MFAVerificationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>2FA bestätigen</DialogTitle>
          <DialogDescription>
            Gib deinen 6-stelligen Code aus der Authenticator-App ein oder nutze einen Backup-Code.
          </DialogDescription>
        </DialogHeader>
        
        {onVerifyBackupCode ? (
          <Tabs defaultValue="totp" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="totp">Authenticator</TabsTrigger>
              <TabsTrigger value="backup">Backup-Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="totp" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="backup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-code">Backup-Code</Label>
                <Input
                  id="backup-code"
                  placeholder="XXXX-XXXX"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length >= 8) {
                      onVerifyBackupCode(value);
                    }
                  }}
                  maxLength={9}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Jeder Backup-Code kann nur einmal verwendet werden.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};
