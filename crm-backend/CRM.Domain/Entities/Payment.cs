using CRM.Domain.Common;
using CRM.Domain.Enums;

namespace CRM.Domain.Entities;

public class Payment : BaseEntity
{
    public Guid SaleId { get; set; }
    public decimal Amount { get; set; }
    public PaymentType PaymentType { get; set; }
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public string? Reference { get; set; }
    
    // Navigation properties
    public Sale Sale { get; set; } = null!;
}
