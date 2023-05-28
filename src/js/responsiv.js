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


function navigateToPage(url, pageTitle) {

  history.pushState(null, pageTitle, url);


  document.title = pageTitle;
}


function updateURLAndTitle() {
  const currentPage = window.location.pathname;
  let pageTitle;


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

    default:
      pageTitle = "Slow - Mo";
      break;
  }


  navigateToPage(currentPage, pageTitle);
}


window.onpopstate = updateURLAndTitle;


updateURLAndTitle();
