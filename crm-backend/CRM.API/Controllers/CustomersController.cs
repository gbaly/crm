using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CRM.Application.Interfaces;
using CRM.Application.DTOs.Customers;
using CRM.Domain.Entities;

namespace CRM.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly IRepository<Customer> _customerRepository;
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(IRepository<Customer> customerRepository, ILogger<CustomersController> logger)
    {
        _customerRepository = customerRepository;
        _logger = logger;
    }

    /// <summary>
    /// Get all customers
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var customers = await _customerRepository.GetAllAsync();
            var dtos = customers.Select(c => new CustomerDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                Address = c.Address,
                TotalPurchases = c.TotalPurchases,
                CreatedAt = c.CreatedAt
            });

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting customers");
            return StatusCode(500, new { message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get customer by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        try
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null)
                return NotFound(new { message = "Customer not found" });

            var dto = new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                TotalPurchases = customer.TotalPurchases,
                CreatedAt = customer.CreatedAt
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting customer");
            return StatusCode(500, new { message = "An error occurred" });
        }
    }

    /// <summary>
    /// Create new customer
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCustomerDto dto)
    {
        try
        {
            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Address = dto.Address
            };

            await _customerRepository.AddAsync(customer);
            _logger.LogInformation("Customer created: {Email}", customer.Email);

            return CreatedAtAction(nameof(GetById), new { id = customer.Id }, new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                TotalPurchases = customer.TotalPurchases,
                CreatedAt = customer.CreatedAt
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating customer");
            return StatusCode(500, new { message = "An error occurred" });
        }
    }

    /// <summary>
    /// Update customer
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCustomerDto dto)
    {
        try
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null)
                return NotFound(new { message = "Customer not found" });

            customer.Name = dto.Name;
            customer.Email = dto.Email;
            customer.Phone = dto.Phone;
            customer.Address = dto.Address;
            customer.UpdatedAt = DateTime.UtcNow;

            await _customerRepository.UpdateAsync(customer);
            _logger.LogInformation("Customer updated: {Email}", customer.Email);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating customer");
            return StatusCode(500, new { message = "An error occurred" });
        }
    }

    /// <summary>
    /// Delete customer
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _customerRepository.DeleteAsync(id);
            _logger.LogInformation("Customer deleted: {Id}", id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting customer");
            return StatusCode(500, new { message = "An error occurred" });
        }
    }
}
