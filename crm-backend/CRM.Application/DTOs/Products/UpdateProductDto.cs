namespace CRM.Application.DTOs.Products;

public class UpdateProductDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public decimal? CostPrice { get; set; }
    public decimal? SalePrice { get; set; }
    public int? Stock { get; set; }
    public int? MinStock { get; set; }
}

