using CRM.Domain.Common;
using CRM.Domain.Enums;

namespace CRM.Domain.Entities;

public class ServiceRequest : BaseEntity
{
    public string RequestNumber { get; set; } = string.Empty;
    public Guid CustomerId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ServiceStatus Status { get; set; } = ServiceStatus.New;
    public DateTime RequestDate { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedDate { get; set; }
    
    // Navigation properties
    public Customer Customer { get; set; } = null!;
}
