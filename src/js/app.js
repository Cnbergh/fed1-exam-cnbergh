const blogListContainer = document.getElementById("blog-list-container");
const latestPostContainer = document.getElementById("latest-post-container");
const carouselWrapper = document.querySelector(".swiper-wrapper");
const blogListErrorContainer = document.getElementById(
  "blog-list-error-container"
);
const seeMoreButton = document.getElementById("see-more-button");
seeMoreButton.addEventListener("click", loadMorePosts);

const apiUrl =
  "https://slow-mo.flywheelsites.com/wp-json/wp/v2/posts?per_page=20";
const mediaUrl =
  "https://slow-mo.flywheelsites.com/wp-json/wp/v2/media?per_page=20";

const contactApiUrl =
  "https://slow-mo.flywheelsites.com/wp-json/contact-form-7/v1/contact-forms/142/feedback";

let posts = [];
let mediaData = [];
let loadedPosts = 10;

async function getMedia() {
  const allMediaRes = await fetch(mediaUrl);
  const allMediaData = (await allMediaRes.json()) || [];

  console.log("allMediaData", allMediaData);

  mediaData = allMediaData;

  if (mediaData.length > 0) {
    fetchBlogData();
  }
}

getMedia();

async function fetchBlogData() {
  blogListContainer.innerHTML = `<div class="skeleton-loader"></div>`;

  try {
    const response = await fetch(apiUrl);
    const postsData = (await response.json()) || [];

    console.log("resultData", postsData);
    console.log("mediaData", mediaData);

    if (postsData.data?.status !== 200) {
      console.log("error 400", postsData.data);

      const errorMessage = `<div class="error-message">Noe gikk galt, feilmelding kode: ${postsData.data?.status}</div>`;

      if (blogListContainer) {
        blogListContainer.innerHTML = errorMessage;
      }

      if (latestPostContainer) {
        latestPostContainer.innerHTML = errorMessage;
      }
    }

    if (postsData.length > 0 && postsData.data?.status !== 400) {
      posts = postsData?.map((post) => {
        const media =
          mediaData.find((item) => item.id === post.featured_media) || null;

        return {
          id: post.id,
          date: post.date,
          title: post.title.rendered,
          imageData: media,
          content: post.content.rendered,
        };
      });
      localStorage.setItem("fetchedPosts", JSON.stringify(posts));
    }

    if (posts.length > 0) {
      renderPosts();
      renderLatestPost();
      renderCarousel();
    }

    console.log("posts", posts);
  } catch (error) {
    if (blogListContainer)
      blogListContainer.innerHTML = `<div class="error-message">Noe gikk galt, feilmelding: ${error}</div>`;

    console.log("Error fetching posts:", error);
  }

  updateSeeMoreButtonState();
}

function loadMorePosts() {
  loadedPosts += 10;
  renderPosts();
  updateSeeMoreButtonState();
}

function renderPosts() {
  if (blogListContainer) {
    blogListContainer.innerHTML = "";
    const visiblePosts = posts.slice(0, loadedPosts);

    if (visiblePosts.length) {
      const blogListHeader = document.createElement("h2");
      blogListHeader.textContent = "List of blog posts";
      blogListHeader.classList.add("c-title");
      blogListContainer.appendChild(blogListHeader);

      visiblePosts.forEach((post, i) => {
        const accordionPanel = document.createElement("div");
        accordionPanel.classList.add("accordion-panel");

        const accordionTrigger = document.createElement("button");
        accordionTrigger.classList.add("accordion-trigger");
        accordionTrigger.setAttribute("aria-expanded", i === 0 ? true : false);
        accordionTrigger.setAttribute(
          "aria-controls",
          `accordion${i + 1}-content`
        );
        accordionTrigger.textContent = post.title;
        accordionTrigger.addEventListener("click", () => {
          toggleAccordion(i + 1);
        });

        const accordionContent = document.createElement("div");
        accordionContent.classList.add("accordion-content");
        accordionContent.setAttribute("role", "region");
        accordionContent.setAttribute("aria-labelledby", `panel${i + 1}-title`);
        accordionContent.setAttribute("aria-hidden", i === 0 ? false : true);
        accordionContent.setAttribute("id", `panel${i + 1}-content`);

        const postData = document.createElement("div");
        postData.classList.add("post-data");

        const image = document.createElement("img");
        image.classList.add("post-img");
        image.src = post.imageData?.source_url;
        image.alt = "Post Image";
        image.loading = "lazy";
        image.addEventListener("click", () => {
          openModal(post.imageData?.source_url);
        });

        const content = document.createElement("div");
        content.innerHTML = post.content;

        const seeMoreButton = document.createElement("button");
        seeMoreButton.classList.add("b-cta");
        seeMoreButton.textContent = "See more";
        seeMoreButton.addEventListener("click", () => {
          window.location.href = `/src/pages/blog-specific.html?id=${post.id}&media=${post.imageData?.id}`;
        });

        postData.appendChild(image);
        postData.appendChild(content);
        postData.appendChild(seeMoreButton);

        accordionContent.appendChild(postData);
        accordionPanel.appendChild(accordionTrigger);
        accordionPanel.appendChild(accordionContent);
        blogListContainer.appendChild(accordionPanel);
      });

      if (posts.length > loadedPosts) {
        seeMoreButton.addEventListener("click", loadMorePosts);
      }
    } else {
      blogListContainer.innerHTML = "No posts to display.";
    }
  }
}

