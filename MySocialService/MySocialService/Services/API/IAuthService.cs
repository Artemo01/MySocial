using Microsoft.AspNetCore.Mvc;
using MySocialService.DTO;
using MySocialService.Models;

namespace MySocialService.Services.API
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Register(RegisterModel model);
        Task<AuthResponseDto> Login(LoginModel model);
    }
}
