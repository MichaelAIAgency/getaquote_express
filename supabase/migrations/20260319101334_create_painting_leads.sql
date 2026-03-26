/*
  # Create Painting Leads Table

  ## Summary
  Creates a table to store lead information submitted after viewing a painting estimate.

  ## New Tables

  ### painting_leads
  Stores contact details and estimate data from prospective customers.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | uuid | Primary key |
  | name | text | Customer full name |
  | email | text | Customer email address |
  | phone | text | Customer phone number |
  | project_type | text | 'interior' or 'exterior' |
  | area_size | numeric | Area size in m² |
  | surface_condition | text | 'good', 'medium', or 'bad' |
  | num_coats | integer | Number of coats (1-3) |
  | extras_primer | boolean | Whether primer is needed |
  | extras_repairs | boolean | Whether wall repairs are needed |
  | extras_ceiling | boolean | Whether ceiling is included |
  | estimate_low | numeric | Lower bound of price estimate |
  | estimate_high | numeric | Upper bound of price estimate |
  | created_at | timestamptz | Record creation timestamp |

  ## Security
  - RLS enabled
  - Public insert allowed (anonymous users can submit leads)
  - No read access for public (only authenticated admin can read)
*/

CREATE TABLE IF NOT EXISTS painting_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  area_size numeric NOT NULL DEFAULT 0,
  surface_condition text NOT NULL DEFAULT '',
  num_coats integer NOT NULL DEFAULT 2,
  extras_primer boolean NOT NULL DEFAULT false,
  extras_repairs boolean NOT NULL DEFAULT false,
  extras_ceiling boolean NOT NULL DEFAULT false,
  estimate_low numeric NOT NULL DEFAULT 0,
  estimate_high numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE painting_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON painting_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON painting_leads
  FOR SELECT
  TO authenticated
  USING (true);
