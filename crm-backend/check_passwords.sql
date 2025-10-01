-- Check password hashes
SELECT "Email", LEFT("PasswordHash", 30) as "PasswordHash" FROM "Users";
