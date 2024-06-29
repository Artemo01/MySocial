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
    }
}
