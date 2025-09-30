using CRM.Domain.Common;

namespace CRM.Domain.Entities;

public class AuditLog : BaseEntity
{
    public Guid UserId { get; set; }
    public string UserRole { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty; // Create, Update, Delete, Login, etc.
    public string Entity { get; set; } = string.Empty; // User, Agent, Customer, etc.
    public string? EntityId { get; set; }
    public string? Details { get; set; } // JSON format
    public string? IpAddress { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public User User { get; set; } = null!;
}
