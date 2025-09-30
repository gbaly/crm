using CRM.Domain.Common;
using CRM.Domain.Enums;

namespace CRM.Domain.Entities;

public class Sale : BaseEntity
{
    public string InvoiceNumber { get; set; } = string.Empty;
    public Guid CustomerId { get; set; }
    public Guid? AgentId { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal PaidAmount { get; set; } = 0;
    public decimal RemainingAmount { get; set; }
    public PaymentType PaymentType { get; set; }
    public DateTime SaleDate { get; set; } = DateTime.UtcNow;
    public bool IsPaid { get; set; } = false;
    
    // Navigation properties
    public Customer Customer { get; set; } = null!;
    public Agent? Agent { get; set; }
    public ICollection<SaleItem> SaleItems { get; set; } = new List<SaleItem>();
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
