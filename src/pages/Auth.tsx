import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, LogIn, UserPlus, Eye, EyeOff, Shield, Copy as CopyIcon, ExternalLink } from "lucide-react";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, recordLoginAttempt, clearLoginAttempts } from "@/lib/rateLimit";
import { checkServerRateLimit, recordServerLoginAttempt, clearServerLoginAttempts } from "@/lib/serverRateLimit";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { MFAVerificationDialog } from "@/components/auth/MFAVerificationDialog";
import { PasswordResetDialog } from "@/components/auth/PasswordResetDialog";
import { use2FA } from "@/hooks/use2FA";
import { use2FABackup } from "@/hooks/use2FABackup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "qrcode";

const authSchema = z.object({
  email: z.string().trim().email("Ungültige E-Mail-Adresse"),
  password: z.string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .regex(/[0-9]/, "Passwort muss mindestens eine Zahl enthalten")
    .regex(/[^A-Za-z0-9]/, "Passwort muss mindestens ein Sonderzeichen enthalten"),
  username: z.string().trim().min(3, "Benutzername muss mindestens 3 Zeichen lang sein").optional()
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showMfaDialog, setShowMfaDialog] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaChallengeId, setMfaChallengeId] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [suppressAutoRedirect, setSuppressAutoRedirect] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const location = useLocation();
  const [autoMfaTriggered, setAutoMfaTriggered] = useState(false);
  
  const {
    show2FADialog,
    setShow2FADialog,
    qrCode,
    verificationCode,
    setVerificationCode,
    enrollSecret,
    enrollUri,
    setup2FA,
    verify2FA,
  } = use2FA();
  
  const { verifyBackupCode } = use2FABackup();

  // Remove auto MFA trigger from query param - it should only happen during login flow
  useEffect(() => {
    if (user && !autoMfaTriggered) {
      setAutoMfaTriggered(true);
    }
  }, [user, autoMfaTriggered]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requireMfa = params.get("requireMfa") === "1";
    if (user && !requireMfa && !show2FADialog && !showMfaDialog) {
      if (suppressAutoRedirect) return;
      navigate("/");
    }
  }, [user, show2FADialog, showMfaDialog, navigate, location.search, suppressAutoRedirect]);


  const handleMfaVerify = async () => {
    try {
      // Ensure factor and challenge exist
      let factorId = mfaFactorId;
      if (!factorId) {
        const factors = await supabase.auth.mfa.listFactors();
        factorId = factors.data?.totp?.[0]?.id || null;
        setMfaFactorId(factorId);
      }
      if (!factorId) throw new Error('Kein MFA‑Faktor gefunden');

      let challengeId = mfaChallengeId;
      if (!challengeId) {
        const { data: ch, error: chErr } = await supabase.auth.mfa.challenge({ factorId });
        if (chErr) throw chErr;
        challengeId = ch.id;
        setMfaChallengeId(challengeId);
      }

      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: mfaCode,
      });
      if (error) throw error;
      setShowMfaDialog(false);
      setMfaCode('');
      setMfaChallengeId(null);
      setMfaFactorId(null);
      toast({ title: '2FA bestätigt', description: 'Anmeldung verifiziert' });
      setSuppressAutoRedirect(false);
      navigate('/');
    } catch (error: any) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleBackupCodeVerify = async (backupCode: string) => {
    if (!user?.id) return;
    
    try {
      const isValid = await verifyBackupCode(user.id, backupCode);
      
      if (isValid) {
        setShowMfaDialog(false);
        setMfaCode('');
        setMfaChallengeId(null);
        setMfaFactorId(null);
        toast({ 
          title: 'Backup-Code akzeptiert', 
          description: 'Anmeldung erfolgreich. Dieser Code kann nicht mehr verwendet werden.' 
        });
        setSuppressAutoRedirect(false);
        navigate('/');
      } else {
        toast({ 
          title: 'Ungültiger Code', 
          description: 'Dieser Backup-Code ist ungültig oder wurde bereits verwendet.', 
          variant: 'destructive' 
        });
      }
    } catch (error: any) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent, mode: "login" | "signup") => {
    e.preventDefault();
    
    // Only validate password requirements for signup
    if (mode === "signup") {
      const validationData = { email, password, username };
      const validationResult = authSchema.safeParse(validationData);
      
      if (!validationResult.success) {
        toast({
          title: "Eingabefehler",
          description: validationResult.error.issues[0].message,
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
    } else {
      // Simple validation for login
      if (!email || !password) {
        toast({
          title: "Eingabefehler",
          description: "Bitte E-Mail und Passwort eingeben",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
    }

    setIsLoading(true);
    if (mode === "login") setSuppressAutoRedirect(true);

    try {
      if (mode === "login") {
        // Check both client and server-side rate limits
        const [clientCheck, serverCheck] = await Promise.all([
          Promise.resolve(checkRateLimit(email)),
          checkServerRateLimit(email)
        ]);
        
        // Use server-side check as primary, fallback to client-side
        const rateLimitCheck = serverCheck.allowed !== undefined ? serverCheck : clientCheck;
        
        if (!rateLimitCheck.allowed) {
          const resetTime = rateLimitCheck.resetTime || Date.now();
          const minutesLeft = Math.ceil((resetTime - Date.now()) / 60000);
          throw new Error(
            `Zu viele fehlgeschlagene Login-Versuche. Bitte versuche es in ${minutesLeft} Minuten erneut.`
          );
        }
        
        const { error } = await signIn(email, password, rememberMe);
        if (error) {
          // Record failed attempt both client and server-side
          recordLoginAttempt(email);
          await recordServerLoginAttempt(email);
          
          if (error.message.includes("Invalid login credentials")) {
            const remaining = rateLimitCheck.remainingAttempts - 1;
            throw new Error(
              `Ungültige Anmeldedaten. ${remaining > 0 ? `Noch ${remaining} Versuche übrig.` : ''}`
            );
          }
          throw error;
        }
        
        // Clear login attempts on successful login
        clearLoginAttempts(email);
        await clearServerLoginAttempts(email);
      } else {
        // Sign up with username in metadata
        const { error } = await signUp(email, password, username);
        if (error) {
          if (error.message.includes("User already registered")) {
            throw new Error("Benutzer ist bereits registriert");
          }
          throw error;
        }
      }

      toast({
        title: mode === "login" ? "✓ Anmeldung erfolgreich" : "✓ Registrierung erfolgreich",
        description: mode === "login" 
          ? "Willkommen zurück!" 
          : "Dein Account wurde erstellt! Bitte bestätige deine E-Mail-Adresse.",
        duration: 8000,
        className: "animate-fade-in",
      });

      // After successful login/signup, redirect appropriately
      if (mode === "signup") {
        // For signup, just show the success message - email confirmation is required
        return;
      }
      
      // For login: Check for MFA requirement
      const factors = await supabase.auth.mfa.listFactors();
      const totp = factors.data?.totp?.[0];
      
      if (totp) {
        // User has 2FA enabled - check current assurance level
        const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        const currentLevel = (aalData?.currentLevel || '').toLowerCase();
        
        if (currentLevel !== 'aal2') {
          // Need to challenge for 2FA
          const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({ 
            factorId: totp.id 
          });
          
          if (challengeErr) {
            console.error('MFA challenge error:', challengeErr);
            throw challengeErr;
          }
          
          setMfaFactorId(totp.id);
          setMfaChallengeId(challenge.id);
          setShowMfaDialog(true);
          
          toast({ 
            title: '2FA erforderlich', 
            description: 'Bitte gib den 6-stelligen Code aus deiner Authenticator-App ein.',
            duration: 5000,
          });
          
          setIsLoading(false);
          return; // Don't navigate yet - wait for MFA verification
        }
      }
      
      // No MFA required or already verified - proceed to home
      setSuppressAutoRedirect(false);
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Ein Fehler ist aufgetreten",
        variant: "destructive",
        duration: 5000,
      });
      setSuppressAutoRedirect(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Button>
        
        <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin-Bereich</CardTitle>
          <CardDescription>
            Melde dich an oder erstelle einen Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Anmelden</TabsTrigger>
              <TabsTrigger value="signup">Registrieren</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-Mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="admin@beispiel.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Passwort</Label>
                    <PasswordResetDialog />
                  </div>
                  <PasswordInput
                    id="login-password"
                    value={password}
                    onChange={setPassword}
                    disabled={isLoading}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-input bg-background"
                  />
                  <Label htmlFor="remember-me" className="text-sm font-normal cursor-pointer">
                    Angemeldet bleiben
                  </Label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Wird angemeldet...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Anmelden
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={(e) => handleSubmit(e, "signup")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Benutzername</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="z.B. max_mustermann"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Mindestens 3 Zeichen
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-Mail</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="admin@beispiel.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Passwort</Label>
                  <PasswordInput
                    id="signup-password"
                    value={password}
                    onChange={setPassword}
                    disabled={isLoading}
                    required
                    showStrength
                  />
                  <p className="text-xs text-muted-foreground">
                    Mind. 8 Zeichen, 1 Großbuchstabe, 1 Zahl, 1 Sonderzeichen
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Wird registriert...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Registrieren
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        </Card>

        {user && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Zwei-Faktor-Authentifizierung</CardTitle>
              <CardDescription>
                Erhöhe die Sicherheit deines Accounts mit 2FA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setup2FA(user?.email)} className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                2FA einrichten
              </Button>
            </CardContent>
          </Card>
        )}

        <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
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
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button onClick={verify2FA} className="w-full">
                Verifizieren
              </Button>
              <p className="text-xs text-muted-foreground">
                Tipp: Wenn Scannen nicht funktioniert, nutze „In Auth‑App öffnen“ (mobil) oder füge den „Manueller Code (Secret)“ in deiner App hinzu.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <MFAVerificationDialog
          open={showMfaDialog}
          onOpenChange={setShowMfaDialog}
          mfaCode={mfaCode}
          onMfaCodeChange={setMfaCode}
          onVerify={handleMfaVerify}
          onVerifyBackupCode={handleBackupCodeVerify}
        />
      </div>
    </div>
  );
}
