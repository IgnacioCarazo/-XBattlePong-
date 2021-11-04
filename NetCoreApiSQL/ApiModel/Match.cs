using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiModel
{
    public class Match
    {
        public string event_key { get; set; }
        public int match_id { get; set; }
        public string player1 { get; set; }
        public string player2 { get; set; }
        public int players { get; set; }
        public Ship[] player_1_ships {get;set;}
        public Ship[] player_2_ships { get; set; }
        public int player_1_history { get; set; }
        public int player_2_history { get; set; }
    }
}
