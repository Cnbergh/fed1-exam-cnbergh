const blogListContainer = document.getElementById("blog-list-container");
const latestPostContainer = document.getElementById("latest-post-container");

const apiUrl =
  "https://slow-mo.flywheelsites.com/wp-json/wp/v2/posts?orderby=date";
const mediaUrl = "https://slow-mo.flywheelsites.com/wp-json/wp/v2/media";

let posts = [];
let mediaData = [];

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
  try {
    if (!posts) listContainer.innerHTML = `<div class="skeleton-loader"></div>`;

    const response = await fetch(apiUrl);
    const postsData = (await response.json()) || [];

    console.log("resultData", postsData);
    console.log("mediaData", mediaData);

    posts = postsData.map((post) => {
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

    if (posts.length > 0) {
      renderPosts();
      renderLatestPost();
    }

    console.log("posts", posts);
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
}

function renderLatestPost() {
  if (latestPostContainer) {
    latestPostContainer.innerHTML = "";
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
            : null
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
          }'" class="b-cta">See more</button>
        </div>
      </div>
        `;
    }
  }
}

function renderPosts() {
  if (blogListContainer) {
    blogListContainer.innerHTML = "";
    if (posts.length) {
      posts.forEach((post, i) => {
        blogListContainer.innerHTML += `<div class="accordion-panel">
        <h3 id="panel1-title">
          <button class="accordion-trigger" aria-expanded="${
            i === 0 ? true : false
          }" aria-controls="accordion1-content">
          ${post.title}
          </button>
        </h3>
        <div class="accordion-content" role="region" aria-labelledby="panel1-title" aria-hidden="${
          i === 0 ? false : true
        }"
          id="panel1-content">
          <div>
          ${post.content}
          <button onclick="window.location.href='/src/pages/blog-specific.html?id=${
            post.id
          }'" class="b-cta">See more</button>
          </div>
        </div>
      </div>
        `;
      });
    }
  }
}
