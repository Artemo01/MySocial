using MySocialService.Models;
using System.Security.Claims;

namespace MySocialService.Services.API
{
    public interface IUserService
    {

        Task<UserDetailsModel> GetCurrentUserDetails(ClaimsPrincipal claimsPrincipal);
        Task<List<UserDetailsModel>> GetAllUsers();
    }
}
