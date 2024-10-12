using MySocialService.DTO;
using MySocialService.Models;
using System.Security.Claims;

namespace MySocialService.Services.API
{
    public interface IPostService
    {
        Task<List<PostModel>> GetAllPosts();
        Task<PostModel> CreatePost(ClaimsPrincipal claimsPrincipal, string content);
        Task DeletePost(ClaimsPrincipal claimsPrincipal, string postId);
    }
}
