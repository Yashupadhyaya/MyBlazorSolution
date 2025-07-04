using Bunit;
using Xunit;
using Microsoft.Extensions.DependencyInjection;
using MyBlazorApp.Pages;

public class HomeTests : TestContext
{
    [Fact(DisplayName = "HomePage Renders Correctly")]
    public void HomePageRendersCorrectly()
    {
        // Act
        var cut = RenderComponent<Home>();

        // Assert
        cut.MarkupMatches("<h1>Hello, world!</h1>Welcome to your new app.");
    }
}
