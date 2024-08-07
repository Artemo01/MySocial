using MySocialService.Models;
using System.ComponentModel.DataAnnotations;

namespace MySocialService.DTO
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string UserName { get; set; } = string.Empty;

        public RegisterModel MapToModel()
        {
            return new RegisterModel 
            { 
                Email = this.Email, 
                Password = this.Password, 
                UserName = this.UserName
            };
        }
    }
}
