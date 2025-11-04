/*
  # Create Jobs Table

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `title` (text) - Job title
      - `department` (text) - Department/category (e.g., Development, Cloud Services)
      - `location` (text) - Job location (e.g., Remote Canada, UK, Mitratech India)
      - `description` (text) - Full job description
      - `requirements` (text) - Job requirements
      - `is_new` (boolean) - Flag to mark new jobs
      - `created_at` (timestamptz) - Timestamp when job was created
      - `updated_at` (timestamptz) - Timestamp when job was last updated

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for public read access (anyone can view jobs)
    - Add policy for authenticated admins to create/update/delete jobs

  3. Important Notes
    - Jobs are publicly viewable without authentication
    - Only authenticated users can create/modify jobs (for admin functionality)
    - New jobs are automatically timestamped
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  requirements text DEFAULT '',
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs"
  ON jobs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS jobs_department_idx ON jobs(department);
CREATE INDEX IF NOT EXISTS jobs_created_at_idx ON jobs(created_at DESC);