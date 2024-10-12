using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MySocialService.Data;
using MySocialService.Models;
using MySocialService.Services.API;
using System.Security.Claims;

namespace MySocialService.Services
{
    public class PostService : IPostService
    {
        private readonly DataContext dataContext;
        private readonly UserManager<UserModel> userManager;

        public PostService(DataContext dataContext, UserManager<UserModel> userManager)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
        }

        public async Task<List<PostModel>> GetAllPosts()
        {
            var posts = await dataContext.Posts
                .Include(p => p.User)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return posts;
        }

        public async Task<PostModel> CreatePost(ClaimsPrincipal GetUserId, string content)
        {
            var userId = this.GetUserId(GetUserId);
            var user = await GetUserByIdAsync(userId);

            var post = new PostModel
            {
                Id = Guid.NewGuid().ToString(),
                Content = content,
                CreatedAt = DateTime.Now,
                UserId = userId,
                User = user
            };

            dataContext.Posts.Add(post);
            await dataContext.SaveChangesAsync();

            return post;
        }

        public async Task DeletePost(ClaimsPrincipal claimsPrincipal, string postId)
        {
            var userId = GetUserId(claimsPrincipal);
            var post = await dataContext.Posts.FirstOrDefaultAsync(p => p.Id == postId && p.UserId == userId);
            if (post == null) throw new UnauthorizedAccessException("User does not have permission to delete this post.");

            dataContext.Posts.Remove(post);
            await dataContext.SaveChangesAsync();
        }

        private string GetUserId(ClaimsPrincipal claimsPrincipal)
        {
            var userIdClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null) throw new ArgumentException("User not found");

            return userIdClaim.Value;
        }

        private async Task<UserModel> GetUserByIdAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found");
            
            return user;
        }
    }
}
