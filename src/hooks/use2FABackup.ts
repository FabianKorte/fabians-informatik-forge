import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Simple hash function for backup codes
const hashCode = async (code: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Generate readable backup codes (8 characters: XXXX-XXXX)
const generateBackupCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing chars
  let code = '';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const use2FABackup = () => {
  const { toast } = useToast();
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBackupCodes = async (userId: string): Promise<string[]> => {
    setIsGenerating(true);
    try {
      // Delete existing unused backup codes
      await supabase
        .from('user_2fa_backup_codes')
        .delete()
        .eq('user_id', userId)
        .is('used_at', null);

      // Generate 10 new backup codes
      const codes: string[] = [];
      const codeHashes: { user_id: string; code_hash: string }[] = [];

      for (let i = 0; i < 10; i++) {
        const code = generateBackupCode();
        codes.push(code);
        const hash = await hashCode(code);
        codeHashes.push({ user_id: userId, code_hash: hash });
      }

      // Store hashed codes
      const { error } = await supabase
        .from('user_2fa_backup_codes')
        .insert(codeHashes);

      if (error) throw error;

      setBackupCodes(codes);
      return codes;
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: 'Backup-Codes konnten nicht generiert werden: ' + error.message,
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  const verifyBackupCode = async (userId: string, code: string): Promise<boolean> => {
    try {
      const hash = await hashCode(code.trim().toUpperCase());

      // Find unused backup code
      const { data: backupCode, error: fetchError } = await supabase
        .from('user_2fa_backup_codes')
        .select('id')
        .eq('user_id', userId)
        .eq('code_hash', hash)
        .is('used_at', null)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!backupCode) return false;

      // Mark as used
      const { error: updateError } = await supabase
        .from('user_2fa_backup_codes')
        .update({ used_at: new Date().toISOString() })
        .eq('id', backupCode.id);

      if (updateError) throw updateError;

      return true;
    } catch (error: any) {
      console.error('Backup code verification error:', error);
      return false;
    }
  };

  const getRemainingBackupCodes = async (userId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from('user_2fa_backup_codes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .is('used_at', null);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error fetching remaining backup codes:', error);
      return 0;
    }
  };

  const downloadBackupCodes = (codes: string[]) => {
    const content = [
      '2FA Backup-Codes',
      '==================',
      '',
      'Diese Codes können jeweils einmal als Ersatz für deinen 2FA-Code verwendet werden.',
      'Bewahre sie an einem sicheren Ort auf!',
      '',
      ...codes.map((code, i) => `${i + 1}. ${code}`),
      '',
      `Generiert am: ${new Date().toLocaleString('de-DE')}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2fa-backup-codes-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    backupCodes,
    isGenerating,
    generateBackupCodes,
    verifyBackupCode,
    getRemainingBackupCodes,
    downloadBackupCodes,
  };
};
