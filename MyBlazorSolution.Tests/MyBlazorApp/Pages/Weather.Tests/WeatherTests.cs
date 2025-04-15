using Bunit;
using Xunit;
using Moq;
using MyBlazorApp.Pages;
using Bunit.TestDoubles;
using System.Net.Http;
using System.Text.Json;
using System.Net;
using System.Collections.Generic;

public class WeatherComponentTests : TestContext
{
    [Fact]
    public void WeatherComponentRendersCorrectlyWhileLoading()
    {
        // Arrange
        AddTestAuthorization().SetNotAuthorized("weather.read");
        Services.AddMockHttpClient();
        
        // Act
        var cut = RenderComponent<Weather>();

        // Assert
        cut.MarkupMatches("<h1>Weather</h1><p>This component demonstrates fetching data from the server.</p><p><em>Loading...</em></p>");
    }

    [Fact]
    public void WeatherComponentRendersCorrectlyWithData()
    {
        // Arrange
        AddTestAuthorization().SetAuthorized("weather.read");
        var expectedForecasts = new Weather[]
        {
            new Weather { Date = today, TemperatureC = 20, TemperatureF = 68, Summary = "Sunny" },
            new Weather { Date = tomorrow, TemperatureC = 15, TemperatureF = 59, Summary = "Cloudy" }
        };

        var handler = new TestMessageHandler(JsonSerializer.Serialize(expectedForecasts), HttpStatusCode.OK);
        Services.AddMockHttpClient(handler);

        // Act
        var cut = RenderComponent<Weather>();

        // Assert
        cut.Find("table");
        cut.FindAll("tr").Count.Equals(2);
    }
    
    [Fact]
    public void WeatherComponentRendersCorrectlyWithNoData()
    {
        // Arrange
        AddTestAuthorization().SetAuthorized("weather.read");
        var expectedForecasts = new Weather[] { };
        var handler = new TestMessageHandler(JsonSerializer.Serialize(expectedForecasts), HttpStatusCode.OK);
        Services.AddMockHttpClient(handler);

        // Act
        var cut = RenderComponent<Weather>();

        // Assert
        cut.Find("table");
        Assert.Empty(cut.FindAll("tr"));
    }
}
