using CRM.Application.Interfaces;
using CRM.Application.DTOs.Products;
using CRM.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IRepository<Product> _productRepository;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IRepository<Product> productRepository, ILogger<ProductsController> logger)
    {
        _productRepository = productRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        try
        {
            var products = await _productRepository.GetAllAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting products");
            return StatusCode(500, new { message = "Error retrieving products" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(Guid id)
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting product {id}");
            return StatusCode(500, new { message = "Error retrieving product" });
        }
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] CreateProductDto dto)
    {
        try
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Category = dto.Category,
                CostPrice = dto.CostPrice,
                SalePrice = dto.SalePrice,
                Stock = dto.Stock,
                MinStock = dto.MinStock
            };
            
            var created = await _productRepository.AddAsync(product);
            _logger.LogInformation($"Product created: {created.Id}");
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            return StatusCode(500, new { message = "Error creating product" });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> Update(Guid id, [FromBody] UpdateProductDto dto)
    {
        try
        {
            var existing = await _productRepository.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new { message = "Product not found" });

            if (!string.IsNullOrEmpty(dto.Name))
                existing.Name = dto.Name;
            if (dto.Description != null)
                existing.Description = dto.Description;
            if (!string.IsNullOrEmpty(dto.Category))
                existing.Category = dto.Category;
            if (dto.CostPrice.HasValue)
                existing.CostPrice = dto.CostPrice.Value;
            if (dto.SalePrice.HasValue)
                existing.SalePrice = dto.SalePrice.Value;
            if (dto.Stock.HasValue)
                existing.Stock = dto.Stock.Value;
            if (dto.MinStock.HasValue)
                existing.MinStock = dto.MinStock.Value;

            await _productRepository.UpdateAsync(existing);
            _logger.LogInformation($"Product updated: {id}");
            return Ok(existing);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating product {id}");
            return StatusCode(500, new { message = "Error updating product" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            await _productRepository.DeleteAsync(id);
            _logger.LogInformation($"Product deleted: {id}");
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deleting product {id}");
            return StatusCode(500, new { message = "Error deleting product" });
        }
    }
}

