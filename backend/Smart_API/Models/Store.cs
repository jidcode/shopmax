using System.ComponentModel.DataAnnotations;

namespace Smart_API.Models
{
    public class Store
    {
        [Key] 
        public Guid Id { get; set; } = Guid.NewGuid(); 

        public string Name { get; set; } = string.Empty; 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public string UserId { get; set; } = string.Empty;

        public AppUser User { get; set; }
    }
}
