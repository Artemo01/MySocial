using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MySocialService.Data;
using MySocialService.DTO;
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

        public async Task<PostModel> CreatePost(ClaimsPrincipal claimsPrincipal, string content)
        {
            var userId = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) throw new ArgumentException("User not found");

            var user = await userManager.FindByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found");

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
    }
}
