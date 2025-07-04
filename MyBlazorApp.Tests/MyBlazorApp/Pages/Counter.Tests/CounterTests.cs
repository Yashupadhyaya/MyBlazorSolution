using Bunit;
using Xunit;
using MyBlazorApp.Pages;

namespace MyBlazorApp.Tests.Pages
{
    public class CounterComponentTests
    {
        [Fact, TestCategory("rendering")]
        public void CounterComponent_ShouldRenderWithInitialCount()
        {
            // Arrange
            using var context = new TestContext();

            // Act
            var component = context.RenderComponent<Counter>();

            // Assert
            var paragraphElement = component.Find("[role='status']");
            Assert.Equal("Current count: 0", paragraphElement.TextContent);
        }

        [Fact, TestCategory("interaction")]
        public void CounterComponent_ShouldIncrementCountOnClick()
        {
            // Arrange
            using var context = new TestContext();
            var component = context.RenderComponent<Counter>();

            // Act
            var buttonElement = component.Find("button");
            buttonElement.Click();

            // Assert
            var paragraphElement = component.Find("[role='status']");
            Assert.Equal("Current count: 1", paragraphElement.TextContent);
        }

        [Fact, TestCategory("event")]
        public void CounterComponent_ShouldTriggerIncrementCountEvent()
        {
            // Arrange
            using var context = new TestContext();
            var component = context.RenderComponent<Counter>();

            // Act
            var buttonElement = component.Find("button");
            buttonElement.Click();
            buttonElement.Click(); // Click twice to test multiple event triggers

            // Assert
            var paragraphElement = component.Find("[role='status']");
            Assert.Equal("Current count: 2", paragraphElement.TextContent);
        }

        [Fact, TestCategory("boundary")]
        public void CounterComponent_ShouldHandleClickWithoutErrors()
        {
            // Arrange
            using var context = new TestContext();
            var component = context.RenderComponent<Counter>();

            // Act
            for (int i = 0; i < 1000; i++) // Stress test with multiple clicks
            {
                var buttonElement = component.Find("button");
                buttonElement.Click();
            }

            // Assert
            var paragraphElement = component.Find("[role='status']");
            Assert.Equal("Current count: 1000", paragraphElement.TextContent); // TODO: Ensure this matches expected behavior under normal circumstances
        }

        [Fact, TestCategory("markup")]
        public void CounterComponent_ShouldIncludeExpectedMarkup()
        {
            // Arrange
            using var context = new TestContext();

            // Act
            var component = context.RenderComponent<Counter>();

            // Assert
            component.MarkupMatches(@"
                <h1>Counter</h1>
                <p role=""status"">Current count: 0</p>
                <button class=""btn btn-primary"">Click me</button>
            ");
        }
    }
}
