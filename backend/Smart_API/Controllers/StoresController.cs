using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smart_API.Data;
using Smart_API.Models;
using Microsoft.AspNetCore.Authorization;
using Mapster;
using Smart_API.DTOs.Store;
using Smart_API.Helpers;

namespace Smart_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class StoresController : ControllerBase
    {
        private readonly DataContext _context;

        public StoresController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<StoreDto>>> GetAllStores()
        {
            var userId = UserHelper.GetUserId(User);

            var result = await _context.Stores
                .Where(store => store.UserId == userId)
                .ToListAsync();

            var stores = result.Adapt<List<StoreDto>>();

            return Ok(stores);
        }


        [HttpGet("{id}", Name = "GetStore")]
        public async Task<ActionResult<StoreDto>> GetStore([FromRoute] Guid id)
        {
            var result = await _context.Stores.FindAsync(id);

            if (result == null)
            {
                return NotFound("Store not found");
            }

            var store = result.Adapt<StoreDto>();

            return Ok(store);
        }


        [HttpPost]
        public async Task<ActionResult<StoreDto>> CreateStore([FromBody] CreateStoreDto request)
        {
            var userId = UserHelper.GetUserId(User);

            var store = new Store
            {
                Name = request.Name,
                UserId = userId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };

            await _context.Stores.AddAsync(store);
            await _context.SaveChangesAsync();

            // Map Store to StoreDto
            var storeDto = store.Adapt<StoreDto>();

            return CreatedAtRoute("GetStore", new { id = store.Id }, storeDto);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<StoreDto>> UpdateStore([FromRoute] Guid id, [FromBody] EditStoreDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingStore = await _context.Stores.FindAsync(id);

            if (existingStore == null)
            {
                return NotFound("Store not found");
            }

            var userId = UserHelper.GetUserId(User);

            existingStore.Name = request.Name;
            existingStore.UpdatedAt = DateTime.Now;
            existingStore.UserId = userId;

            await _context.SaveChangesAsync();

            var storeDto = existingStore.Adapt<StoreDto>();

            return Ok(storeDto);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteStore(Guid id)
        {
            var store = _context.Stores.Find(id);

            if (store == null)
            {
                return NotFound("Store not found");
            }

            _context.Stores.Remove(store);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
