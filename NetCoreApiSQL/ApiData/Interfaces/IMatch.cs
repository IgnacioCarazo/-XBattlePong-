using ApiModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiData.Interfaces
{
    /// <summary>
    /// interfaz para entidad Match, define get,create,delete,update
    /// </summary>
    public interface IMatch
    {
        Task<IEnumerable<Match>> GetAllMatchs(string event_key);
        Task<Match> GetMatch(int match_id);
        Task<bool> InsertMatch(Match match);
    }
}
