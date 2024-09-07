﻿using Smart_API.Models;

namespace Smart_API.DTOs.Store
{
    public class StoreDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public string UserId { get; set; } = string.Empty;
    }
}
