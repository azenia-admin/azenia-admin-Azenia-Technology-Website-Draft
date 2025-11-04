/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `type` (text) - Type of submission: 'contact' or 'partner'
      - `first_name` (text) - Submitter's first name
      - `last_name` (text) - Submitter's last name
      - `email` (text) - Submitter's email address
      - `phone_number` (text, nullable) - Submitter's phone number
      - `category` (text, nullable) - Category for contact form
      - `message` (text, nullable) - Message for contact form
      - `company_name` (text, nullable) - Company name for partner form
      - `job_title` (text, nullable) - Job title for partner form
      - `service_required` (text, nullable) - Service required for partner form
      - `specialty_needed` (text, nullable) - Specialty needed for partner form
      - `office_location` (text, nullable) - Office location for partner form
      - `details` (text, nullable) - Details for partner form
      - `agree_to_newsletter` (boolean) - Newsletter opt-in
      - `agree_to_contact` (boolean) - Contact opt-in
      - `created_at` (timestamptz) - Timestamp of submission
      - `email_sent` (boolean) - Whether notification email was sent
      - `email_sent_at` (timestamptz, nullable) - Timestamp of email sent

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read all submissions
    - Add policy for anyone to insert submissions (public form)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('contact', 'partner')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone_number text,
  category text,
  message text,
  company_name text,
  job_title text,
  service_required text,
  specialty_needed text,
  office_location text,
  details text,
  agree_to_newsletter boolean DEFAULT false,
  agree_to_contact boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
