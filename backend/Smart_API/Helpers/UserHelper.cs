using System.Security.Claims;

namespace Smart_API.Helpers
{
    public static class UserHelper
    {
        public static string GetUserId(ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
