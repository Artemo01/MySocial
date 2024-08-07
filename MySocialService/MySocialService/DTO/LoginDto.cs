using MySocialService.Models;
using System.ComponentModel.DataAnnotations;

namespace MySocialService.DTO
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;

        public LoginModel MapToModel()
        {
            return new LoginModel { Email = this.Email, Password = this.Password };
        }
    }
}
