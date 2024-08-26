using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySocialService.DTO;
using MySocialService.Services.API;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDetailsDto>> GetCurrentUserDetails()
        {
            var user = await userService.GetCurrentUserDetails(User);
            return Ok(UserDetailsDto.MapToDto(user));

        }

        [HttpGet("users")]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUsers();
            return Ok(users.Select(UserDetailsDto.MapToDto));
        }

    }
}
