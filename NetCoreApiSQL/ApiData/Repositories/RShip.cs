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
    public class RShip : IShip
    {

        private SQLConfiguration _connectionString;

        public RShip(SQLConfiguration connectionString) => _connectionString = connectionString;


        protected SqlConnection dbConnection()
        {
            return new SqlConnection(_connectionString.ConnectionString);
        }



        public async Task<IEnumerable<Ship>> GetAllShips()
        {
            var db = dbConnection();

            var sql = @"
                        SELECT *
                        FROM ""Ship"" ";

            return await db.QueryAsync<Ship>(sql, new { });
        }

        public async Task<IEnumerable<Ship>> GetEventShips(string event_key)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT S.name, S.length, S.width, S.image, S.one_shot, lives
                        FROM ""Ship"" S 
                        JOIN ""EventShips"" E
                        ON S.name = E.ship_name
                        WHERE E.event_key = @event_key";

            return await db.QueryAsync<Ship>(sql, new { event_key = event_key});

        }

        public async Task<bool> InsertShip(Ship ship)
        {
            var db = dbConnection();

            var sql = @"
                        INSERT INTO ""Ship"" (name, length, width, image, one_shot, lives)
                        VALUES (@name, @length, @width, @image, @one_shot, @lives) ";

            var result = await db.ExecuteAsync(sql,
                new
                {
                    ship.name,
                    ship.length,
                    ship.width,
                    ship.image,
                    ship.one_shot,
                    ship.lives
                });

            return result > 0;
        }
    }
}
