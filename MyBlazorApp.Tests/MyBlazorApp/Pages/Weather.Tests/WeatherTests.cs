using Bunit;
using Microsoft.Extensions.DependencyInjection;
using MyBlazorApp.Pages;
using RichardSzalay.MockHttp;
using System.Net.Http;
using Xunit;

namespace MyBlazorApp.Tests
{
    public class WeatherTests : TestContext
    {
        [Fact]
        [Trait("Category", "Rendering")]
        public void Weather_InitialRender_ShowsLoadingMessage()
        {
            // Arrange
            var mockHttp = new MockHttpMessageHandler();
            var client = new HttpClient(mockHttp);
            Services.AddSingleton(client);

            // Act
            var cut = RenderComponent<Weather>();

            // Assert
            cut.MarkupMatches("<h1>Weather</h1><p>This component demonstrates fetching data from the server.</p><p><em>Loading...</em></p>");
        }

        [Fact]
        [Trait("Category", "Rendering")]
        public void Weather_DataLoaded_RendersWeatherTable()
        {
            // Arrange
            var mockHttp = new MockHttpMessageHandler();
            mockHttp.When("sample-data/weather.json")
                    .Respond("application/json", "[{\"date\":\"2023-05-01\",\"temperatureC\":20,\"summary\":\"Mild\"}]");
            var client = mockHttp.ToHttpClient();
            Services.AddSingleton(client);

            // Act
            var cut = RenderComponent<Weather>();

            // Assert
            cut.WaitForAssertion(() => cut.FindAll("table").Count.Should().Be(1));
            cut.FindAll("th")[0].TextContent.Should().Be("Date");
            cut.FindAll("th")[1].TextContent.Should().Be("Temp. (C)");
            cut.FindAll("th")[2].TextContent.Should().Be("Temp. (F)");
            cut.FindAll("th")[3].TextContent.Should().Be("Summary");
            cut.FindAll("td")[0].TextContent.Should().Be("5/1/2023");
            cut.FindAll("td")[1].TextContent.Should().Be("20");
            cut.FindAll("td")[2].TextContent.Should().Be("67");
            cut.FindAll("td")[3].TextContent.Should().Be("Mild");
        }

        [Fact]
        [Trait("Category", "Rendering")]
        public void Weather_NoData_ShowsEmptyTable()
        {
            // Arrange
            var mockHttp = new MockHttpMessageHandler();
            mockHttp.When("sample-data/weather.json")
                    .Respond("application/json", "[]");
            var client = mockHttp.ToHttpClient();
            Services.AddSingleton(client);

            // Act
            var cut = RenderComponent<Weather>();

            // Assert
            cut.WaitForAssertion(() => cut.FindAll("table").Count.Should().Be(1));
            cut.FindAll("tbody tr").Count.Should().Be(0);
        }

        [Fact]
        [Trait("Category", "Rendering")]
        public void Weather_ErrorLoading_ShowsErrorMessage()
        {
            // Arrange
            var mockHttp = new MockHttpMessageHandler();
            mockHttp.When("sample-data/weather.json")
                    .Respond(System.Net.HttpStatusCode.InternalServerError);
            var client = mockHttp.ToHttpClient();
            Services.AddSingleton(client);

            // Act
            var cut = RenderComponent<Weather>();

            // Assert
            cut.WaitForAssertion(() => cut.MarkupMatches("<h1>Weather</h1><p>This component demonstrates fetching data from the server.</p><p><em>Error loading weather data.</em></p>"));
        }

        [Theory]
        [InlineData(0, 32)]
        [InlineData(100, 212)]
        [InlineData(-40, -40)]
        [Trait("Category", "Rendering")]
        public void Weather_TemperatureConversion_CalculatesCorrectly(int temperatureC, int expectedTemperatureF)
        {
            // Arrange
            var mockHttp = new MockHttpMessageHandler();
            mockHttp.When("sample-data/weather.json")
                    .Respond("application/json", $"[{{\"date\":\"2023-05-01\",\"temperatureC\":{temperatureC},\"summary\":\"Test\"}}]");
            var client = mockHttp.ToHttpClient();
            Services.AddSingleton(client);

            // Act
            var cut = RenderComponent<Weather>();

            // Assert
            cut.WaitForAssertion(() => cut.FindAll("td")[2].TextContent.Should().Be(expectedTemperatureF.ToString()));
        }
    }
}
