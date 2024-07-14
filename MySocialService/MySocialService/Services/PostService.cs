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
        public PostService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<List<PostModel>> GetPosts()
        {
            var posts = await dataContext.Posts.ToListAsync();
            return posts;
        }
        public async Task<PostModel> CreatePost(ClaimsPrincipal user, PostModel post)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            post.UserId = userId;
            post.CreatedDate = DateTime.Now;

            dataContext.Posts.Add(post);
            await dataContext.SaveChangesAsync();

            return post;
        }
    }
}
