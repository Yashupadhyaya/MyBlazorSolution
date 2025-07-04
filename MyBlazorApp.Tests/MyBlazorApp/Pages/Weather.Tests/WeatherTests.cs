using Bunit;
using Xunit;
using System.Net.Http;
using System.Net.Http.Json;
using Moq;
using Microsoft.Extensions.DependencyInjection;
using MyBlazorApp.Pages;

public class WeatherComponentTests : TestContext
{
    [Fact]
    [Trait("Category", "Rendering")]
    public void WeatherComponent_WhenRenderedWithoutForecasts_DisplaysLoadingMessage()
    {
        // Arrange

        // Act
        var component = RenderComponent<Weather>();

        // Assert
        component.MarkupMatches("<p><em>Loading...</em></p>");
    }

    [Fact]
    [Trait("Category", "Rendering")]
    public void WeatherComponent_WhenRenderedWithForecasts_DisplaysWeatherTable()
    {
        // Arrange
        var forecasts = new[]
        {
            new Weather.WeatherForecast { Date = DateOnly.Parse("2023-01-01"), TemperatureC = 10, Summary = "Sunny" },
            new Weather.WeatherForecast { Date = DateOnly.Parse("2023-01-02"), TemperatureC = 15, Summary = "Cloudy" }
        };
        var mockHttpClient = new Mock<HttpClient>();
        Services.AddSingleton<HttpClient>(mockHttpClient.Object);
        SetupHttpClientMockResponse(mockHttpClient, forecasts);

        // Act
        var component = RenderComponent<Weather>();

        // Assert
        component.MarkupMatches(@"
            <table class=""table"">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01/01/2023</td>
                        <td>10</td>
                        <td>50</td>
                        <td>Sunny</td>
                    </tr>
                    <tr>
                        <td>01/02/2023</td>
                        <td>15</td>
                        <td>59</td>
                        <td>Cloudy</td>
                    </tr>
                </tbody>
            </table>
        ");
    }

    [Fact]
    [Trait("Category", "Lifecycle")]
    public async Task WeatherComponent_OnInitializedAsync_FetchesWeatherData()
    {
        // Arrange
        var forecasts = new[]
        {
            new Weather.WeatherForecast { Date = DateOnly.Parse("2023-01-01"), TemperatureC = 10, Summary = "Sunny" }
        };
        var mockHttpClient = new Mock<HttpClient>();
        Services.AddSingleton<HttpClient>(mockHttpClient.Object);
        SetupHttpClientMockResponse(mockHttpClient, forecasts);

        // Act
        var component = RenderComponent<Weather>();
        
        // Assert
        Assert.NotNull(component.Find("table"));
        Assert.Contains("Sunny", component.Markup);
    }

    // Helper method to mock HTTP client responses
    private void SetupHttpClientMockResponse(Mock<HttpClient> mockHttpClient, Weather.WeatherForecast[] forecasts)
    {
        var messageHandler = new Mock<HttpMessageHandler>();
        mockHttpClient.Setup(c => c.GetFromJsonAsync<Weather.WeatherForecast[]>("sample-data/weather.json"))
            .ReturnsAsync(forecasts);
    }
}
