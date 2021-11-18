using ApiData.DataManagment;
using ApiData.Interfaces;
using ApiModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreApiSQL.Controllers
{
    /// <summary>
    /// controlados para peticiones http
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : Controller
    {
       
        private readonly IEvent _ievent;

        /// <summary>
        /// constructor de la clase
        /// </summary>
        /// <param name="evnt">interfaz evento</param>
        public EventController(IEvent evnt)
        {
            _ievent = evnt;
        }

        /// <summary>
        /// metodo para obtener todos los eventos
        /// </summary>
        /// <returns>lista de los eventos almacenado en db</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _ievent.GetAllEvents());
        }

        /// <summary>
        /// metodo para obtener evento especifico de la db
        /// </summary>
        /// <param name="event_key">key del evento a obtener</param>
        /// <returns>evento buscado</returns>
        [HttpGet("{event_key}")]
        public async Task<IActionResult> GetEvent(string event_key)
        {
            return Ok(await _ievent.GetEvent(event_key));
        }

        /// <summary>
        /// metodo para insertar nuevo evento en la db
        /// </summary>
        /// <param name="evnt">evento a insertar</param>
        /// <returns>lista de eventos</returns>
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Event evnt)
        {
            if (evnt == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            evnt.event_key = EventManagment.eventKey();


            foreach (var ship in evnt.shipAvailable)
            {
                EventShip eventShip = new EventShip();
                eventShip.event_key = evnt.event_key;
                eventShip.ship_name = ship.name;
                await _ievent.InsertEventShip(eventShip);
            }

            
            await _ievent.InsertEvent(evnt);

            return Ok(await _ievent.GetAllEvents());
        }

        /// <summary>
        /// metodo para actualizar informacion de un evento de la db
        /// </summary>
        /// <param name="evnt">evento a actualizar</param>
        /// <returns>lista de eventos actualizados</returns>
        [HttpPut]
        public async Task<IActionResult> UpdateEvent([FromBody] Event evnt)
        {
            if (evnt == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _ievent.UpdateEvent(evnt);

            return Ok(await _ievent.GetAllEvents());
        }

        /// <summary>
        /// metodo para eliminar un evento de la db
        /// </summary>
        /// <param name="event_key">key del evento a eliminar</param>
        /// <returns>ista de eventos</returns>
        [HttpDelete("{event_key}")]
        public async Task<IActionResult> DeleteEvent(string event_key)
        {
            
            await _ievent.DeleteEvent(event_key);

            return Ok(await _ievent.GetAllEvents());
        }
    }
}
