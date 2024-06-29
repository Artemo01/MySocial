using MySocialService.Models;
using System.Security.Claims;

namespace MySocialService.Services.API
{
    public interface IUserService
    {
        Task<UserModel?> GetCurrentUser(ClaimsPrincipal user);
    }
}
