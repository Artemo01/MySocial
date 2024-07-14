using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySocialService.DTO;
using MySocialService.Mappers;
using MySocialService.Services;
using MySocialService.Services.API;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly IPostService postService;

        public PostsController(IPostService postService)
        {
  
            this.postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await postService.GetPosts();
            var dto = posts.Select(UserMapper.MapToPostDto);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(PostDto post)
        {
            var newPost = await postService.CreatePost(User, UserMapper.MapToPostModel(post));

            return Ok(UserMapper.MapToPostDto(newPost));
        }
    }
}
