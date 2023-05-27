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

const mediaQuery = window.matchMedia("(min-width: 480px)");
const blogListContainer = document.getElementById("blog-list-container");
const carouselContainer = document.getElementById(
  "carousel-blog-list-container"
);

/* function handleResponsiveLayout(mediaQuery) {
  if (mediaQuery.matches) {
    // Screen width is greater than 480px
    if (blogListContainer && carouselContainer) {
      // Convert the blog list to a carousel
      renderCarousel();

      // Hide the blog list container
      blogListContainer.style.display = "none";

      // Show the carousel container
      carouselContainer.style.display = "block";
    }
  } else {
    // Screen width is less than or equal to 480px
    if (blogListContainer && carouselContainer) {
      // Convert the carousel back to a blog list
      renderPosts();

      // Hide the carousel container
      carouselContainer.style.display = "none";

      // Show the blog list container
      blogListContainer.style.display = "block";
    }
  }
}

// Initial handling based on the current screen width
handleResponsiveLayout(mediaQuery);

// Add event listener for changes in screen width
mediaQuery.addEventListener("change", handleResponsiveLayout);
 */