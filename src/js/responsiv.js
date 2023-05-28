import * as createNavModule from "./l-nav.js";
let currentNavType = null;
let menuCounter = 0;
const menuLimit = 1;

// Function to handle responsive changes
setTimeout(function handleResponsive() {
  const mobileMediaQuery = window.matchMedia("(max-width: 480px)");
  const desktopMediaQuery = window.matchMedia("(min-width: 481px)");

  if (
    mobileMediaQuery.matches &&
    currentNavType !== "mobile" &&
    menuCounter < menuLimit
  ) {
    createNavModule.removeDesktopNav();
    createNavModule.createMobileNav();
    currentNavType = "mobile";
    menuCounter++;
  } else if (
    desktopMediaQuery.matches &&
    currentNavType !== "desktop" &&
    menuCounter < menuLimit
  ) {
    createNavModule.removeMobileNav();
    createNavModule.createDesktopNav();
    currentNavType = "desktop";
    menuCounter++;
  }
  if (menuCounter === menuLimit) {
    menuCounter = 0;
  }

  window.addEventListener("resize", handleResponsive);
}, 200);

// Update the URL and page title when navigating
function navigateToPage(url, pageTitle) {
  // Update the URL without triggering a page refresh
  history.pushState(null, pageTitle, url);

  // Update the page title
  document.title = pageTitle;
}

// Update the URL and page title based on the current page
function updateURLAndTitle() {
  const currentPage = window.location.pathname;
  let pageTitle;

  // Set the appropriate page title based on the current page
  switch (currentPage) {
    case "/index.html":
      pageTitle = "Home Page";
      break;
    case "/src/pages/about.html":
      pageTitle = "About Us";
      break;
    case "/src/pages/blog.html":
      pageTitle = "Blog";
      break;
    case "/src/pages/contact.html":
      pageTitle = "Contact Us";
      break;
    // Add more cases for other pages as needed
    default:
      pageTitle = "Slow - Mo";
      break;
  }

  // Call the navigateToPage function with the current URL and page title
  navigateToPage(currentPage, pageTitle);
}

// Listen for the onpopstate event to update the URL and page title when navigating back or forward
window.onpopstate = updateURLAndTitle;

// Call the updateURLAndTitle function initially to set the URL and page title for the current page
updateURLAndTitle();
