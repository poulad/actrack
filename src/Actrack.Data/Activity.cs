using System;
using System.Collections.Generic;

namespace Actrack.Data
{
    public class Activity
    {
        public string Title { get; set; }
        public string Category { get; set; }
        public string Kind { get; set; }
        public string Description { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public TimeSpan? Duration { get; set; }
        public DateTime? RecordedAt { get; set; }
        public ICollection<string> Labels { get; set; }
    }
}