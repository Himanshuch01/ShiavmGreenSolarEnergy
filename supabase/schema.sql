-- Supabase Database Schema for Shivam GreenSolar Energy
-- Run this SQL script in your Supabase SQL Editor to create the necessary tables

-- Enable UUID extension (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Inquiries Table
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  service VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calculator Results Table
-- Stores solar calculator calculations for lead tracking
CREATE TABLE IF NOT EXISTS calculator_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  monthly_bill DECIMAL(10, 2) NOT NULL,
  city VARCHAR(100) NOT NULL,
  rooftop_size DECIMAL(10, 2) NOT NULL,
  system_size DECIMAL(10, 2) NOT NULL,
  estimated_cost DECIMAL(12, 2) NOT NULL,
  annual_savings DECIMAL(12, 2) NOT NULL,
  payback_period DECIMAL(5, 2) NOT NULL,
  co2_reduction DECIMAL(10, 2) NOT NULL,
  subsidy_amount DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_calculator_results_created_at ON calculator_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calculator_results_city ON calculator_results(city);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert (anonymous users can insert)
-- Adjust these policies based on your security requirements

-- Policy: Allow anyone to insert contact inquiries
CREATE POLICY "Allow public insert on contact_inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all contact inquiries
-- Remove or modify this if you want different access control
CREATE POLICY "Allow authenticated read on contact_inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow anyone to insert calculator results
CREATE POLICY "Allow public insert on calculator_results"
  ON calculator_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all calculator results
CREATE POLICY "Allow authenticated read on calculator_results"
  ON calculator_results
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a view for recent inquiries (last 30 days)
CREATE OR REPLACE VIEW recent_contact_inquiries AS
SELECT 
  id,
  name,
  email,
  phone,
  service,
  LEFT(message, 100) as message_preview,
  created_at
FROM contact_inquiries
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Optional: Create a view for calculator statistics
CREATE OR REPLACE VIEW calculator_statistics AS
SELECT 
  city,
  COUNT(*) as total_calculations,
  AVG(system_size) as avg_system_size,
  AVG(estimated_cost) as avg_estimated_cost,
  AVG(annual_savings) as avg_annual_savings,
  SUM(co2_reduction) as total_co2_reduction
FROM calculator_results
GROUP BY city
ORDER BY total_calculations DESC;

