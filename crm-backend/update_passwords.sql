-- Update password hashes with correct BCrypt hashes
-- Admin@123 hashed with BCrypt
UPDATE "Users" 
SET "PasswordHash" = '$2a$11$hA0R.RNul52eg7NaeMe5oOB.BxogWYFBuIHwihoDzIDVZMLRxtAT6'
WHERE "Email" = 'admin@crm.com';

-- Agent@123 hashed with BCrypt  
UPDATE "Users"
SET "PasswordHash" = '$2a$11$WIuooTDfgGeJaaWZoiLDpOmL8cCSokw4xJHZ8Kmsxi5fwD.km9Aai'
WHERE "Email" = 'agent@crm.com';

SELECT 'Password hashes updated successfully!' AS message;
