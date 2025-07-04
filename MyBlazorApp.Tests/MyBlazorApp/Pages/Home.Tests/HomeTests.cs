using BUnit;
using MyBlazorApp.Pages;
using Xunit;

public class HomeComponentTests
{
    private readonly TestContext _testContext;

    public HomeComponentTests()
    {
        _testContext = new TestContext();
    }

    [Fact]
    [Trait("Category", "Rendering")]
    public void HomeComponent_ShouldRenderCorrectMarkup()
    {
        // Arrange
        var component = _testContext.RenderComponent<Home>();

        // Act
        var renderedMarkup = component.Markup;

        // Assert
        Assert.Contains("<h1>Hello, world!</h1>", renderedMarkup);
        Assert.Contains("Welcome to your new app.", renderedMarkup);
        Assert.Contains("<PageTitle>Home</PageTitle>", renderedMarkup);
    }

    [Fact]
    [Trait("Category", "Rendering")]
    public void HomeComponent_ShouldRenderHomePageTitle()
    {
        // Arrange
        var component = _testContext.RenderComponent<Home>();

        // Act
        var pageTitle = component.Find("PageTitle");

        // Assert
        Assert.NotNull(pageTitle);
        Assert.Equal("Home", pageTitle.InnerHtml.Trim());
    }

    [Fact]
    [Trait("Category", "Lifecycle")]
    public void HomeComponent_LifecycleShouldRenderCorrectly()
    {
        // Arrange
        var component = _testContext.RenderComponent<Home>();

        // Act & Assert
        // Rendered output matches expected structure after lifecycle processing
        Assert.Contains("Hello, world!", component.Markup);
        Assert.Contains("Welcome to your new app.", component.Markup);
    }

    [Fact]
    [Trait("Category", "Interaction")]
    public void HomeComponent_NoInteractionsTriggerMarkup()
    {
        // Arrange
        var component = _testContext.RenderComponent<Home>();

        // Act
        // No user interaction as component is static.

        // Assert
        Assert.DoesNotContain("<button>", component.Markup); // Example assuring no buttons/events exist.
    }

    public void Dispose()
    {
        _testContext.Dispose();
    }
}
