using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MySocialService.Models;
using MySocialService.Services.API;
using System.Security.Claims;

namespace MySocialService.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<UserModel> userManager;
        private readonly IAuthService authService;

        public UserService(UserManager<UserModel> userManager, IAuthService authService)
        {
            this.userManager = userManager;
            this.authService = authService;
        }

        public async Task<UserModel?> GetCurrentUser(ClaimsPrincipal user)
        {
            return await authService.GetCurrentUserAsync(user);
        }

        public async Task<List<UserModel>> GetAllUsers()
        {
            return await userManager.Users.ToListAsync();
        }
    }
}
