/*
  # Create job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `job_id` (uuid, foreign key) - Links to the jobs table
      - `first_name` (text) - Applicant's first name
      - `last_name` (text) - Applicant's last name
      - `email` (text) - Applicant's email address
      - `phone` (text) - Applicant's phone number
      - `resume_url` (text) - URL to the uploaded resume file
      - `created_at` (timestamptz) - When the application was submitted
      
  2. Security
    - Enable RLS on `job_applications` table
    - Add policy for authenticated admin users to read all applications
    - Add policy for anyone to insert applications (public job applications)
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);