using ApiData.Interfaces;
using ApiModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreApiSQL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipController : Controller
    {
        private readonly IShip _iship;

        public ShipController(IShip iship)
        {
            _iship = iship;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _iship.GetAllShips());
        }

        [HttpGet("{event_key}")]
        public async Task<IActionResult> GetEShips(string event_key)
        {
            List<Ship> eventShip = (List<Ship>)await _iship.GetEventShips(event_key);

            return Ok(eventShip);
        }

    }
}
