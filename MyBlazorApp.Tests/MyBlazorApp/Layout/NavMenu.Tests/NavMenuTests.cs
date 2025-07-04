using Bunit;
using Xunit;
using MyBlazorApp.Layout;

public class NavigationMenuComponentTests
{
    private TestContext _testContext;

    public NavigationMenuComponentTests()
    {
        _testContext = new TestContext();
    }

    [Fact]
    public void NavigationMenu_Initial_Rendering_ShouldMatchMarkup()
    {
        // Arrange
        var renderedComponent = _testContext.RenderComponent<NavMenu>();

        // Act & Assert
        renderedComponent.MarkupMatches(@"
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
                        <a class=""nav-link"" href="""">
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
    public void ToggleNavMenu_ShouldChangeCssClass_OnButtonClick()
    {
        // Arrange
        var renderedComponent = _testContext.RenderComponent<NavMenu>();
        var button = renderedComponent.Find("button");

        // Act
        button.Click();

        // Assert
        var div = renderedComponent.Find("div.nav-scrollable");
        Assert.DoesNotContain("collapse", div.ClassList);
    }

    [Fact]
    public void ToggleNavMenu_ShouldCollapseMenu_OnSecondButtonClick()
    {
        // Arrange
        var renderedComponent = _testContext.RenderComponent<NavMenu>();
        var button = renderedComponent.Find("button");

        // Act
        button.Click(); // First toggle
        button.Click(); // Second toggle

        // Assert
        var div = renderedComponent.Find("div.nav-scrollable");
        Assert.Contains("collapse", div.ClassList);
    }

    [Fact]
    public void NavLinks_ShouldRenderCorrectMarkup_ForAllOptions()
    {
        // Arrange
        var renderedComponent = _testContext.RenderComponent<NavMenu>();

        // Act
        var navLinks = renderedComponent.FindAll("a.nav-link");

        // Assert
        Assert.Equal(3, navLinks.Count);
        Assert.Contains(navLinks, link => link.GetAttribute("href") == "");
        Assert.Contains(navLinks, link => link.GetAttribute("href") == "counter");
        Assert.Contains(navLinks, link => link.GetAttribute("href") == "weather");
    }

    [Fact]
    public void ClickingNavLink_ShouldNotAffectMenuCollapse()
    {
        // Arrange
        var renderedComponent = _testContext.RenderComponent<NavMenu>();
        var homeLink = renderedComponent.FindAll("a.nav-link")[0];

        // Act
        homeLink.Click();

        // Assert
        var div = renderedComponent.Find("div.nav-scrollable");
        Assert.Contains("collapse", div.ClassList); // Menu should remain collapsed
    }
}
