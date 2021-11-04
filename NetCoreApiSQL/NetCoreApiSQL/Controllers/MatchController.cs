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
    public class MatchController : Controller
    {

        private readonly IMatch _imatch;

        /// <summary>
        /// constructor de la clase
        /// </summary>
        /// <param name="evnt">interfaz evento</param>
        public MatchController(IMatch imatch)
        {
            _imatch = imatch;
        }

        /// <summary>
        /// metodo get para obtener partidas asociadas a una llave de evento
        /// </summary>
        /// <param name="event_key">llave del evento al cual se quieren obtener las partidas</param>
        /// <returns>lista de partidas (match)</returns>
        [HttpGet("allmatchs/{event_key}")]
        public async Task<IActionResult> GetAll(string event_key)
        {

            return Ok(await _imatch.GetAllMatchs(event_key));
        }

        /// <summary>
        /// metodo get para obtener una partida especifica por medio de su id unico
        /// </summary>
        /// <param name="match_id">int id unico que se utiliza para buscar la partida deseada</param>
        /// <returns>match con su id</returns>
        [HttpGet("match/{match_id}")]
        public async Task<IActionResult> GetMatch(int match_id)
        {
            return Ok(await _imatch.GetMatch(match_id));
        }

        /// <summary>
        /// metodo para post para insertar una nueva partida en la db
        /// </summary>
        /// <param name="match">match a insertar</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateMatch([FromBody] Match match)
        {
            if (match == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _imatch.InsertMatch(match);

            return Ok(await _imatch.GetAllMatchs(match.event_key));
        }
    
    }
}
