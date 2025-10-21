import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, Shield, ShieldOff, ArrowLeft, User, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TwoFactorSetupDialog } from "@/components/auth/TwoFactorSetupDialog";
import { EmailChangeDialog } from "@/components/profile/EmailChangeDialog";
import { use2FA } from "@/hooks/use2FA";
import { use2FABackup } from "@/hooks/use2FABackup";
import { useProfile } from "@/hooks/useProfile";
import { logger } from "@/lib/logger";
import { sanitizeInput, sanitizeBio } from "@/lib/sanitization";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { profile, isLoading, updateProfile, uploadAvatar } = useProfile(user?.id);
  
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [has2FA, setHas2FA] = useState(false);
  const [remainingBackupCodes, setRemainingBackupCodes] = useState(0);

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

  const {
    backupCodes,
    isGenerating: isGeneratingBackup,
    generateBackupCodes,
    getRemainingBackupCodes,
    downloadBackupCodes,
  } = use2FABackup();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    check2FAStatus();
    updateBackupCodeCount();
  }, [user, navigate]);

  const updateBackupCodeCount = async () => {
    if (!user?.id) return;
    const count = await getRemainingBackupCodes(user.id);
    setRemainingBackupCodes(count);
  };

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const check2FAStatus = async () => {
    try {
      const [{ data: factors }, { data: aal }] = await Promise.all([
        supabase.auth.mfa.listFactors(),
        supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      ]);
      const totpArr = factors?.totp || [];
      const hasTotpConsidered = totpArr.some((f: any) => f.status && f.status.toLowerCase() !== 'unverified') || totpArr.length > 0;
      const isAal2 = (aal?.currentLevel || '').toLowerCase() === 'aal2';
      setHas2FA(hasTotpConsidered || isAal2);
    } catch (error: any) {
      logger.error('Error checking 2FA status:', error);
    }
  };

  const handleSaveProfile = () => {
    const sanitizedUsername = sanitizeInput(username, 30);
    const sanitizedBio = sanitizeBio(bio);
    updateProfile.mutate({ username: sanitizedUsername, bio: sanitizedBio });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Ungültiger Dateityp',
          description: 'Bitte lade nur JPG, PNG, WEBP oder GIF Bilder hoch.',
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast({
          title: 'Datei zu groß',
          description: 'Das Bild darf maximal 5MB groß sein.',
          variant: 'destructive',
        });
        return;
      }

      uploadAvatar.mutate(file);
    }
  };

  const handleSetup2FA = async () => {
    if (has2FA) {
      toast({
        title: '2FA bereits aktiv',
        description: 'Du hast bereits 2FA eingerichtet.',
      });
      return;
    }
    await setup2FA(user?.email);
  };

  const handleVerify2FA = async () => {
    const success = await verify2FA();
    if (success) {
      setHas2FA(true);
      // Generate backup codes after successful 2FA setup
      if (user?.id) {
        await generateBackupCodes(user.id);
        await updateBackupCodeCount();
      }
    }
  };

  const handleRegenerateBackupCodes = async () => {
    if (!user?.id) return;
    if (!confirm('Möchtest du neue Backup-Codes generieren? Die alten werden ungültig.')) return;
    
    await generateBackupCodes(user.id);
    await updateBackupCodeCount();
    toast({
      title: 'Backup-Codes generiert',
      description: 'Speichere die neuen Backup-Codes an einem sicheren Ort',
    });
  };

  const disable2FA = async () => {
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totpFactor = factors?.totp?.[0];
      
      if (!totpFactor) {
        toast({
          title: 'Keine 2FA vorhanden',
          description: '2FA ist nicht aktiviert',
        });
        return;
      }

      const { error } = await supabase.auth.mfa.unenroll({ factorId: totpFactor.id });
      
      if (error) throw error;

      toast({
        title: '✓ Erfolgreich',
        description: '2FA wurde deaktiviert',
        className: 'animate-fade-in',
      });
      
      setHas2FA(false);
      window.dispatchEvent(new CustomEvent('2fa-status-changed'));
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: 'Fehler beim Deaktivieren: ' + error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Mein Profil</h1>
            <p className="text-muted-foreground">Verwalte deine Kontoinformationen</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profilinformationen
              </CardTitle>
              <CardDescription>Bearbeite dein öffentliches Profil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>
                    {username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={uploadAvatar.isPending}
                      asChild
                    >
                      <span>
                        {uploadAvatar.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        Profilbild ändern
                      </span>
                    </Button>
                  </Label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Dein Benutzername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Erzähle etwas über dich..."
                  rows={4}
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={updateProfile.isPending} className="w-full">
                {updateProfile.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Profil speichern
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Sicherheitseinstellungen
              </CardTitle>
              <CardDescription>Verwalte deine Kontosicherheit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>E-Mail-Adresse</Label>
                <div className="flex gap-2">
                  <Input value={user?.email || ""} disabled className="flex-1" />
                  <EmailChangeDialog />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Zwei-Faktor-Authentifizierung
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {has2FA 
                    ? "2FA ist aktiv und schützt dein Konto"
                    : "Erhöhe die Sicherheit deines Kontos mit 2FA"
                  }
                </p>

                {has2FA ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Backup-Codes</p>
                          <p className="text-xs text-muted-foreground">
                            {remainingBackupCodes} von 10 verfügbar
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleRegenerateBackupCodes}
                          disabled={isGeneratingBackup}
                        >
                          {isGeneratingBackup ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Neu generieren'
                          )}
                        </Button>
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <ShieldOff className="w-4 h-4 mr-2" />
                            2FA deaktivieren
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>2FA wirklich deaktivieren?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Dein Konto ist dann weniger gut geschützt. Du kannst 2FA jederzeit wieder aktivieren.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={disable2FA}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Deaktivieren
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </>
                ) : (
                  <Button onClick={handleSetup2FA} className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    2FA einrichten
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TwoFactorSetupDialog
        open={show2FADialog}
        onOpenChange={setShow2FADialog}
        qrCode={qrCode}
        enrollSecret={enrollSecret}
        enrollUri={enrollUri}
        verificationCode={verificationCode}
        onVerificationCodeChange={setVerificationCode}
        onVerify={handleVerify2FA}
        backupCodes={backupCodes}
        onDownloadBackupCodes={() => downloadBackupCodes(backupCodes)}
      />
    </div>
  );
};

export default Profile;
