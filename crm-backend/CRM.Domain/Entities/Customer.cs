using CRM.Domain.Common;

namespace CRM.Domain.Entities;

public class Customer : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Address { get; set; }
    public decimal TotalPurchases { get; set; } = 0;
    
    // Navigation properties
    public ICollection<Sale> Sales { get; set; } = new List<Sale>();
    public ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
}
