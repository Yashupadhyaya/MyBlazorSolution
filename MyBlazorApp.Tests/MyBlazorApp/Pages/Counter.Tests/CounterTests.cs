using Bunit;
using Xunit;
using MyBlazorApp.Pages;

namespace MyBlazorApp.Tests
{
    public class CounterTests : TestContext
    {
        [Fact]
        [Trait("Category", "Rendering")]
        public void Counter_ShouldRenderCorrectly()
        {
            // Arrange
            var cut = RenderComponent<Counter>();

            // Act
            var title = cut.Find("h1");
            var status = cut.Find("p[role='status']");
            var button = cut.Find("button");

            // Assert
            Assert.Equal("Counter", title.TextContent);
            Assert.Equal("Current count: 0", status.TextContent);
            Assert.Equal("Click me", button.TextContent);
        }

        [Fact]
        [Trait("Category", "Interaction")]
        public void IncrementCount_ShouldIncreaseCounterValue()
        {
            // Arrange
            var cut = RenderComponent<Counter>();
            var button = cut.Find("button");

            // Act
            button.Click();

            // Assert
            var status = cut.Find("p[role='status']");
            Assert.Equal("Current count: 1", status.TextContent);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(5)]
        [InlineData(10)]
        [Trait("Category", "Interaction")]
        public void IncrementCount_ShouldIncreaseCounterValueMultipleTimes(int clicks)
        {
            // Arrange
            var cut = RenderComponent<Counter>();
            var button = cut.Find("button");

            // Act
            for (int i = 0; i < clicks; i++)
            {
                button.Click();
            }

            // Assert
            var status = cut.Find("p[role='status']");
            Assert.Equal($"Current count: {clicks}", status.TextContent);
        }

        [Fact]
        [Trait("Category", "Event")]
        public void Button_ShouldHaveCorrectCssClass()
        {
            // Arrange
            var cut = RenderComponent<Counter>();

            // Act
            var button = cut.Find("button");

            // Assert
            Assert.Contains("btn btn-primary", button.GetAttribute("class"));
        }
    }
}
