using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySocialService.Mappers;
using MySocialService.Services.API;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        public UsersController(IUserService userService) 
        {;
            this.userService = userService;
        }

        [HttpGet("currentUser")]
        public async Task<IActionResult> GetUserData()
        {
            var user = await userService.GetCurrentUser(User);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var dto = UserMapper.MapToDto(user);


            return Ok(dto);
        }

        [HttpGet("allUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUsers();
            var dto = users.Select(UserMapper.MapToDto);
            return Ok(dto);
        }
    }
}
