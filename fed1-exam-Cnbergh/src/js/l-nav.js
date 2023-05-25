const pageTitleElement = document.querySelector(".page-title");
const navigationElement = document.querySelector(".c-navbar");
const mobileNavElement = document.querySelector(".mobile-nav");
const childElements = Array.from(mobileNavElement.children);

function handleMediaQuery(mediaQuery) {
  if (mediaQuery.matches) {
    pageTitleElement.classList.remove("is-hidden", "is-invisible");
    navigationElement.classList.remove("is-hidden", "is-invisible");
    mobileNavElement.classList.add("is-hidden", "is-invisible");
    childElements.forEach((element) => {
      element.classList.add("is-hidden", "is-invisible");
    });
  } else {
    pageTitleElement.classList.add("is-hidden", "is-invisible");
    navigationElement.classList.add("is-hidden", "is-invisible");
    mobileNavElement.classList.remove("is-hidden", "is-invisible");
    childElements.forEach((element) => {
      element.classList.remove("is-hidden", "is-invisible");
    });
  }
}

const mediaQuery = window.matchMedia("(min-width: 621px)");
handleMediaQuery(mediaQuery);
mediaQuery.addListener(handleMediaQuery);
