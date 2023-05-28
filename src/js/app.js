const blogListContainer = document.getElementById("blog-list-container");
const latestPostContainer = document.getElementById("latest-post-container");
const blogListCarouselContainer = document.getElementById(
  "carousel-blog-list-container"
);
const blogListErrorContainer = document.getElementById(
  "blog-list-error-container"
);

const apiUrl =
  "https://slow-mo.flywheelsites.com/wp-json/wp/v2/posts?orderby=date";
const mediaUrl = "https://slow-mo.flywheelsites.com/wp-json/wp/v2/media";

const contactApiUrl =
  "https://slow-mo.flywheelsites.com/wp-json/contact-form-7/v1/contact-forms/142/feedback";

let posts = [];
let mediaData = [];
let loadedPosts = 10;
let errorBlogList = null;

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
  const seeMoreButton = document.getElementById("see-more-button");
  if (posts.length < loadedPosts) {
    seeMoreButton.disabled = true;
    seeMoreButton.textContent = "No more posts";
  } else {
    seeMoreButton.disabled = false;
    seeMoreButton.textContent = "See more posts";
  }
  seeMoreButton.addEventListener("click", fetchBlogData);
}

function renderPosts() {
  if (blogListContainer) {
    blogListContainer.innerHTML = "";
    if (posts.length) {
      const blogListHeader = document.createElement("h2");
      blogListHeader.textContent = "List of blog posts";
      blogListHeader.classList.add("c-title");
      blogListContainer.appendChild(blogListHeader);

      posts.forEach((post, i) => {
        blogListContainer.innerHTML += `<div class="accordion-panel">
          <h3 id="panel${i + 1}-title">
            <button class="accordion-trigger" aria-expanded="${
              i === 0 ? true : false
            }" aria-controls="accordion${i + 1}-content">
            ${post.title}
            </button>
          </h3>
          <div class="accordion-content" role="region" aria-labelledby="panel${
            i + 1
          }-title" aria-hidden="${i === 0 ? false : true}" id="panel${
          i + 1
        }-content">
        <div class="post-data">
        <img class="post-img" src="${
          post.imageData?.source_url
        }" alt="Post Image" />
        ${post.content}
            <button onclick="window.location.href='/src/pages/blog-specific.html?id=${
              post.id
            }&media=${post.imageData?.id}'" class="b-cta">See more</button>
            </div>
          </div>
        </div>`;
      });
    }
  }
}

function renderLatestPost() {
  if (latestPostContainer) {
    latestPostContainer.innerHTML = `<div class="skeleton-loader"></div>`;
    if (posts.length) {
      const latestPost = posts[0];
      latestPostContainer.innerHTML += `<div class="l-container c-card">
        <div class="c-title l-latest-post">
          <h2 role="component-title">Latest post</h2>
        </div>
        ${
          latestPost.imageData?.source_url
            ? `
          <img src="${latestPost.imageData?.source_url}" loading="lazy" alt="…" class="hero-image" />`
            : ""
        }
        <div class="c-text_wrapper">
          <h3 role="feature heading" class="c-card-title">${
            latestPost.title
          }</h3>
          <p role="feature description" class="c-card-text">${
            latestPost.content
          }</p>
          <button onclick="window.location.href='/src/pages/blog-specific.html?id=${
            latestPost.id
          }&media=${latestPost.imageData?.id}'" class="b-cta">See more</button>
        </div>
      </div>`;
    }
  }
}

function renderCarousel() {
  if (blogListCarouselContainer) {
    blogListCarouselContainer.innerHTML = "";
    if (posts.length) {
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel-container");

      const carouselList = document.createElement("ul");
      carouselList.classList.add("carousel-list");

      posts.forEach((post, i) => {
        const carouselItem = document.createElement("li");
        carouselItem.classList.add("carousel-item");

        carouselItem.innerHTML = `
          <div class="carousel-card">
            <h3 class="carousel-title">${post.title}</h3>
            <img class="carousel-image" src="${post.imageData?.source_url}" alt="Post Image" />
            <p class="carousel-content">${post.content}</p>
            <button onclick="window.location.href='/src/pages/blog-specific.html?id=${post.id}&media=${post.imageData?.id}'" class="carousel-button">See more</button>
          </div>
        `;

        carouselList.appendChild(carouselItem);
      });

      carouselContainer.appendChild(carouselList);
      blogListCarouselContainer.appendChild(carouselContainer);

      // Add sliding functionality
      const carouselItems = carouselList.querySelectorAll(".carousel-item");
      const carouselWidth = carouselContainer.offsetWidth;
      let currentIndex = 0;

      const showSlide = (index) => {
        carouselList.style.transform = `translateX(-${
          index * carouselWidth
        }px)`;
      };

      const nextSlide = () => {
        if (currentIndex === carouselItems.length - 1) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        showSlide(currentIndex);
      };

      setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    }
  }
}
