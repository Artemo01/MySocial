namespace MySocialService.Models
{
    public class PostModel
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public UserModel User { get; set; }
    }
}
