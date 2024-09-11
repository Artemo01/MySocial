﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySocialService.DTO;
using MySocialService.Services.API;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService postService;

        public PostsController(IPostService postService)
        {
            this.postService = postService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PostDto>> CreatePost([FromBody] string content)
        {
            var post = await postService.CreatePost(User, content);
            var dto = PostDto.MapToDto(post);
            return Ok(dto);
        }

        [HttpGet]
        public async Task<ActionResult<List<PostDto>>> GetAllPosts()
        {
            var posts = await postService.GetAllPosts();
            return Ok(posts.Select(PostDto.MapToDto));
        }
    }
}