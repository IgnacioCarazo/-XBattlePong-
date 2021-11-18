using ApiModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiData.Interfaces
{
    public interface IShip
    {
        Task<IEnumerable<Ship>> GetAllShips();

        Task<IEnumerable<Ship>> GetEventShips(string event_key);

        Task<bool> InsertShip(Ship ship);

       
    }
}
