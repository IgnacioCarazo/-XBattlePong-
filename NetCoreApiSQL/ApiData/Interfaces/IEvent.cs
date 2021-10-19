using ApiModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiData.Interfaces
{
    /// <summary>
    /// interfaz para entidad Evento, define get,create,delete,update
    /// </summary>
    public interface IEvent
    {
        Task<IEnumerable<Event>> GetAllEvents();
        Task<Event> GetEvent(string event_key);
        Task<bool> InsertEvent(Event evnt);
        Task<bool> DeleteEvent(string event_key);
        Task<bool> UpdateEvent(Event evnt);
    }

}
