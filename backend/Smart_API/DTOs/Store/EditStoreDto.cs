namespace Smart_API.DTOs.Store
{
    public class EditStoreDto
    {
        public string Name { get; set; } = string.Empty;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
