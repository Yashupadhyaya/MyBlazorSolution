using Bunit;
using Xunit;
using MyBlazorApp.Layout;

namespace MyBlazorApp.Tests
{
    public class MainLayoutTests : TestContext
    {
        [Fact]
        [Trait("Category", "rendering")]
        public void MainLayout_ShouldRenderCorrectly()
        {
            // Arrange
            var cut = RenderComponent<MainLayout>();

            // Act & Assert
            cut.MarkupMatches(
                @"<div class=""page"">
                    <div class=""sidebar"">
                        <NavMenu />
                    </div>
                    <main>
                        <div class=""top-row px-4"">
                            <a href=""https://learn.microsoft.com/aspnet/core/"" target=""_blank"">About</a>
                        </div>
                        <article class=""content px-4"">
                        </article>
                    </main>
                </div>");
        }

        [Fact]
        [Trait("Category", "rendering")]
        public void MainLayout_ShouldRenderNavMenu()
        {
            // Arrange
            var cut = RenderComponent<MainLayout>();

            // Act & Assert
            cut.FindComponent<NavMenu>();
        }

        [Fact]
        [Trait("Category", "rendering")]
        public void MainLayout_ShouldRenderAboutLink()
        {
            // Arrange
            var cut = RenderComponent<MainLayout>();

            // Act
            var aboutLink = cut.Find("a");

            // Assert
            Assert.Equal("https://learn.microsoft.com/aspnet/core/", aboutLink.GetAttribute("href"));
            Assert.Equal("_blank", aboutLink.GetAttribute("target"));
            Assert.Equal("About", aboutLink.TextContent);
        }

        [Fact]
        [Trait("Category", "rendering")]
        public void MainLayout_ShouldRenderBodyContent()
        {
            // Arrange
            var cut = RenderComponent<MainLayout>(parameters => parameters
                .Add(p => p.Body, "<p>Test Body Content</p>"));

            // Act
            var bodyContent = cut.Find("article.content");

            // Assert
            Assert.Equal("<p>Test Body Content</p>", bodyContent.InnerHtml);
        }

        // TODO: Add more tests if additional functionality is added to the component
    }
}
