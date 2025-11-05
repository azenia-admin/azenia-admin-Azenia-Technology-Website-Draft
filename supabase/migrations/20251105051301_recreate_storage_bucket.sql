/*
  # Recreate storage bucket with proper configuration

  1. Changes
    - Drop and recreate bucket
    - Set up completely permissive policies for anon access
    - Allow all operations on the bucket

  Notes:
    - Using anon role explicitly
    - Bucket is public
*/

DELETE FROM storage.objects WHERE bucket_id = 'job-applications';
DELETE FROM storage.buckets WHERE id = 'job-applications';

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'job-applications',
  'job-applications',
  true,
  10485760,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

DROP POLICY IF EXISTS "Public can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Public can read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Public can update resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete resumes" ON storage.objects;

CREATE POLICY "Allow anon uploads to job-applications"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Allow anon reads from job-applications"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'job-applications');

CREATE POLICY "Allow authenticated uploads to job-applications"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Allow authenticated reads from job-applications"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'job-applications');

CREATE POLICY "Allow authenticated deletes from job-applications"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'job-applications');