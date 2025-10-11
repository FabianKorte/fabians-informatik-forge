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
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [has2FA, setHas2FA] = useState(false);

  // 2FA Dialog state
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enrollFactorId, setEnrollFactorId] = useState<string | null>(null);
  const [enrollSecret, setEnrollSecret] = useState<string | null>(null);
  const [enrollUri, setEnrollUri] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

      // Check 2FA status (consider verified/enrolled TOTP or current AAL2)
      const [{ data: factors }, { data: aal }] = await Promise.all([
        supabase.auth.mfa.listFactors(),
        supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      ]);
      const totpArr = factors?.totp || [];
      const hasTotpConsidered = totpArr.some((f: any) => f.status && f.status.toLowerCase() !== 'unverified') || totpArr.length > 0;
      const isAal2 = (aal?.currentLevel || '').toLowerCase() === 'aal2';
      setHas2FA(hasTotpConsidered || isAal2);

      // Fetch profile
      const { data, error } = await supabase
        .from("profiles")
        .select("username, bio, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setUsername(data.username || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Profil konnte nicht geladen werden: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setIsSaving(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          bio,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: "Profil wurde aktualisiert",
      });
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Profil konnte nicht gespeichert werden: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;

    try {
      setIsUploadingAvatar(true);
      const file = e.target.files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Fehler",
          description: "Datei ist zu groß. Maximum 2MB.",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Fehler",
          description: "Bitte nur Bilddateien hochladen.",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const newAvatarUrl = urlData.publicUrl;

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(newAvatarUrl);

      toast({
        title: "Erfolgreich",
        description: "Profilbild wurde aktualisiert",
      });
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Profilbild konnte nicht hochgeladen werden: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const setup2FA = async () => {
    try {
      // Check if 2FA is already active - just show toast
      if (has2FA) {
        toast({
          title: '2FA bereits aktiv',
          description: 'Du hast bereits 2FA eingerichtet.',
        });
        return;
      }

      const enrollWithUniqueName = async () => {
        const friendly = `FK Authenticator ${new Date().toISOString().slice(0, 19).replace('T',' ')}`;
        return await supabase.auth.mfa.enroll({
          factorType: 'totp',
          friendlyName: friendly,
        });
      };

      let { data, error } = await enrollWithUniqueName();

      if (error) throw error;

      if (data) {
        setEnrollFactorId(data.id);
        const secret = (data as any).totp?.secret || null;
        let uri = (data as any).totp?.uri || null;

        if (!uri && secret) {
          const email = user?.email || 'user';
          uri = `otpauth://totp/FK Lernplattform:${encodeURIComponent(email)}?secret=${secret}&issuer=FK%20Lernplattform`;
        }

        setEnrollSecret(secret);
        setEnrollUri(uri);

        if (uri) {
          const qrCodeDataUrl = await QRCode.toDataURL(uri);
          setQrCode(qrCodeDataUrl);
        }

        setShow2FADialog(true);
      }
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "2FA konnte nicht eingerichtet werden: " + error.message,
        variant: "destructive",
      });
    }
  };

  const verify2FA = async () => {
    try {
      let factorId = enrollFactorId;

      if (!factorId && enrollSecret) {
        const { data: factors } = await supabase.auth.mfa.listFactors();
        const factor = factors?.totp?.find((f: any) => f.totp?.secret === enrollSecret);
        factorId = factor?.id || null;
      }

      if (!factorId) {
        throw new Error("Kein Faktor gefunden");
      }

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verificationCode,
      });

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: "2FA wurde aktiviert",
      });

      setShow2FADialog(false);
      setVerificationCode("");
      setEnrollFactorId(null);
      setEnrollSecret(null);
      setEnrollUri(null);
      setQrCode("");
      setHas2FA(true);
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Verifizierung fehlgeschlagen: " + error.message,
        variant: "destructive",
      });
    }
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
        title: 'Erfolgreich',
        description: '2FA wurde deaktiviert',
      });
      
      setHas2FA(false);
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
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>
                    {username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUploadingAvatar}
                      asChild
                    >
                      <span>
                        {isUploadingAvatar ? (
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
                    accept="image/*"
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

              <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
                <Input value={user?.email || ""} disabled />
                <p className="text-xs text-muted-foreground">
                  E-Mail kann derzeit nicht geändert werden
                </p>
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
                ) : (
                  <Button onClick={setup2FA} className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    2FA einrichten
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2FA Setup Dialog */}
      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>2FA einrichten</DialogTitle>
            <DialogDescription>
              Scanne den QR-Code mit deiner Authenticator-App
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {qrCode && (
              <div className="flex justify-center">
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
            )}
            {enrollSecret && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  Oder gib diesen Code manuell ein:
                </p>
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  {enrollSecret}
                </code>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="verification-code">Bestätigungscode</Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="6-stelliger Code"
                maxLength={6}
              />
            </div>
            <Button onClick={verify2FA} className="w-full">
              Verifizieren
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
