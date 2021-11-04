using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiModel
{
    /// <summary>
    /// Entidad evento con sus respectivos atributos
    /// </summary>
    public class Event
    {
        public int number { get; set; }
        public string event_key { get; set; }
        public int event_code { get; set; }
        public string name { get; set; }
        public string initial_date { get; set; }
        public string final_date { get; set; }
        public string initial_time { get; set; }
        public string final_time { get; set; }
        public int board_columns { get; set; }
        public int board_rows { get; set; }
        public string country { get; set; }
        public string location { get; set; }
        public int multiplayer { get; set; }
        public string client_name { get; set; }
        public int shooting_time { get; set; }
    }
}
