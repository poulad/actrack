using System;
using System.Collections.Generic;
using System.Linq;

namespace Actrack.Data
{
    public class CsvReader : IActivityReader
    {
        public IEnumerable<Activity> ReadFromText(string text)
        {
            string[] lines = text.Split(new[] {Environment.NewLine}, StringSplitOptions.None);
            var activities = new List<Activity>(lines.Length);

            foreach (var line in lines)
            {
                Activity ac;
                string[] fields = line.Split(',').Select(f => f.Trim()).ToArray();
                if (fields.Length == 2)
                {
                    ac = new Activity
                    {
                        Title = fields[0],
                        Start = DateTime.Parse(fields[1]),
                    };
                }
                else if (fields.Length == 3)
                {
                    ac = new Activity
                    {
                        Title = fields[0],
                        Start = DateTime.Parse(fields[1]),
                        Description = fields[2],
                    };
                }
                else
                {
                    ac = null;
                }

                if (ac != null)
                {
                    activities.Add(ac);
                }
            }

            return activities;
        }
    }
}