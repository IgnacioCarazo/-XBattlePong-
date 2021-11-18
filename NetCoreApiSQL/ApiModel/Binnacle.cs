using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiModel
{
    /// <summary>
    /// Entidad binnacle (bitacora) con sus respectivos atributos
    /// </summary>
    public class Binnacle
    {
        public int id { get; set; }
        public string user_email { get; set; }
        public string accurate_shots { get; set; }
        public string lastx_shot { get; set; }
        public string lasty_shot { get; set; }
    }
}
