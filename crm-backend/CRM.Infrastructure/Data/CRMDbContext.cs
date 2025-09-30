using Microsoft.EntityFrameworkCore;
using CRM.Domain.Entities;

namespace CRM.Infrastructure.Data;

public class CRMDbContext : DbContext
{
    public CRMDbContext(DbContextOptions<CRMDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Agent> Agents { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<SaleItem> SaleItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<ServiceRequest> ServiceRequests { get; set; }
    public DbSet<Commission> Commissions { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Entity Configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.PasswordHash).IsRequired();
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Agent Entity Configuration
        modelBuilder.Entity<Agent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                  .WithOne(u => u.Agent)
                  .HasForeignKey<Agent>(e => e.UserId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.Property(e => e.Balance).HasColumnType("decimal(18,2)");
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Customer Entity Configuration
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
            entity.Property(e => e.TotalPurchases).HasColumnType("decimal(18,2)");
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Product Entity Configuration
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.Property(e => e.CostPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.SalePrice).HasColumnType("decimal(18,2)");
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Sale Entity Configuration
        modelBuilder.Entity<Sale>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.InvoiceNumber).IsUnique();
            entity.Property(e => e.InvoiceNumber).IsRequired().HasMaxLength(50);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.PaidAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.RemainingAmount).HasColumnType("decimal(18,2)");
            
            entity.HasOne(e => e.Customer)
                  .WithMany(c => c.Sales)
                  .HasForeignKey(e => e.CustomerId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.Agent)
                  .WithMany(a => a.Sales)
                  .HasForeignKey(e => e.AgentId)
                  .OnDelete(DeleteBehavior.SetNull);
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // SaleItem Entity Configuration
        modelBuilder.Entity<SaleItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
            
            entity.HasOne(e => e.Sale)
                  .WithMany(s => s.SaleItems)
                  .HasForeignKey(e => e.SaleId)
                  .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(e => e.Product)
                  .WithMany(p => p.SaleItems)
                  .HasForeignKey(e => e.ProductId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Payment Entity Configuration
        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            
            entity.HasOne(e => e.Sale)
                  .WithMany(s => s.Payments)
                  .HasForeignKey(e => e.SaleId)
                  .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // ServiceRequest Entity Configuration
        modelBuilder.Entity<ServiceRequest>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.RequestNumber).IsUnique();
            entity.Property(e => e.RequestNumber).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Description).IsRequired();
            
            entity.HasOne(e => e.Customer)
                  .WithMany(c => c.ServiceRequests)
                  .HasForeignKey(e => e.CustomerId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Commission Entity Configuration
        modelBuilder.Entity<Commission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Rate).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            
            entity.HasOne(e => e.Agent)
                  .WithMany(a => a.Commissions)
                  .HasForeignKey(e => e.AgentId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.Sale)
                  .WithMany()
                  .HasForeignKey(e => e.SaleId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // AuditLog Entity Configuration
        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Timestamp);
            entity.HasIndex(e => e.UserId);
            entity.Property(e => e.Action).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Entity).IsRequired().HasMaxLength(50);
            
            entity.HasOne(e => e.User)
                  .WithMany(u => u.AuditLogs)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
