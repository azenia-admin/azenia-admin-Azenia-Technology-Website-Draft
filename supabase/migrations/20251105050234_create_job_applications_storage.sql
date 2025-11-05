/*
  # Create storage bucket for job applications

  1. Storage Setup
    - Create `job-applications` storage bucket for resume files
    - Set bucket to public for easy access to resume files
    
  2. Security Policies
    - Allow anyone (anon users) to upload files to the bucket
    - Allow anyone to read files from the bucket
    - Allow authenticated users to delete files

  Notes:
    - Public bucket allows direct access to resume URLs
    - Upload policy enables job applicants to submit resumes
    - Read policy allows admin and applicants to view resumes
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('job-applications', 'job-applications', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Anyone can read resumes"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'job-applications');

CREATE POLICY "Authenticated users can delete resumes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'job-applications');