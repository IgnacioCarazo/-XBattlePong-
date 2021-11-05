using ApiData.Interfaces;
using ApiModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UnitTest
{
    /// <summary>
    /// Clase simula el servicio de evento para las pruebas
    /// </summary>
    class EventServiceFake : IEvent
    {
        private readonly List<Event> _eventList;
        /// <summary>
        /// Metodo constructor que inicia la lista con un elemento
        /// </summary>
        public EventServiceFake()
        {
            _eventList = new List<Event>()
            {
                new Event() {  number = 199, event_key = "CPIPOR",event_code = 12345,name = "TEST",initial_date = "2021-10-25", final_date = "2021-10-25",
                initial_time = "12:00",final_time = "12:00",  board_columns = 10, board_rows = 10,  country = "Costa Rica",  location = "Cartago",   multiplayer = 0,
                client_name = "TEC",   shooting_time = 10},
            };
        }
        public Task<bool> DeleteEvent(string event_key)
        {
            throw new System.NotImplementedException();
        }
        /// <summary>
        /// Metodo para obtener los elementos de la lista de evento
        /// </summary>
        /// <returns>lista de eventos</returns>
        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return _eventList;

        }

        public Task<Event> GetEvent(string event_key)
        {
            throw new System.NotImplementedException();
        }
        /// <summary>
        /// Metodo para insertar un evento en la lista de eventos
        /// </summary>
        /// <param name="evnt">evento para añadir en la lista</param>
        /// <returns>El resultado exitoso de la tarea</returns>
        public Task<bool> InsertEvent(Event evnt)
        {

            _eventList.Add(evnt);
            return Task.FromResult(true);
        }

        public Task<bool> UpdateEvent(Event evnt)
        {
            throw new System.NotImplementedException();
        }
    }
}
