using Microsoft.AspNetCore.Identity;
using MySocialService.Models;
using MySocialService.Services.API;
using System.Security.Claims;

namespace MySocialService.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<UserModel> userManager;

        public AuthService(UserManager<UserModel> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<UserModel?> GetCurrentUserAsync(ClaimsPrincipal user)
        {
            return await userManager.GetUserAsync(user);
        }
    }
}
