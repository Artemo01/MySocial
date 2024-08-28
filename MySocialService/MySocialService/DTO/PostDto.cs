using MySocialService.Models;

namespace MySocialService.DTO
{
    public class PostDto
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }

        public static PostDto MapToDto(PostModel post)
        {
            return new PostDto
            {
                Id = post.Id,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                UserId = post.UserId,
                UserName = post.User.UserName
            };
        }
    }
}
