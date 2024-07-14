using MySocialService.Models;
using System.Security.Claims;

namespace MySocialService.Services.API
{
    public interface IPostService
    {
        Task<List<PostModel>> GetPosts();
        Task<PostModel> CreatePost(ClaimsPrincipal user, PostModel post);
    }
}
