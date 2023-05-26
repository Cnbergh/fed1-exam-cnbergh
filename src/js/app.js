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

const listContainer = document.querySelector(".js-list_container");
const latestPostContainer = document.querySelector(".js-latest_container");

const apiUrl = "https://rainydays.flywheelsites.com/wp-json/wp/v2/posts";

let posts = [];

async function fetchBlogData(post) {
  try {
    if (!posts) listContainer.innerHTML = `<div class="skeleton-loader"></div>`;

    const response = await fetch(apiUrl);
    const resultsData = (await response.json()) || [];

    console.log("resultData", resultsData);

    posts = resultsData.map((post) => {
      return {
        ...post,
        id: post.id,
        date: post.date,
        title: post.title,
        image: post.featured_media[0],
        content: post.content.rendered,
      };
    });
    localStorage.setItem("fetchedPosts", JSON.stringify(posts));

    renderPosts();

    console.log("posts", posts);
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
}

fetchBlogData(posts);

function renderPosts() {
  if (listContainer) {
    listContainer.innerHTML = "";

    console.log("hmm", renderPosts);

    if (posts.length) {
      posts.forEach(function (post) {
        let postLink = `<a href="details.html?id=${post.id}" class="cta">View</a>`;

        listContainer.innerHTML += `<div class="skeleton-loader"></div>
        <h2>${post.title}</h2>
        <img src="${post.featured_media[0]}" alt="${post.id}" class="u-img hero-image" />
        <p>${post.content}</p>
        ${postLink}`;
      });
    }
  }
}
