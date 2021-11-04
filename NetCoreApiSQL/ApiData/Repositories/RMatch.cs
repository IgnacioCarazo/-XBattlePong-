using ApiData.Interfaces;
using ApiModel;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiData.Repositories
{
    /// <summary>
    /// Implementacion y logica de la interfaz IMatch propio de la entidad Match, CRUD en base de datos
    /// </summary>
    public class RMatch : IMatch
    {
        /// <summary>
        /// string que guarda la conexcion con base de datos
        /// </summary>
        private SQLConfiguration _connectionString;

        /// <summary>
        /// constructor de clase RMatch
        /// </summary>
        /// <param name="connectionString">string para conectar con db</param>
        public RMatch(SQLConfiguration connectionString) => _connectionString = connectionString;

        /// <summary>
        /// metodo de conexion db sql
        /// </summary>
        /// <returns>nueva conexion con db</returns>
        protected SqlConnection dbConnection()
        {
            return new SqlConnection(_connectionString.ConnectionString);
        }

        /// <summary>
        /// metodo para obtener todas las partidas guardas en la base de datos asociadas a un evento,esto utilizano llave unica (event_key)
        /// </summary>
        /// <param name="event_key">llave unica del evento al cual se buscan las partidas guardadas</param>
        /// <returns>lista de match asociadas a un evento</returns>
        public async Task<IEnumerable<Match>> GetAllMatchs(string event_key)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT *
                        FROM ""Match""
                        WHERE event_key = @event_key";

            var result = await db.QueryAsync<Match>(sql, new {event_key = event_key});

            if (result == null)
            {
                result = new List<Match>();
            }
            return result;
        }

        /// <summary>
        /// metodo para obtener una partida especifica guardada en la db
        /// </summary>
        /// <param name="match_id">int del id de la partida que se quiere buscar</param>
        /// <returns>partida (objeto match) buscada por el id</returns>
        public async Task<Match> GetMatch(int match_id)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT *
                        FROM ""Match""
                        WHERE match_id = @match_id
                        ";

            return await db.QueryFirstOrDefaultAsync<Match>(sql, new { match_id = match_id });
        }

        /// <summary>
        /// metodo para insertar un nuevo match en la base de datos
        /// </summary>
        /// <param name="match">match a insertar en db</param>
        /// <returns>int que indica si la consulta o la insercion fue exitos</returns>
        public async Task<bool> InsertMatch(Match match)
        {
            var db = dbConnection();



            var sql = @"
                        INSERT INTO ""Match"" (event_key, player1_id, player2_id, players, player_1_history, player_2_history)
                        VALUES (@event_key, @player1, @player2, @players, @player_1_history, @player_2_history) ";

            var result = await db.ExecuteAsync(sql,
                new
                {
                    match.event_key,
                    match.player1,
                    match.player2,
                    match.players,
                    match.player_1_history,
                    match.player_2_history
                });

            return result > 0;
        }
    }
}
