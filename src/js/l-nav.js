// Get the navigation element
const navigation = document.querySelector(".l-navbar");

// Function to create HTML elements for desktop navigation

export function createDesktopNav() {
  if (window.matchMedia("(min-width: 622px)").matches) {
    const navItems = [
      { role: "menu", text: "Menu" },
      { role: "about", text: "About us" },
      { role: "blog", text: "Blog" },
      { role: "contact", text: "Contact us" },
    ];

    const navList = document.createElement("ul");
    navList.setAttribute("role", "desktop-nav");
    navList.classList.add("c-navbar");

    navItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("role", item.role);
      listItem.classList.add("c-card");

      const link = document.createElement("a");
      link.href = "#";

      const heading = document.createElement("h3");
      heading.textContent = item.text;

      link.appendChild(heading);
      listItem.appendChild(link);
      navList.appendChild(listItem);
    });

    navigation.appendChild(navList);
  }
}

// Function to create HTML elements for mobile navigation
export function createMobileNav() {
  if (window.matchMedia("(max-width: 621px)").matches) {
    const navItems = [
      { role: "search", text: "Search...", icon: "search" },
      { role: "hamburger-menu", text: "", icon: "c-hamburger-bars" },
    ];

    const mobileNavList = document.createElement("ul");
    mobileNavList.setAttribute("role", "mobile-navbar");
    mobileNavList.classList.add("mobile-nav");

    navItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("role", item.role);
      listItem.classList.add("c-" + item.role);

      const link = document.createElement("a");
      link.href = "#";

      if (item.role === "hamburger-menu") {
        const hamburgerBars = document.createElement("div");
        hamburgerBars.classList.add("c-hamburger-bars");

        const bar1 = document.createElement("span");
        const bar2 = document.createElement("span");
        bar1.classList.add("bar");
        bar2.classList.add("bar");

        hamburgerBars.appendChild(bar1);
        hamburgerBars.appendChild(bar2);

        link.appendChild(hamburgerBars);
      } else {
        const heading = document.createElement("h3");
        heading.textContent = item.text;

        const icon = document.createElement("i");
        icon.classList.add(item.icon);
        heading.appendChild(icon);

        link.appendChild(heading);
      }

      listItem.appendChild(link);
      mobileNavList.appendChild(listItem);
    });

    navigation.appendChild(mobileNavList);
  }
}

//Function to remove HTML elements for mobile navigation
export function removeMobileNav() {
  const mobileNav = document.querySelector(".mobile-nav");
  if (mobileNav) {
    mobileNav.remove();
  }
}

//Function to remove HTML elements for desktop navigation
export function removeDesktopNav() {
  const desktopNav = document.querySelector(".c-navbar");
  if (desktopNav) {
    desktopNav.remove();
  }
}

removeMobileNav();
removeDesktopNav();
