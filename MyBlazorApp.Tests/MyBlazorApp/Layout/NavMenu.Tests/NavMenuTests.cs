using Bunit;
using Microsoft.AspNetCore.Components;
using MyBlazorApp.Layout;
using Xunit;

public class NavMenuTests : TestContext
{
    [Fact(DisplayName = "NavMenu renders correctly on initial load")]
    public void NavMenuRendersCorrectlyOnInitialLoad()
    {
        // Arrange
        var cut = RenderComponent<NavMenu>();
        
        // Assert
        cut.MarkupMatches(@"
            <div class='top-row ps-3 navbar navbar-dark'>
                <div class='container-fluid'>
                    <a class='navbar-brand' href=''>MyBlazorApp</a>
                    <button title='Navigation menu' class='navbar-toggler'>
                        <span class='navbar-toggler-icon'></span>
                    </button>
                </div>
            </div>

            <div class='collapse nav-scrollable'>
                <nav class='flex-column'>
                    <div class='nav-item px-3'>
                        <NavLink class='nav-link' href='' Match='NavLinkMatch.All'>
                            <span class='bi bi-house-door-fill-nav-menu' aria-hidden='true'></span> Home
                        </NavLink>
                    </div>
                    <div class='nav-item px-3'>
                        <NavLink class='nav-link' href='counter'>
                            <span class='bi bi-plus-square-fill-nav-menu' aria-hidden='true'></span> Counter
                        </NavLink>
                    </div>
                    <div class='nav-item px-3'>
                        <NavLink class='nav-link' href='weather'>
                            <span class='bi bi-list-nested-nav-menu' aria-hidden='true'></span> Weather
                        </NavLink>
                    </div>
                </nav>
            </div>
        ");
    }

    [Fact(DisplayName = "NavMenu toggles correctly on button click")]
    public void NavMenuTogglesCorrectlyOnButtonClick()
    {
        // Arrange
        var cut = RenderComponent<NavMenu>();

        // Act
        cut.Find("button.navbar-toggler").Click();

        // Assert
        // TODO: Check whether the visibility of the nav menu has been toggled

        // Act
        cut.Find("button.navbar-toggler").Click();

        // Assert
        // TODO: Check whether the visibility of the nav menu has been toggled back
    }
}
