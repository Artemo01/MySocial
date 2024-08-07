using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySocialService.DTO;
using MySocialService.Helpers;
using MySocialService.Models;
using MySocialService.Services.API;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MySocialService.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<UserModel> userManager;
        private readonly ILogger<AuthService> logger;
        private readonly IConfiguration configuration;

        public AuthService(UserManager<UserModel> userManager, ILogger<AuthService> logger, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.logger = logger;
            this.configuration = configuration;
        }

        public async Task<AuthResponseDto> Register(RegisterModel model)
        {
            ValidateRegisterData(model);

            var user = new UserModel
            {
                Email = model.Email,
                UserName = model.UserName,
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) 
            {
                logger.LogError("User registration failed for {Email}", model.Email);
                return new AuthResponseDto { IsSuccess = false, Message = "Registration failed." };
            }

            return new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Account created successfully"
            };
        }

        public async Task<AuthResponseDto> Login(LoginModel model)
        {
            ValidateLoginData(model);

            var user = await userManager.FindByEmailAsync(model.Email);

            if (user is null)
            {
                return new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "User not found"
                };
            }

            var result = await userManager.CheckPasswordAsync(user, model.Password);

            if (!result)
            {
                return new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Invalid Password"
                };
            }

            var token = GenerateToken(user);

            return new AuthResponseDto { Token = token, IsSuccess = true, Message = "Login Success" };
        }

        private void ValidateRegisterData(RegisterModel model)
        {
            ValidationHelper.CheckNullOrEmptyString(model.Email, nameof(model.Email));
            ValidationHelper.CheckNullOrEmptyString(model.Password, nameof(model.Password));
            ValidationHelper.CheckNullOrEmptyString(model.UserName, nameof(model.UserName));
        }

        private void ValidateLoginData(LoginModel model)
        {
            ValidationHelper.CheckNullOrEmptyString(model.Email, nameof(model.Email));
            ValidationHelper.CheckNullOrEmptyString(model.Password, nameof(model.Password));
        }

        private string GenerateToken(UserModel model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(configuration.GetSection("JWTSettings").GetSection("SecutiryKey").Value!);

            var roles = userManager.GetRolesAsync(model).Result;

            List<Claim> claims =
                [
                    new (JwtRegisteredClaimNames.Email, model.Email ?? ""),
                new (JwtRegisteredClaimNames.Name, model.UserName ?? ""),
                    new (JwtRegisteredClaimNames.NameId, model.Id ?? ""),
                    new (JwtRegisteredClaimNames.Aud, configuration.GetSection("JWTSettings").GetSection("ValidAudience").Value!),
                    new (JwtRegisteredClaimNames.Iss, configuration.GetSection("JWTSettings").GetSection("ValidIssuer").Value!),
                ];

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
