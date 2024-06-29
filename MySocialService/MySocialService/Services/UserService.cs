using Microsoft.AspNetCore.Identity;
using MySocialService.Models;
using MySocialService.Services.API;
using System.Security.Claims;

namespace MySocialService.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<UserModel> userManager;

        public UserService(UserManager<UserModel> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<UserModel?> GetCurrentUser(ClaimsPrincipal user)
        {
            var userModel = await userManager.GetUserAsync(user);
            if (userModel == null)
            {
                return null;
            }

            return userModel;
        }
    }
}
