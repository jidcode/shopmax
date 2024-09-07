using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Smart_API.DTOs.Account;
using Smart_API.Models;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Smart_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _config;


        public AccountController(
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<AppUser> signInManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string username = await GenerateUniqueUsername(model.FirstName);

            var user = new AppUser
            {
                UserName = username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Check if admin role exists, create if it doesn't
                if (!await _roleManager.RoleExistsAsync("Admin"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                await _userManager.AddToRoleAsync(user, "Admin");

                return Ok(new { message = "User registered successfully!" });
            }

            return StatusCode(500, result.Errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(request.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded || user == null)
            {
                return Unauthorized("Invalid username or password!");
            }

            var token = GenerateJwtToken(user!);

            return Ok(
                new UserDto
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email!,
                    Token = token
                });
        }

        private async Task<string> GenerateUniqueUsername(string firstName)
        {
            string baseUsername = firstName.ToLower().Substring(0, Math.Min(firstName.Length, 4));
            int remainingChars = 10 - baseUsername.Length;
            Random random = new Random();

            string username;
            do
            {
                string randomSuffix = new string(Enumerable.Repeat(0, remainingChars)
                    .Select(_ => (char)('0' + random.Next(10)))
                    .ToArray());
                username = $"{baseUsername}{randomSuffix}";
            } while (await _userManager.FindByNameAsync(username) != null);

            return username;
        }


        private string GenerateJwtToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds,
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"]
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
