import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

export const use2FA = () => {
  const { toast } = useToast();
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enrollFactorId, setEnrollFactorId] = useState<string | null>(null);
  const [enrollSecret, setEnrollSecret] = useState<string | null>(null);
  const [enrollUri, setEnrollUri] = useState<string | null>(null);

  const setup2FA = async (userEmail?: string) => {
    const enrollWithUniqueName = async () => {
      const friendly = `FK Authenticator ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`;
      return await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: friendly,
      });
    };

    try {
      const { data: existingData } = await supabase.auth.mfa.listFactors();
      const existing = existingData?.totp?.[0];

      let { data, error } = await enrollWithUniqueName();

      if (error && /already exists/i.test(error.message)) {
        if (existing?.id) {
          await supabase.auth.mfa.unenroll({ factorId: existing.id });
          const retried = await enrollWithUniqueName();
          data = retried.data;
          error = retried.error as any;
        }
      }

      if (error) throw error;

      if (data) {
        setEnrollFactorId(data.id);
        const secret = (data as any).totp?.secret || null;
        let uri = (data as any).totp?.uri || null;

        if (secret && uri && userEmail) {
          uri = `otpauth://totp/FK%20Lernplattform:${encodeURIComponent(userEmail)}?secret=${secret}&issuer=FK%20Lernplattform&algorithm=SHA1&digits=6&period=30`;
        }

        setEnrollSecret(secret);
        setEnrollUri(uri);

        let qrSrc = '';
        try {
          if (uri) {
            qrSrc = await QRCode.toDataURL(uri, {
              width: 256,
              margin: 2,
              color: { dark: '#000000', light: '#ffffff' },
              errorCorrectionLevel: 'M',
            });
          }
        } catch {}

        if (!qrSrc) {
          const rawQr = (data as any).totp?.qr_code || '';
          const isDataUrl = typeof rawQr === 'string' && rawQr.startsWith('data:');
          const isSvg = typeof rawQr === 'string' && rawQr.trim().startsWith('<svg');
          qrSrc = isDataUrl ? rawQr : isSvg ? `data:image/svg+xml;utf8,${encodeURIComponent(rawQr)}` : '';
        }

        setQrCode(qrSrc);
        setShow2FADialog(true);
      }
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: '2FA konnte nicht eingerichtet werden: ' + error.message,
        variant: 'destructive',
      });
    }
  };

  const verify2FA = async () => {
    try {
      let factorId = enrollFactorId;
      if (!factorId) {
        const factors = await supabase.auth.mfa.listFactors();
        factorId = factors.data?.totp?.[0]?.id || null;
      }
      if (!factorId) throw new Error("Kein 2FA-Faktor gefunden");

      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });
      if (challengeError) throw challengeError;

      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verificationCode,
      });

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: "2FA wurde erfolgreich aktiviert",
      });

      setShow2FADialog(false);
      setVerificationCode("");
      setEnrollFactorId(null);
      setEnrollSecret(null);
      setEnrollUri(null);

      window.dispatchEvent(new CustomEvent('2fa-status-changed'));
      
      return true;
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Verifizierung fehlgeschlagen: " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const reset2FADialog = () => {
    setShow2FADialog(false);
    setQrCode("");
    setVerificationCode("");
    setEnrollFactorId(null);
    setEnrollSecret(null);
    setEnrollUri(null);
  };

  return {
    show2FADialog,
    setShow2FADialog,
    qrCode,
    verificationCode,
    setVerificationCode,
    enrollSecret,
    enrollUri,
    setup2FA,
    verify2FA,
    reset2FADialog,
  };
};
