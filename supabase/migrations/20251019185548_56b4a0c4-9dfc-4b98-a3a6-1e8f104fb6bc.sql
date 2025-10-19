-- Enable pg_cron and pg_net extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule cleanup of old rate limits daily at 3 AM
SELECT cron.schedule(
  'cleanup-old-rate-limits',
  '0 3 * * *', -- Daily at 3 AM
  $$
  SELECT
    net.http_post(
        url:='https://bjjxfcpxnoivjkplxktw.supabase.co/functions/v1/cleanup-rate-limits',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqanhmY3B4bm9pdmprcGx4a3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2OTMyMzEsImV4cCI6MjA3NDI2OTIzMX0.Jfx5Hj3mUSAtDopLwXL1NNgA1In2zyahaM7AGTEby74"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);