using Bunit;
using Xunit;
using MyBlazorApp.Pages;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.DependencyInjection;
using Moq;

public class CounterComponentTests : TestContext
{
    [Fact]
    public void CounterComponentRendersCorrectlyOnInit()
    {
        // Arrange
        var cut = RenderComponent<Counter>();

        // Assert
        cut.Find("h1").MarkupMatches("<h1>Counter</h1>");
        cut.Find("p").MarkupMatches("<p role=\"status\">Current count: 0</p>");
        cut.Find("button").MarkupMatches("<button class=\"btn btn-primary\">Click me</button>");
    }

    [Fact]
    public void CounterIncrementCorrectly()
    {
        // Arrange
        var cut = RenderComponent<Counter>();
        var button = cut.Find("button");

        // Act
        button.TriggerEventAsync("onclick", new MouseEventArgs());

        // Assert
        cut.Find("p").MarkupMatches("<p role=\"status\">Current count: 1</p>");

        // Act
        button.TriggerEventAsync("onclick", new MouseEventArgs());

        // Assert
        cut.Find("p").MarkupMatches("<p role=\"status\">Current count: 2</p>");
    }
}
