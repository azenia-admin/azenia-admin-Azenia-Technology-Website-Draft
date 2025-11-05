/*
  # Comprehensive fix for storage bucket

  1. Changes
    - Update bucket settings (file size limit, public access)
    - Add UPDATE policy for completeness
    - Ensure all CRUD operations are covered

  Notes:
    - Setting file size limit to 10MB for resumes
    - Ensuring bucket is truly public
*/

UPDATE storage.buckets 
SET 
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
WHERE id = 'job-applications';

DROP POLICY IF EXISTS "Public can update resumes" ON storage.objects;

CREATE POLICY "Public can update resumes"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'job-applications')
  WITH CHECK (bucket_id = 'job-applications');