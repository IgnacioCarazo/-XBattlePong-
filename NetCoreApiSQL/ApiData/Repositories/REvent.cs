using ApiData.Interfaces;
using ApiModel;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace ApiData.Repositories
{
    /// <summary>
    /// Implementacion y logica de la interfaz IEvent propio de la entidad Evento, manejo de data en sql CRUD
    /// </summary>
    public class REvent : IEvent
    {
       /// <summary>
       /// string que guarda la conexcion con base de datos
       /// </summary>
        private SQLConfiguration _connectionString;

        /// <summary>
        /// constructor de clase REvent
        /// </summary>
        /// <param name="connectionString">string para conectar con db</param>
        public REvent(SQLConfiguration connectionString) => _connectionString = connectionString;
        

        /// <summary>
        /// metodo de conexion db sql
        /// </summary>
        /// <returns>nueva conexion con db</returns>
        protected SqlConnection dbConnection()
        {
            return new SqlConnection(_connectionString.ConnectionString);
        }



        /// <summary>
        /// metodo para hacer update a un evento especifico de la db
        /// </summary>
        /// <param name="evnt">evento a actualizar</param>
        /// <returns>int que indica si fue exitosa la operacion</returns>
        public async Task<bool> UpdateEvent(Event evnt)
        {
            var db = dbConnection();

            var sql = @"
                        UPDATE ""Event""
                        SET number = @number,
                            event_key = @event_key, 
                            event_code = @event_code
                            name = @name, 
                            initial_date = @initial_date, 
                            final_date = @final_date, 
                            initial_date = @initial_time, 
                            final_time = @final_time, 
                            board_columns = @board_columns, 
                            board_rows = @board_rows, 
                            country = @country, 
                            location = @location, 
                            multiplayer = @multiplayer,
                            client_name = @client_name,
                            shooting_time = @shooting_time
                        WHERE event_key = @event_key ";
            
            var result = await db.ExecuteAsync(sql,
                new
                {
                    evnt.number,
                    evnt.event_key,
                    evnt.event_code,
                    evnt.name,
                    evnt.initial_date,
                    evnt.final_date,
                    evnt.initial_time,
                    evnt.final_time,
                    evnt.board_columns,
                    evnt.board_rows,
                    evnt.country,
                    evnt.location,
                    evnt.multiplayer,
                    evnt.client_name,
                    evnt.shooting_time

                });
            return result > 0;
        }

        /// <summary>
        /// metodo para obtener todos los eventos almacenados en la base de datos
        /// </summary>
        /// <returns>lista de eventos guardados</returns>
        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            var db = dbConnection();

            var sql = @"
                        SELECT *
                        FROM ""Event"" ";

            return await db.QueryAsync<Event>(sql, new { });
        }

        /// <summary>
        /// metodo para obtener evento especifico de la base de datos
        /// </summary>
        /// <param name="event_key">key para identificar el evento a obtener</param>
        /// <returns>objeto de tipo Evento</returns>
        public async Task<Event> GetEvent(string event_key)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT *
                        FROM ""Event""
                        WHERE event_key = @event_key
                        ";

            return await db.QueryFirstOrDefaultAsync<Event>(sql, new {event_key = event_key });
        }

        /// <summary>
        /// metodo para insertar un nuevo evento en la base de datos
        /// </summary>
        /// <param name="evnt">evento a insertar en db</param>
        /// <returns>int que indica si fue exitosa la operacion</returns>
        public async Task<bool> InsertEvent(Event evnt)
        {
            var db = dbConnection();

         
            var sql = @"
                        INSERT INTO ""Event"" (event_key, event_code, name, initial_date, final_date, initial_time, final_time, board_columns, board_rows, country, location, multiplayer, client_name, shooting_time)
                        VALUES (@event_key, @event_code, @name, @initial_date, @final_date, @initial_time, @final_time, @board_columns, @board_rows, @country, @location, @multiplayer, @client_name, @shooting_time) ";

            var result = await db.ExecuteAsync(sql, 
                new {
                    evnt.event_key,
                    evnt.event_code,
                    evnt.name,
                    evnt.initial_date,
                    evnt.final_date,
                    evnt.initial_time,
                    evnt.final_time,
                    evnt.board_columns,
                    evnt.board_rows,
                    evnt.country,
                    evnt.location,
                    evnt.multiplayer,
                    evnt.client_name,
                    evnt.shooting_time

                });

            return result > 0;
        }

        /// <summary>
        /// metodo para eliminar un evento especifico de la base de datos
        /// </summary>
        /// <param name="event_key">key del evento a eliminar</param>
        /// <returns>int que indica si fue existosa la operacion</returns>
        public async Task<bool> DeleteEvent(string event_key)
        {
            var db = dbConnection();

     
            var sql = @"
                        DELETE 
                        FROM ""Event"" 
                        WHERE event_key = @event_key";

            var sql2 = @"
                        DELETE 
                        FROM ""Match"" 
                        WHERE event_key = @event_key";


            var result = await db.ExecuteAsync(sql, new { event_key = event_key });

            await db.ExecuteAsync(sql2, new { event_key = event_key });

            return result > 0;
        }

        public async Task<bool> InsertEventShip(EventShip eventShip)
        {
            var db = dbConnection();

            var sql = @"
                        INSERT INTO ""Ship"" (event_key, ship_name)
                        VALUES (@event_key, @ship_name) ";

            var result = await db.ExecuteAsync(sql,
                new
                {
                    eventShip.event_key,
                    eventShip.ship_name
                });

            return result > 0;
        }
    }
}
