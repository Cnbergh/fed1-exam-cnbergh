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
const params = new URLSearchParams(queryString);

const postId = params.get("id");
const mediaId = params.get("media");

console.log(postId);
console.log(mediaId);

const apiUrl = `https://slow-mo.flywheelsites.com/wp-json/wp/v2/posts?post=${postId}`;
const mediaUrl = `https://slow-mo.flywheelsites.com/wp-json/wp/v2/media?media=${mediaId}`;

console.log(mediaUrl);
console.log(apiUrl);
let post = [];
let mediaData = [];

async function getMediaSpecific() {
  const MediaRes = await fetch(mediaUrl);
  const MediaData = (await MediaRes.json()) || [];

  console.log("allMediaData", MediaData);

  mediaData = MediaData;

  if (mediaData.length > 0) {
    fetchBlogSpecificData();
  }
}

getMediaSpecific();

async function fetchBlogSpecificData() {
  try {
    if (!post) listContainer.innerHTML = `<div class="skeleton-loader"></div>`;

    const ApiRes = await fetch(apiUrl);
    const postData = await ApiRes.json();
    console.log("resultData", postData);

    post = {
      id: postData.id,
      date: postData.date,
      title: postData.title,
      imageData:
        mediaData.find((item) => item.id === postData.featured_media) || null,
      content: postData.content,
    };
    localStorage.setItem("fetchedPost", JSON.stringify(post));

    createHtml(post);
  } catch (error) {
    console.log("Error fetching blog post:", error);
  }
}

function createHtml(post) {
  blogDetailContainer.innerHTML = `
        <h2>${post.title}</h2>
        <div class="details-description">${post.content}</div>`;
}
