using Microsoft.AspNetCore.Mvc;
using CRM.Application.DTOs.Auth;
using CRM.Application.Services;

namespace CRM.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Login to the system
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var result = await _authService.LoginAsync(loginDto);

            if (result == null)
            {
                _logger.LogWarning("Failed login attempt for email: {Email}", loginDto.Email);
                return Unauthorized(new { message = "Invalid email or password" });
            }

            _logger.LogInformation("User logged in successfully: {Email}", loginDto.Email);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login");
            return StatusCode(500, new { message = "An error occurred during login" });
        }
    }
}
