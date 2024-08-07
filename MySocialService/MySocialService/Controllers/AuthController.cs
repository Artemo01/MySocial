using Microsoft.AspNetCore.Mvc;
using MySocialService.DTO;
using MySocialService.Services.API;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
        {
            var responce = await authService.Register(dto.MapToModel());
            return Ok(responce);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
        {
            var result = await authService.Login(dto.MapToModel());

            return Ok(result);
        }
    }
}
