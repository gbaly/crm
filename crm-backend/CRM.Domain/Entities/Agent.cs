using CRM.Domain.Common;

namespace CRM.Domain.Entities;

public class Agent : BaseEntity
{
    public Guid UserId { get; set; }
    public decimal Balance { get; set; } = 0;
    public int AssignedLicenses { get; set; } = 0;
    public int SoldLicenses { get; set; } = 0;
    
    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<Sale> Sales { get; set; } = new List<Sale>();
    public ICollection<Commission> Commissions { get; set; } = new List<Commission>();
}
