/*
  # Add AI photo analysis support

  ## Summary
  Adds photo upload and AI condition report support to the painting_leads table,
  and creates the Supabase Storage bucket used to store lead photos.

  ## Modified Tables

  ### painting_leads
  - `photo_url` (text, nullable) — public URL of the uploaded photo in Supabase Storage
  - `ai_condition_report` (text, nullable) — GPT-4o generated condition summary for the painter

  ## Storage

  ### lead-photos bucket
  - Public bucket for storing uploaded room/surface photos
  - Anon + authenticated users can upload (INSERT) and read (SELECT)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'painting_leads' AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE painting_leads ADD COLUMN photo_url text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'painting_leads' AND column_name = 'ai_condition_report'
  ) THEN
    ALTER TABLE painting_leads ADD COLUMN ai_condition_report text;
  END IF;
END $$;

INSERT INTO storage.buckets (id, name, public)
VALUES ('lead-photos', 'lead-photos', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
      AND schemaname = 'storage'
      AND policyname = 'Allow anon uploads to lead-photos'
  ) THEN
    CREATE POLICY "Allow anon uploads to lead-photos"
    ON storage.objects FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'lead-photos');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
      AND schemaname = 'storage'
      AND policyname = 'Allow public read from lead-photos'
  ) THEN
    CREATE POLICY "Allow public read from lead-photos"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'lead-photos');
  END IF;
END $$;
