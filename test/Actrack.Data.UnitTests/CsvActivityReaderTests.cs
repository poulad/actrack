using System.Collections.Generic;
using Xunit;

namespace Actrack.Data.UnitTests
{
    public class CsvActivityReaderTests
    {
        [Theory]
        [InlineData("foo, 1:23")]
        [InlineData("foo,1:23")]
        [InlineData("    foo   ,1:23    ")]
        public void Should_Parse_Single_Activity(string text)
        {
            IActivityReader sut = new CsvReader();

            IEnumerable<Activity> activities = sut.ReadFromText(text);

            Assert.NotNull(activities);

            Activity ac = Assert.Single(activities);
            Assert.NotNull(ac);
            Assert.Equal("foo", ac.Title);
            Assert.NotNull(ac.Start);
            Assert.Equal(1, ac.Start.Value.Hour);
            Assert.Equal(23, ac.Start.Value.Minute);
        }
    }
}