
// ********RoostGPT********
/*

roost_feedback [4/30/2025, 6:36:19 AM]:- Add more comments to the test
*/

// ********RoostGPT********

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
            // Arrange - a child content for the main layout
            var sut = RenderComponent<MainLayout>(
                ChildContent("This is a test"));

            // Act - find the article.content px-4 inside the rendered component
            var result = sut.Find("article.content px-4");

            // Assert - markup must matches with the content
            result.MarkupMatches("This is a test");
        }

        [Fact]
        public void LayoutRendersSidebarWithNavMenu()
        {
            // Arrange - a mainlayout rendered component 
            var sut = RenderComponent<MainLayout>();

            // Act - find the div.sidebar inside the rendered component
            var result = sut.Find("div.sidebar");

            // Assert - sidebar is not null and includes the navigation menu
            Assert.NotNull(result);
            Assert.Contains("NavMenu", result.InnerHtml);
        }

        [Fact]
        public void LayoutRendersAboutLink()
        {
            // Arrange - a mainlayout rendered component
            var sut = RenderComponent<MainLayout>();

            // Act - find the link inside the rendered component
            var result = sut.Find("a");

            // Assert- link is not null, href attribute and text content is correct
            Assert.NotNull(result);
            Assert.Equal("https://learn.microsoft.com/aspnet/core/", result.GetAttribute("href"));
            Assert.Equal("About", result.TextContent);
        }
    }
}
