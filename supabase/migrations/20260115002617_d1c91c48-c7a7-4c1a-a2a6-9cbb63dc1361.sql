-- 1. Make the application-photos bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'application-photos';

-- 2. Drop existing public read policy if it exists
DROP POLICY IF EXISTS "Public read access for application photos" ON storage.objects;

-- 3. Add admin-only read policy for application photos
CREATE POLICY "Admins can view application photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'application-photos' AND
  public.has_role(auth.uid(), 'admin')
);

-- 4. Ensure anonymous users can still upload photos (for public form)
DROP POLICY IF EXISTS "Anyone can upload application photos" ON storage.objects;
CREATE POLICY "Anyone can upload application photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'application-photos');

-- 5. Add database validation trigger for applications
CREATE OR REPLACE FUNCTION public.validate_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate first name format and length
  IF NEW.first_name IS NULL OR length(NEW.first_name) = 0 THEN
    RAISE EXCEPTION 'First name is required';
  END IF;
  
  IF length(NEW.first_name) > 50 THEN
    RAISE EXCEPTION 'First name must be less than 50 characters';
  END IF;
  
  IF NEW.first_name !~ '^[a-zA-Z\s\-'']+$' THEN
    RAISE EXCEPTION 'First name can only contain letters, spaces, hyphens, and apostrophes';
  END IF;
  
  -- Validate middle name if provided
  IF NEW.middle_name IS NOT NULL AND length(NEW.middle_name) > 0 THEN
    IF length(NEW.middle_name) > 50 THEN
      RAISE EXCEPTION 'Middle name must be less than 50 characters';
    END IF;
    
    IF NEW.middle_name !~ '^[a-zA-Z\s\-'']+$' THEN
      RAISE EXCEPTION 'Middle name can only contain letters, spaces, hyphens, and apostrophes';
    END IF;
  END IF;
  
  -- Validate last name format and length
  IF NEW.last_name IS NULL OR length(NEW.last_name) = 0 THEN
    RAISE EXCEPTION 'Last name is required';
  END IF;
  
  IF length(NEW.last_name) > 50 THEN
    RAISE EXCEPTION 'Last name must be less than 50 characters';
  END IF;
  
  IF NEW.last_name !~ '^[a-zA-Z\s\-'']+$' THEN
    RAISE EXCEPTION 'Last name can only contain letters, spaces, hyphens, and apostrophes';
  END IF;
  
  -- Validate phone number format if provided
  IF NEW.mobile IS NOT NULL AND length(NEW.mobile) > 0 THEN
    IF length(NEW.mobile) > 30 THEN
      RAISE EXCEPTION 'Mobile number is too long';
    END IF;
  END IF;
  
  IF NEW.whatsapp IS NOT NULL AND length(NEW.whatsapp) > 0 THEN
    IF length(NEW.whatsapp) > 30 THEN
      RAISE EXCEPTION 'WhatsApp number is too long';
    END IF;
  END IF;
  
  -- Validate text field lengths to prevent storage abuse
  IF NEW.experience IS NOT NULL AND length(NEW.experience) > 5000 THEN
    RAISE EXCEPTION 'Experience text is too long';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = public;

-- 6. Create trigger for validation (drop if exists first)
DROP TRIGGER IF EXISTS validate_application_before_insert ON public.applications;
CREATE TRIGGER validate_application_before_insert
BEFORE INSERT ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.validate_application();

-- 7. Add duplicate detection function to prevent spam
CREATE OR REPLACE FUNCTION public.check_duplicate_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Check for recent submissions from same mobile or whatsapp number (within 24 hours)
  IF EXISTS (
    SELECT 1 FROM public.applications
    WHERE (
      (mobile IS NOT NULL AND mobile = NEW.mobile) OR 
      (whatsapp IS NOT NULL AND whatsapp = NEW.whatsapp)
    )
    AND created_at > NOW() - INTERVAL '24 hours'
  ) THEN
    RAISE EXCEPTION 'A recent application with this phone number already exists. Please wait 24 hours before resubmitting.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = public;

-- 8. Create trigger for duplicate detection
DROP TRIGGER IF EXISTS check_duplicate_before_insert ON public.applications;
CREATE TRIGGER check_duplicate_before_insert
BEFORE INSERT ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.check_duplicate_application();