import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeUsername, sanitizeBio } from '@/lib/sanitization';

interface ProfileData {
  username: string;
  bio: string;
  avatar_url: string;
}

export const useProfile = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async ({ signal }) => {
      if (!userId) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username, bio, avatar_url')
        .eq('id', userId)
        .abortSignal(signal)
        .maybeSingle();

      if (error) throw error;
      return data as ProfileData | null;
    },
    enabled: !!userId,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<ProfileData>) => {
      if (!userId) throw new Error('No user ID');
      
      // Sanitize inputs
      const sanitizedUpdates: Partial<ProfileData> = {};
      if (updates.username !== undefined) {
        sanitizedUpdates.username = sanitizeUsername(updates.username);
        if (!sanitizedUpdates.username || sanitizedUpdates.username.length < 3) {
          throw new Error('Benutzername muss mindestens 3 Zeichen lang sein');
        }
      }
      if (updates.bio !== undefined) {
        sanitizedUpdates.bio = sanitizeBio(updates.bio);
      }
      if (updates.avatar_url !== undefined) {
        sanitizedUpdates.avatar_url = updates.avatar_url;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(sanitizedUpdates)
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast({
        title: 'Erfolgreich',
        description: 'Profil wurde aktualisiert',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: 'Profil konnte nicht gespeichert werden: ' + error.message,
        variant: 'destructive',
      });
    },
  });

  const uploadAvatar = useMutation({
    mutationFn: async (file: File) => {
      if (!userId) throw new Error('No user ID');

      // Validate file
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('Datei ist zu groß. Maximum 2MB.');
      }
      if (!file.type.startsWith('image/')) {
        throw new Error('Bitte nur Bilddateien hochladen.');
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      return newAvatarUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast({
        title: 'Erfolgreich',
        description: 'Profilbild wurde aktualisiert',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    profile,
    isLoading,
    updateProfile,
    uploadAvatar,
  };
};
