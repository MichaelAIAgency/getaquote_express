/*
  # Add address column to painting_leads

  1. Changes
    - Adds a nullable `address` text column to the `painting_leads` table
      to capture the customer's street address or city/zip from the lead capture form.

  2. Notes
    - Column is nullable so existing rows are unaffected.
    - No RLS changes required; existing policies already cover this table.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'painting_leads' AND column_name = 'address'
  ) THEN
    ALTER TABLE painting_leads ADD COLUMN address text;
  END IF;
END $$;
