using Bunit;
using Bunit.TestDoubles;
using Microsoft.Extensions.DependencyInjection;
using Xunit;
using MyBlazorApp.Pages;
using System.Net.Http;
using Moq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MyBlazorApp.Services;
using System.Linq;
using AngleSharp.Dom;
using System.Collections.Generic;

public class WeatherTests : TestContext
{
    [Fact]
    public async Task Should_Display_Loading_When_Data_Is_Not_Ready()
    {
        // Arrange
        var httpClientMock = new Mock<IHttpClientFactory>();
        var clientMock = new Mock<HttpClient>();
        httpClientMock.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(clientMock.Object);
        Services.AddSingleton<IHttpClientFactory>(httpClientMock.Object);

        // Act
        var cut = RenderComponent<Weather>();

        // Assert
        cut.MarkupMatches("<p><em>Loading...</em></p>");
    }

    [Fact]
    public async Task Should_Display_Data_When_Data_Is_Ready()
    {
        // Arrange
        var forecasts = new List<WeatherForecast>
        {
            new WeatherForecast
            {
                Date = DateTime.Now,
                TemperatureC = 20,
                Summary = "Sunny"
            },
            new WeatherForecast
            {
                Date = DateTime.Now.AddDays(1),
                TemperatureC = 22,
                Summary = "Cloudy"
            }
        };
        var httpMessageHandler = new MockHttpMessageHandler(JsonSerializer.Serialize(forecasts), System.Net.HttpStatusCode.OK);
        var httpClient = new HttpClient(httpMessageHandler);
        Services.AddHttpClient("TestClient", c => {});

        Services.AddSingleton(sp => new HttpClient { BaseAddress = new Uri("https://test") });

        // Act
        var cut = RenderComponent<Weather>();

        // Assert
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[0].Date.ToShortDateString());
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[0].TemperatureC.ToString());
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[0].TemperatureF.ToString());
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[0].Summary);

        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[1].Date.ToShortDateString());
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[1].TemperatureC.ToString());
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[1].TemperatureF.ToString());
        Assert.Contains(cut.FindAll("td"), td => td.TextContent == forecasts[1].Summary);
    }
}
