using Microsoft.AspNetCore.Identity;
namespace Smart_API.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public List<Store>? Stores { get; set; }
    }
}
