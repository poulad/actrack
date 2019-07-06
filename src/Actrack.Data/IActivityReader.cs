using System.Collections.Generic;

namespace Actrack.Data
{
    public interface IActivityReader
    {
        IEnumerable<Activity> ReadFromText(string text);
    }
}