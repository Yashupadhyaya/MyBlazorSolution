using Bunit;
using Xunit;
using MyBlazorApp.Pages;

namespace MyBlazorApp.Tests
{
    public class HomeTests : TestContext
    {
        [Fact]
        [Trait("Category", "Rendering")]
        public void Home_ShouldRenderCorrectly()
        {
            // Arrange
            var cut = RenderComponent<Home>();

            // Assert
            cut.MarkupMatches(@"
                <h1>Hello, world!</h1>
                Welcome to your new app.
            ");
        }

        [Fact]
        [Trait("Category", "Rendering")]
        public void Home_ShouldHaveCorrectPageTitle()
        {
            // Arrange
            var cut = RenderComponent<Home>();

            // Assert
            var pageTitle = cut.Find("PageTitle");
            Assert.Equal("Home", pageTitle.TextContent);
        }

        [Fact]
        [Trait("Category", "Rendering")]
        public void Home_ShouldContainWelcomeMessage()
        {
            // Arrange
            var cut = RenderComponent<Home>();

            // Assert
            cut.Contains("Welcome to your new app.");
        }
    }
}
