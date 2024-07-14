using MySocialService.DTO;
using MySocialService.Models;

namespace MySocialService.Mappers
{
    public class UserMapper
    {

        public static UserDto MapToDto(UserModel model)
        {
            return new UserDto
            {
                Id = model.Id,
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };
        }

        public static PostDto MapToPostDto(PostModel model)
        {
            return new PostDto
            {
                Id = model.Id,
                Title = model.Title,
                Content = model.Content,
                CreatedDate = model.CreatedDate,
                UserId = model.UserId,
            };
        }

        public static PostModel MapToPostModel(PostDto dto)
        {
            return new PostModel
            {
                Id = dto.Id,
                Title = dto.Title,
                Content = dto.Content,
                CreatedDate = dto.CreatedDate,
                UserId = dto.UserId,
            };

        }
    }
}
