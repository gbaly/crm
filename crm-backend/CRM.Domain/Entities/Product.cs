using CRM.Domain.Common;

namespace CRM.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Category { get; set; } = string.Empty;
    public decimal CostPrice { get; set; }
    public decimal SalePrice { get; set; }
    public int Stock { get; set; }
    public int MinStock { get; set; } = 0;
    
    // Navigation properties
    public ICollection<SaleItem> SaleItems { get; set; } = new List<SaleItem>();
}
