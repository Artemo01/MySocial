using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        public UsersController(UserManager<IdentityUser> userManager) 
        {
            this.userManager = userManager;
        }

        //ONLY FOR TEST. LATER IT WILL BE REFACTOR INTO MVC

        [HttpGet]
        public async Task<IActionResult> GetUserData()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var userData = new
            {
                user.UserName,
                user.Email,
                user.PhoneNumber,
            };

            return Ok(userData);
        }
    }
}
