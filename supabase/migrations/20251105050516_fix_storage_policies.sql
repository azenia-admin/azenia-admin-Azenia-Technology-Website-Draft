/*
  # Fix storage policies for job applications

  1. Changes
    - Drop existing policies
    - Create new policies that work with anon users
    - Allow public access for uploads and reads

  Notes:
    - Uses public role to allow anonymous uploads
    - Critical for job application functionality
*/

DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete resumes" ON storage.objects;

CREATE POLICY "Public can upload resumes"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Public can read resumes"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'job-applications');

CREATE POLICY "Authenticated users can delete resumes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'job-applications');