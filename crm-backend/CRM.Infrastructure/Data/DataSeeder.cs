using CRM.Domain.Entities;
using CRM.Domain.Enums;
using CRM.Application.Services;

namespace CRM.Infrastructure.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(CRMDbContext context)
    {
        // Check if data already exists
        if (context.Users.Any())
            return;

        // Create default admin user
        var adminUser = new User
        {
            Name = "Admin User",
            Email = "admin@crm.com",
            PasswordHash = AuthService.HashPassword("Admin@123"),
            Role = UserRole.Admin,
            IsActive = true
        };

        await context.Users.AddAsync(adminUser);

        // Create default agent user
        var agentUser = new User
        {
            Name = "Agent User",
            Email = "agent@crm.com",
            PasswordHash = AuthService.HashPassword("Agent@123"),
            Role = UserRole.Agent,
            IsActive = true
        };

        await context.Users.AddAsync(agentUser);

        // Create agent record
        var agent = new Agent
        {
            UserId = agentUser.Id,
            Balance = 1000.00m,
            AssignedLicenses = 10,
            SoldLicenses = 0
        };

        await context.Agents.AddAsync(agent);

        // Create sample customers
        var customers = new List<Customer>
        {
            new Customer
            {
                Name = "TechCorp Inc",
                Email = "info@techcorp.com",
                Phone = "+1234567890",
                Address = "123 Tech Street, Silicon Valley, CA"
            },
            new Customer
            {
                Name = "Digital Solutions Ltd",
                Email = "contact@digitalsolutions.com",
                Phone = "+0987654321",
                Address = "456 Digital Ave, London, UK"
            }
        };

        await context.Customers.AddRangeAsync(customers);

        // Create sample products
        var products = new List<Product>
        {
            new Product
            {
                Name = "CRM Software License",
                Description = "Professional CRM software license",
                Category = "Software",
                CostPrice = 50.00m,
                SalePrice = 99.00m,
                Stock = 100,
                MinStock = 10
            },
            new Product
            {
                Name = "Support Package",
                Description = "Annual support and maintenance",
                Category = "Service",
                CostPrice = 100.00m,
                SalePrice = 199.00m,
                Stock = 50,
                MinStock = 5
            }
        };

        await context.Products.AddRangeAsync(products);

        await context.SaveChangesAsync();
    }
}
