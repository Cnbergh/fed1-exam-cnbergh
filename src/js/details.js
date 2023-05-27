/*
============================================
Constants
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L66
============================================
*/

// TODO: Get DOM elements from the DOM

// TODO: Get the query parameter from the URL

// TODO: Get the id from the query parameter

// TODO: Create a new URL with the id @example: https://www.youtube.com/shorts/ps7EkRaRMzs

/*
============================================
DOM manipulation
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L89
============================================
*/

// TODO: Fetch and Render the list to the DOM

// TODO: Create event listeners for the filters and the search

/*
============================================
Data fectching
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L104
============================================
*/

// TODO: Fetch an a single of objects from the API

/*
============================================
Helper functions
============================================
*/

/**
 * TODO: Create a function to create a DOM element.
 * @example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/src/js/detail.js#L36
 * @param {item} item The object with properties from the fetched JSON data.
 */

const blogDetailContainer = document.querySelector(".blog-specific");

const queryString = document.location.search;

const postId = new URLSearchParams(window.location.search).get("id");

console.log(postId);

const apiUrl = `https://slow-mo.flywheelsites.com/wp-json/wp/v2/post/${postId}`;

console.log(apiUrl);

async function fetchBlogSpecificData() {
  try {
    const response = await fetch(apiUrl);
    const postData = await response.json();
    console.log("post specific", postData);
    // Render the specific post data on the blog-specific page
    renderBlogPost(postData);
  } catch (error) {
    console.log("Error fetching blog post:", error);
    blogDetailContainer.innerHTML = message("error", error);
  }
}

function renderBlogPost(postData) {
  if (blogDetailContainer) {
    blogDetailContainer.innerHTML = "";

    blogDetailContainer.innerHTML += `<div class="l-container c-card">
            <div class="c-title l-latest-post">
              <h2 role="component-title">Latest post</h2>
            </div>
            ${
              postData.imageData?.source_url
                ? `
              <img src="${postData.imageData?.source_url}" loading="lazy" alt="…" class="hero-image" />`
                : null
            }
            <div class="c-text_wrapper">
              <h3 role="feature heading" class="c-card-title">${
                postData.title
              }</h3>
              <p role="feature description" class="c-card-text">${
                postData.content
              }</p>
              <button class="b-cta">See more</button>
            </div>
          </div>
            `;
  }
}
