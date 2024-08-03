using MySocialService.Models;
using System.Security.Claims;

namespace MySocialService.Services.API
{
    public interface IAuthService
    {
        Task<UserModel?> GetCurrentUserAsync(ClaimsPrincipal user);
    }
}
