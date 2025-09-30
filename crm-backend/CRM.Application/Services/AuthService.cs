using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using CRM.Application.DTOs.Auth;
using CRM.Application.Interfaces;
using CRM.Domain.Entities;

namespace CRM.Application.Services;

public class AuthService
{
    private readonly IRepository<User> _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IRepository<User> userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
    {
        var users = await _userRepository.FindAsync(u => u.Email == loginDto.Email);
        var user = users.FirstOrDefault();

        if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
            return null;

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            UserId = user.Id.ToString(),
            Email = user.Email,
            Name = user.Name,
            Role = user.Role.ToString()
        };
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere123456789"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(24),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private bool VerifyPassword(string password, string passwordHash)
    {
        // Use BCrypt or similar in production
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }

    public static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}
