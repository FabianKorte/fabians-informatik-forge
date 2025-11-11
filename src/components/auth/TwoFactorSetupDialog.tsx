import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy as CopyIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TwoFactorSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCode: string;
  enrollSecret: string | null;
  enrollUri: string | null;
  verificationCode: string;
  onVerificationCodeChange: (code: string) => void;
  onVerify: () => void;
  backupCodes?: string[];
  onDownloadBackupCodes?: () => void;
}

export const TwoFactorSetupDialog = ({
  open,
  onOpenChange,
  qrCode,
  enrollSecret,
  enrollUri,
  verificationCode,
  onVerificationCodeChange,
  onVerify,
  backupCodes = [],
  onDownloadBackupCodes,
}: TwoFactorSetupDialogProps) => {
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>2FA einrichten</DialogTitle>
          <DialogDescription>
            Scanne den QR‑Code mit deiner Authenticator‑App (z. B. Authy, Google Authenticator) oder füge den Code manuell hinzu.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {qrCode && (
            <div className="flex justify-center">
              <div className="p-3 bg-card rounded-md border">
                <img src={qrCode} alt="2FA QR Code" className="w-56 h-56 object-contain" />
              </div>
            </div>
          )}

          {enrollUri && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={enrollUri}>
                  <ExternalLink className="w-4 h-4 mr-2" /> In Auth‑App öffnen
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(enrollUri);
                    toast({ title: 'Kopiert', description: 'otpauth Link kopiert' });
                  } catch {}
                }}
              >
                <CopyIcon className="w-4 h-4 mr-2" /> Link kopieren
              </Button>
            </div>
          )}

          {enrollSecret && (
            <div className="space-y-1">
              <Label>Manueller Code (Secret)</Label>
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 rounded bg-muted text-sm break-all flex-1">{enrollSecret}</code>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(enrollSecret);
                      toast({ title: 'Kopiert', description: 'Secret kopiert' });
                    } catch {}
                  }}
                >
                  <CopyIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="verification-code">Verifizierungscode</Label>
            <Input
              id="verification-code"
              placeholder="6-stelliger Code"
              value={verificationCode}
              onChange={(e) => onVerificationCodeChange(e.target.value)}
              maxLength={6}
            />
          </div>
          <Button onClick={onVerify} className="w-full">
            Verifizieren
          </Button>
          
          {backupCodes.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">Backup-Codes</h4>
                  <p className="text-xs text-muted-foreground">
                    Speichere diese Codes sicher! Sie können jeweils einmal als Ersatz für deinen 2FA-Code verwendet werden.
                  </p>
                </div>
                {onDownloadBackupCodes && (
                  <Button variant="outline" size="sm" onClick={onDownloadBackupCodes}>
                    Download
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {backupCodes.map((code, i) => (
                  <div key={code} className="p-2 bg-background rounded border">
                    {i + 1}. {code}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            Tipp: Wenn Scannen nicht funktioniert, nutze „In Auth‑App öffnen" (mobil) oder füge den „Manueller Code (Secret)" in deiner App hinzu.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
