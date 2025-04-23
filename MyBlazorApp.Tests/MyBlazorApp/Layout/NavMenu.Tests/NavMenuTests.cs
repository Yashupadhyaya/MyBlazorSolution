using Bunit;
using MyBlazorApp.Layout;
using Xunit;

namespace MyBlazorApp.Tests
{
    public class NavMenuTests : TestContext
    {
        [Fact]
        [Trait("Category", "rendering")]
        public void NavMenu_InitialRender_ShouldDisplayCorrectly()
        {
            // Arrange
            var cut = RenderComponent<NavMenu>();

            // Act & Assert
            cut.MarkupMatches(@"
                <div class=""top-row ps-3 navbar navbar-dark"">
                    <div class=""container-fluid"">
                        <a class=""navbar-brand"" href="""">MyBlazorApp</a>
                        <button title=""Navigation menu"" class=""navbar-toggler"">
                            <span class=""navbar-toggler-icon""></span>
                        </button>
                    </div>
                </div>
                <div class=""collapse nav-scrollable"">
                    <nav class=""flex-column"">
                        <div class=""nav-item px-3"">
                            <a class=""nav-link"" href="""" match=""All"">
                                <span class=""bi bi-house-door-fill-nav-menu"" aria-hidden=""true""></span> Home
                            </a>
                        </div>
                        <div class=""nav-item px-3"">
                            <a class=""nav-link"" href=""counter"">
                                <span class=""bi bi-plus-square-fill-nav-menu"" aria-hidden=""true""></span> Counter
                            </a>
                        </div>
                        <div class=""nav-item px-3"">
                            <a class=""nav-link"" href=""weather"">
                                <span class=""bi bi-list-nested-nav-menu"" aria-hidden=""true""></span> Weather
                            </a>
                        </div>
                    </nav>
                </div>
            ");
        }

        [Fact]
        [Trait("Category", "interaction")]
        public void ToggleNavMenu_WhenClicked_ShouldToggleNavMenuCssClass()
        {
            // Arrange
            var cut = RenderComponent<NavMenu>();
            var initialNavMenuCssClass = cut.Find(".nav-scrollable").ClassList;

            // Act
            cut.Find("button.navbar-toggler").Click();

            // Assert
            var updatedNavMenuCssClass = cut.Find(".nav-scrollable").ClassList;
            Assert.NotEqual(initialNavMenuCssClass, updatedNavMenuCssClass);
        }

        [Fact]
        [Trait("Category", "rendering")]
        public void NavMenu_ShouldHaveCorrectNumberOfNavLinks()
        {
            // Arrange
            var cut = RenderComponent<NavMenu>();

            // Act
            var navLinks = cut.FindAll(".nav-link");

            // Assert
            Assert.Equal(3, navLinks.Count);
        }

        [Theory]
        [InlineData("", "Home")]
        [InlineData("counter", "Counter")]
        [InlineData("weather", "Weather")]
        [Trait("Category", "rendering")]
        public void NavMenu_ShouldHaveCorrectNavLinkText(string href, string expectedText)
        {
            // Arrange
            var cut = RenderComponent<NavMenu>();

            // Act
            var navLink = cut.Find($".nav-link[href='{href}']");

            // Assert
            Assert.Contains(expectedText, navLink.TextContent);
        }

        [Fact]
        [Trait("Category", "interaction")]
        public void ToggleNavMenu_WhenClickedMultipleTimes_ShouldToggleCorrectly()
        {
            // Arrange
            var cut = RenderComponent<NavMenu>();
            var toggleButton = cut.Find("button.navbar-toggler");

            // Act & Assert
            for (int i = 0; i < 5; i++)
            {
                var initialState = cut.Find(".nav-scrollable").ClassList.Contains("collapse");
                toggleButton.Click();
                var newState = cut.Find(".nav-scrollable").ClassList.Contains("collapse");
                Assert.NotEqual(initialState, newState);
            }
        }
    }
}
