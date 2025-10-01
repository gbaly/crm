Console.WriteLine("Generating BCrypt hashes...");
Console.WriteLine();
Console.WriteLine($"Admin@123 hash:");
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("Admin@123"));
Console.WriteLine();
Console.WriteLine($"Agent@123 hash:");
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("Agent@123"));
