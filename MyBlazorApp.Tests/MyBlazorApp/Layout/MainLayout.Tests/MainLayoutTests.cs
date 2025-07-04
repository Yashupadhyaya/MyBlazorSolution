using Bunit;
using Xunit;
using MyBlazorApp.Layout;

public class LayoutComponentTests
{
    private TestContext _testContext;

    public LayoutComponentTests()
    {
        _testContext = new TestContext();
    }

    [Fact]
    [Category("Rendering")]
    public void LayoutComponent_RendersCorrectMarkup()
    {
        // Arrange & Act
        var component = _testContext.RenderComponent<LayoutComponentBase>();

        // Assert
        component.MarkupMatches(@"
<div class=""page"">
    <div class=""sidebar"">
        <navmenu></navmenu>
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
    [Category("Rendering")]
    public void LayoutComponent_RendersChildBodyContent()
    {
        // Arrange
        var childContent = "<p>Test Content</p>";

        // Act
        var component = _testContext.RenderComponent<LayoutComponentBase>(parameters => parameters
            .AddChildContent(childContent));

        // Assert
        component.Find("article.content").MarkupMatches(childContent);
    }

    [Fact]
    [Category("Interaction")]
    public void LayoutComponent_TopRowShouldContainProperLink()
    {
        // Arrange & Act
        var component = _testContext.RenderComponent<LayoutComponentBase>();

        // Assert
        var aboutLink = component.Find("div.top-row a");
        Assert.Equal("https://learn.microsoft.com/aspnet/core/", aboutLink.GetAttribute("href"));
        Assert.Equal("_blank", aboutLink.GetAttribute("target"));
    }

    [Fact]
    [Category("Lifecycle")]
    public void LayoutComponent_RendersAfterChildParameterChange()
    {
        // Arrange
        var childContent = "<p>Initial Content</p>";
        var updatedContent = "<p>Updated Content</p>";

        var component = _testContext.RenderComponent<LayoutComponentBase>(parameters => parameters
            .AddChildContent(childContent));

        // Act
        component.SetParametersAndRender(parameters =>
            parameters.AddChildContent(updatedContent));

        // Assert
        component.Find("article.content").MarkupMatches(updatedContent);
    }

    [Fact]
    [Category("EdgeCases")]
    public void LayoutComponent_RendersEmptyWhenNoChildContentProvided()
    {
        // Arrange & Act
        var component = _testContext.RenderComponent<LayoutComponentBase>();

        // Assert
        var contentDiv = component.Find("article.content");
        Assert.Empty(contentDiv.InnerHtml);
    }

    public void Dispose()
    {
        _testContext.Dispose();
    }
}
