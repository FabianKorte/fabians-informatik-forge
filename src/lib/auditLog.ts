import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";

export type AuditAction = 
  | 'user_role_granted'
  | 'user_role_revoked'
  | 'user_2fa_removed'
  | 'user_deleted'
  | 'learning_content_created'
  | 'learning_content_updated'
  | 'learning_content_deleted'
  | 'learning_content_bulk_deleted'
  | 'password_reset_sent';

export type EntityType = 
  | 'user'
  | 'user_role'
  | 'learn_module'
  | 'auth';

interface AuditLogEntry {
  action: AuditAction;
  entity_type: EntityType;
  entity_id?: string;
  details?: Record<string, any>;
}

export async function logAuditAction(entry: AuditLogEntry) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      logger.warn('Cannot log audit action: No user authenticated');
      return { success: false };
    }

    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: user.id,
        action: entry.action,
        entity_type: entry.entity_type,
        entity_id: entry.entity_id || null,
        details: entry.details || {},
      });

    if (error) {
      logger.error('Failed to log audit action:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    logger.error('Audit log error:', error);
    return { success: false, error };
  }
}
