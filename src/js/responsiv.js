// Function to handle responsive changes
function handleResponsiveChanges() {
  const navigation = document.querySelector(".l-navbar");
  const isMobile = window.width <= 621; // Adjust the breakpoint as per your needs

  if (isMobile) {
    // Show mobile navigation, hide desktop navigation
    navigation.classList.remove("desktop-nav");
    navigation.classList.add("mobile-nav");
  } else {
    // Show desktop navigation, hide mobile navigation
    navigation.classList.remove("mobile-nav");
    navigation.classList.add("desktop-nav");
  }
}

// Add event listener for viewport size changes
window.addEventListener("resize", handleResponsiveChanges);
visualViewport.addEventListener("resize", handleResponsiveChanges);
// Call the function initially to set the correct navigation menu on page load
handleResponsiveChanges();
