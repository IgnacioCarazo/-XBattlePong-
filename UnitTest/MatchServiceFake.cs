using ApiData.Interfaces;
using ApiModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UnitTest
{
    /// <summary>
    /// Clase simula el servicio de partidas para las pruebas
    /// </summary>
    class MatchServiceFake : IMatch
    {
        private readonly List<Match> _matchList;
        /// <summary>
        /// Metodo constructor que inicia la lista con un elemento
        /// </summary>
        public MatchServiceFake()
        {
            _matchList = new List<Match>()
            {
                new Match() {   event_key = "CPIPOT",match_id = 12345,player1 = "Haziel", player2 = "Ignacio",
                players = 2,player_1_ships = null,player_2_ships = null, player_1_history = 1, player_2_history = 1
                }
            };
        }
        /// <summary>
        /// Metodo para obtener los elementos de la lista de partida
        /// </summary>
        /// <returns>lista de partidas</returns>
        public async Task<IEnumerable<Match>> GetAllMatchs(string event_key)
        {
            return _matchList;
        }

        public Task<Match> GetMatch(int match_id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Metodo para insertar una partida en la lista de partidas
        /// </summary>
        /// <param name="match">partida para añadir en la lista</param>
        /// <returns>El resultado exitoso de la tarea</returns>
        public Task<bool> InsertMatch(Match match)
        {
            _matchList.Add(match);
            return Task.FromResult(true);
        }
    }
}
