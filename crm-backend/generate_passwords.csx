using BCrypt.Net;

Console.WriteLine("Admin@123: " + BCrypt.HashPassword("Admin@123"));
Console.WriteLine("Agent@123: " + BCrypt.HashPassword("Agent@123"));
