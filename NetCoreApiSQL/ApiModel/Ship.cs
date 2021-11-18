using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiModel
{

    /// <summary>
    /// Entidad ship con sus respectivos atributos
    /// </summary>
    public class Ship
    {
        public string name { get; set; }
        public int length { get; set; }
        public int width { get; set; }
        public string image { get; set; }
        public int one_shot { get; set; }
        public int lives { get; set; }
    }
}
