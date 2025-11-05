/*
  # Create client logos storage and table

  1. Storage
    - Create public bucket for client logos
    - Set up policies for public read access
    - Allow authenticated users to upload/delete

  2. New Tables
    - `client_logos`
      - `id` (uuid, primary key)
      - `name` (text) - Client name
      - `logo_url` (text) - URL to logo in storage
      - `display_order` (integer) - Order in carousel
      - `is_active` (boolean) - Whether to show in carousel
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  3. Security
    - Enable RLS on client_logos table
    - Allow anyone to read active logos
    - Only authenticated users can manage logos
*/

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'client-logos',
  'client-logos',
  true,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']
);

-- Storage policies for client-logos bucket
CREATE POLICY "Anyone can view client logos"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'client-logos');

CREATE POLICY "Authenticated users can upload client logos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'client-logos');

CREATE POLICY "Authenticated users can update client logos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'client-logos')
  WITH CHECK (bucket_id = 'client-logos');

CREATE POLICY "Authenticated users can delete client logos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'client-logos');

-- Create client_logos table
CREATE TABLE IF NOT EXISTS client_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active client logos"
  ON client_logos
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all client logos"
  ON client_logos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert client logos"
  ON client_logos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update client logos"
  ON client_logos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete client logos"
  ON client_logos
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_client_logos_display_order ON client_logos(display_order);
CREATE INDEX IF NOT EXISTS idx_client_logos_is_active ON client_logos(is_active);