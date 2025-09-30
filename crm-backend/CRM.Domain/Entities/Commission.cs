using CRM.Domain.Common;
using CRM.Domain.Enums;

namespace CRM.Domain.Entities;

public class Commission : BaseEntity
{
    public Guid AgentId { get; set; }
    public Guid SaleId { get; set; }
    public CommissionType Type { get; set; }
    public decimal Rate { get; set; } // Percentage or fixed amount
    public decimal Amount { get; set; }
    public DateTime EarnedDate { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public Agent Agent { get; set; } = null!;
    public Sale Sale { get; set; } = null!;
}
