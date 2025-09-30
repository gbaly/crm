using CRM.Domain.Common;

namespace CRM.Domain.Entities;

public class SaleItem : BaseEntity
{
    public Guid SaleId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    
    // Navigation properties
    public Sale Sale { get; set; } = null!;
    public Product Product { get; set; } = null!;
}