function updateSeeMoreButtonState() {
  if (posts.length <= loadedPosts) {
    seeMoreButton.disabled = true;
    seeMoreButton.textContent = "No more posts";
  } else {
    seeMoreButton.disabled = false;
    seeMoreButton.textContent = "See more posts";
  }
}

function renderLatestPost() {
  if (latestPostContainer) {
    latestPostContainer.innerHTML = "";
    latestPostContainer.classList.add("l-container", "c-card");

    if (posts.length) {
      const latestPost = posts[0];

      const titleContainer = document.createElement("div");
      titleContainer.classList.add("c-title", "l-latest-post");

      const titleHeading = document.createElement("h2");
      titleHeading.setAttribute("role", "component-title");
      titleHeading.textContent = "Latest post";

      titleContainer.appendChild(titleHeading);
      latestPostContainer.appendChild(titleContainer);

      if (latestPost.imageData?.source_url) {
        const image = document.createElement("img");
        image.classList.add("hero-image");
        image.src = latestPost.imageData?.source_url;
        image.alt = "...";
        image.loading = "lazy";
        image.addEventListener("click", () => {
          openModal(latestPost.imageData?.source_url);
        });

        latestPostContainer.appendChild(image);
      }

      const textWrapper = document.createElement("div");
      textWrapper.classList.add("c-text_wrapper");

      const postTitle = document.createElement("h3");
      postTitle.setAttribute("role", "feature heading");
      postTitle.classList.add("c-card-title");
      postTitle.textContent = latestPost.title;

      const postDescription = document.createElement("p");
      postDescription.setAttribute("role", "feature description");
      postDescription.classList.add("c-card-text");
      postDescription.innerHTML = latestPost.content;

      const seeMoreButton = document.createElement("button");
      seeMoreButton.classList.add("b-cta");
      seeMoreButton.textContent = "See more";
      seeMoreButton.addEventListener("click", () => {
        window.location.href = `/src/pages/blog-specific.html?id=${latestPost.id}&media=${latestPost.imageData?.id}`;
      });

      textWrapper.appendChild(postTitle);
      textWrapper.appendChild(postDescription);
      textWrapper.appendChild(seeMoreButton);
      latestPostContainer.appendChild(textWrapper);
    }
  }
}

function renderCarousel() {
  if (carouselWrapper) {
    carouselWrapper.innerHTML = "";

    const responsiveSlidesPerView = {
      280: 1, // 280px and below: 1 slide
      640: 2, // 640px and below: 2 slides
      960: 3, // 960px and below: 3 slides
      1440: 4, // 1440px and below: 4 slides
    };

    posts.forEach((post) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const carouselCard = document.createElement("div");
      carouselCard.classList.add("carousel-card");

      const title = document.createElement("h3");
      title.classList.add("carousel-title");
      title.textContent = post.title;

      const image = document.createElement("img");
      image.classList.add("carousel-image");
      image.src = post.imageData?.source_url;
      image.alt = "Post Image";

      image.addEventListener("click", () => {
        openModal(post.imageData?.source_url);
      });

      const seeMoreButton = document.createElement("button");
      seeMoreButton.classList.add("carousel-button");
      seeMoreButton.textContent = "See More";
      seeMoreButton.addEventListener("click", () => {
        window.location.href = `/src/pages/blog-specific.html?id=${post.id}&media=${post.imageData?.id}`;
      });

      carouselCard.appendChild(title);
      carouselCard.appendChild(image);
      carouselCard.appendChild(seeMoreButton);
      slide.appendChild(carouselCard);
      carouselWrapper.appendChild(slide);
    });

    new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: responsiveSlidesPerView,
      loop: true,
      loopAdditionalSlides: 1,
    });
  }
}

function openModal(imageUrl) {
  const modalContainer = document.getElementById("modal-container");
  const modalImage = document.getElementById("modal-image");

  modalImage.src = imageUrl;
  modalContainer.style.display = "block";
}

function closeModal() {
  const modalContainer = document.getElementById("modal-container");

  modalContainer.style.display = "none";
}

document.getElementById("modal-close").addEventListener("click", closeModal);
