using System;
using System.Collections.Generic;
using System.Linq;
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

        [Theory]
        [InlineData("Running, 06:45, on the forest trail\nBiking,8:0")]
        [InlineData("   Running,6:45,on the forest trail\r\n   Biking,  8:00 ")]
        public void Should_Parse_Multiple_Activities(string text)
        {
            IActivityReader sut = new CsvReader();

            IEnumerable<Activity> activities = sut.ReadFromText(text);

            Assert.NotNull(activities);
            Assert.Equal(2, activities.Count());

            {
                Activity acRun = activities.ElementAt(0);
                Assert.Equal("Running", acRun.Title);
                Assert.Equal(DateTime.Today.AddHours(6).AddMinutes(45), acRun.Start);
                Assert.Equal("on the forest trail", acRun.Description);
            }

            {
                Activity acBike = activities.ElementAt(1);
                Assert.Equal("Biking", acBike.Title);
                Assert.Equal(DateTime.Today.AddHours(8), acBike.Start);
                Assert.Null(acBike.Description);
            }
        }
    }
}