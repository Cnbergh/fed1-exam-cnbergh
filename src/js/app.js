/*
============================================
Constants   NB!!!! GUL
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L66
============================================
*/

// TODO: Get DOM elements from the DOM

/*
============================================
DOM manipulation    NB!!!! GUL
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L89
============================================
*/

// TODO: Fetch and Render the list to the DOM

// TODO: Create event listeners for the filters and the search

/**
 * TODO: Create an event listener to sort the list.    NB!!!! GRØNN
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/search-form.html#L91
 */

/*
============================================
Data fectching    NB!!!! GUL
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L104
============================================
*/

// TODO: Fetch an array of objects from the API  NB!!!! GUL

/*
============================================
Helper functions
https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L154
============================================
*/

/**
 * TODO: Create a function to filter the list of item.  NB!!! BLÅ
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/search-form.html#L135
 * @param {item} item The object with properties from the fetched JSON data.
 * @param {searchTerm} searchTerm The string used to check if the object title contains it.
 */

/**
 * TODO: Create a function to create a DOM element.    NB!!!! RØD
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/src/js/detail.js#L36
 * @param {item} item The object with properties from the fetched JSON data.
 */

const blogListContainer = document.getElementById("blog-list-container");
const latestPostContainer = document.querySelector(".js-latest_container");

const apiUrl = "https://slow-mo.flywheelsites.com/wp-json/wp/v2/posts";
const mediaUrl = "https://slow-mo.flywheelsites.com/wp-json/wp/v2/media";

let posts = [];
let mediaData = [];

async function getMedia() {
  const allMediaRes = await fetch(mediaUrl);
  const allMediaData = (await allMediaRes.json()) || [];

  console.log("allMediaData", allMediaData);

  mediaData = allMediaData;

  if (mediaData.length > 0) {
    console.log("mediaData", mediaData);
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

    posts = postsData.map((post) => {
      console.log("mediaData", mediaData);

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
    }

    console.log("posts", posts);
  } catch (error) {
    console.log("Error fetching posts:", error);
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
          </div>
        </div>
      </div>
        `;
      });
    }
  }
}
