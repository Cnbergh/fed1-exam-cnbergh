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
const blogDetailErrorContainer = document.getElementById("blog-specific-error");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const postId = params.get("id");
const mediaId = params.get("media");

console.log(postId);
console.log(mediaId);

const getPostApiUrl = `https://slow-mo.flywheelsites.com/wp-json/wp/v2/posts/${postId}`;
const mediaUrl = `https://slow-mo.flywheelsites.com/wp-json/wp/v2/media?media=${mediaId}`;

console.log(mediaUrl);
console.log(getPostApiUrl);
let post = [];
let mediaData = [];
let error = null;

async function getMediaSpecific() {
  const MediaRes = await fetch(mediaUrl);
  const MediaData = (await MediaRes.json()) || [];

  console.log("getMediaSpecific allMediaData", MediaData);

  mediaData = MediaData;

  if (mediaData.length > 0) {
    fetchBlogSpecificData();
  }
}

getMediaSpecific();

async function fetchBlogSpecificData() {
  try {
    if (!post) listContainer.innerHTML = `<div class="skeleton-loader"></div>`;

    const ApiRes = await fetch(getPostApiUrl);
    const postData = await ApiRes.json();
    console.log("resultData", postData);

    post = {
      id: postData.id,
      date: postData.date,
      title: postData.title.rendered,
      imageData:
        mediaData.find((item) => item.id === postData.featured_media) || null,
      content: postData.content.rendered,
    };
    localStorage.setItem("fetchedPost", JSON.stringify(post));

    console.log("fetchBlogSpecificData post", post);

    createHtml(post);
  } catch (error) {
    error = `<div class="error-message">Noe gikk galt, feilmelding: ${error}</div>`;
    console.log("Error fetching blog post:", error);

    blogDetailErrorContainer.innerHTML = error;
  }
}

function createHtml(post) {
  if (post) {
    document.title = `${post.title} | Slow - Mo`;

    blogDetailContainer.innerHTML = `
    <h2>${post.title}</h2>
    <img src="${post?.imageData?.source_url}" />
    <div class="details-description">${post.content}</div>`;
  }
}
