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

        public UserService(UserManager<UserModel> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<UserDetailsModel> GetCurrentUserDetails(ClaimsPrincipal claimsPrincipal)
        {
            var userId = GetUserIdFromClaims(claimsPrincipal);
            var user = await GetUserById(userId);

            return MapToUserDetails(user);
        }

        public async Task<List<UserDetailsModel>> GetAllUsers()
        {
            var users = await userManager.Users.Select(user => MapToUserDetails(user)).ToListAsync();
            return users;
        }

        private string GetUserIdFromClaims(ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value
                ?? string.Empty;
        }

        private async Task<UserModel> GetUserById(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);

            if (user is null)
            {
                throw new ArgumentException("User not found");
            }
            return user;
        }

        private static UserDetailsModel MapToUserDetails(UserModel user)
        {
            return new UserDetailsModel
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.UserName,
                Phone = user.PhoneNumber,
            };
        }

    }
}
