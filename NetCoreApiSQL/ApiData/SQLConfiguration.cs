using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiData
{
    /// <summary>
    /// clase que almacena la conexion con la base de datos
    /// </summary>
    public class SQLConfiguration
    {

        public SQLConfiguration(string connectionString) => ConnectionString = connectionString;

        public string ConnectionString { get; set; }
    }
}
