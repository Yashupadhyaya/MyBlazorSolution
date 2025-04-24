using Bunit;
using Xunit;
using MyBlazorApp.Pages;

public class CounterTests : TestContext
{
    [Fact]
    public void CounterComponentRendersCorrectlyOnInitialization()
    {
        // Arrange
        var cut = RenderComponent<Counter>();

        // Assert
        cut.MarkupMatches("<h1>Counter</h1><p role=\"status\">Current count: 0</p><button class=\"btn btn-primary\">Click me</button>");
    }
    
    [Fact]
    public void CounterComponentIncrementsCountOnButtonClick()
    {
        // Arrange
        var cut = RenderComponent<Counter>();

        // Act
        cut.Find("button").Click();

        // Assert
        Assert.Equal("Current count: 1", cut.Find("p").TextContent);
    }

    [Fact]
    public void CounterComponentIncrementsCountMultipleTimes()
    {
        // Arrange
        var cut = RenderComponent<Counter>();
        
        // Act
        var button = cut.Find("button");
        for (int i = 1; i < 5; i++)
        {
            button.Click();
            // Assert
            Assert.Equal($"Current count: {i}", cut.Find("p").TextContent);
        }
    }
}
