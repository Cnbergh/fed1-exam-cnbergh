import * as createNavModule from "./l-nav.js";
let currentNavType = null;
let menuCounter = 0;
const menuLimit = 1;

// Function to handle responsive changes
setTimeout(function handleResponsive() {
  const mobileMediaQuery = window.matchMedia("(max-width: 621px)");
  const desktopMediaQuery = window.matchMedia("(min-width: 622px)");

  if (
    mobileMediaQuery.matches &&
    currentNavType !== "mobile" &&
    menuCounter < menuLimit
  ) {
    createNavModule.removeDesktopNav();
    createNavModule.createMobileNav();
    currentNavType = "mobile";
    menuCounter++;
    console.log("mobileNav created");
  } else if (
    desktopMediaQuery.matches &&
    currentNavType !== "desktop" &&
    menuCounter < menuLimit
  ) {
    createNavModule.removeMobileNav();
    createNavModule.createDesktopNav();
    currentNavType = "desktop";
    menuCounter++;
    console.log("desktopNav created");
  }
  if (menuCounter === menuLimit) {
    menuCounter = 0;
  }

  window.addEventListener("resize", handleResponsive);
}, 200);
