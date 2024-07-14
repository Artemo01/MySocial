using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySocialService.Data;
using MySocialService.Models;
using MySocialService.Services.API;
using System.Security.Claims;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public PostsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetPosts()
        {
            var posts = dataContext.Posts.ToList();
            return Ok(posts);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(PostModel post)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            post.UserId = userId;
            post.CreatedDate = DateTime.Now;

            dataContext.Posts.Add(post);
            await dataContext.SaveChangesAsync();

            return Ok(post);
        }
    }
}
