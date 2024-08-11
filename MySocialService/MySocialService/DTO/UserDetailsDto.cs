using MySocialService.Models;

namespace MySocialService.DTO
{
    public class UserDetailsDto
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public static UserDetailsDto MapToDto(UserDetailsModel model) 
        {
            return new UserDetailsDto
            {
                Id = model.Id,
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone
            };
        }
    }
}
