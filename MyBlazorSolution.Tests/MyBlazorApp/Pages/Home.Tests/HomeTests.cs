using Bunit;
using Xunit;
using MyBlazorApp.Pages;
using Microsoft.AspNetCore.Components;

namespace MyBlazorApp.Tests
{
    public class HomeComponentTest : TestContext
    {
        [Fact(DisplayName = "Component Rendering")]
        public void CheckComponentIsCorrectlyRendered()
        {
            // Act
            var cut = RenderComponent<Home>();

            // Assert
            cut.MarkupMatches("<h1>Hello, world!</h1><p>Welcome to your new app.</p>");
        }
    }
}
