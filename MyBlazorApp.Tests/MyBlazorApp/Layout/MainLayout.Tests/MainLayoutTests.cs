using System;
using Xunit;
using Bunit;
using Bunit.TestDoubles;
using MyBlazorApp.Components;
using Microsoft.Extensions.DependencyInjection;

namespace MyBlazorApp.Tests.Components
{
    public class MainLayoutTests : TestContext
    {
        [Fact]
        public void LayoutRendersChildContent()
        {
            // Arrange
            var sut = RenderComponent<MainLayout>(
                ChildContent("This is a test"));

            // Act
            var result = sut.Find("article.content px-4");

            // Assert
            result.MarkupMatches("This is a test");
        }

        [Fact]
        public void LayoutRendersSidebarWithNavMenu()
        {
            // Arrange
            var sut = RenderComponent<MainLayout>();

            // Act
            var result = sut.Find("div.sidebar");

            // Assert
            Assert.NotNull(result);
            Assert.Contains("NavMenu", result.InnerHtml);
        }

        [Fact]
        public void LayoutRendersAboutLink()
        {
            // Arrange
            var sut = RenderComponent<MainLayout>();

            // Act
            var result = sut.Find("a");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("https://learn.microsoft.com/aspnet/core/", result.GetAttribute("href"));
            Assert.Equal("About", result.TextContent);
        }
    }
}
