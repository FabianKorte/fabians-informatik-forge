-- Erweitere app_role enum um 'owner'
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'owner';