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
    <div class="l-container">
    <h2 class="c-title">${post.title}</h2>
    <img class="hero-image" src="${post?.imageData?.source_url}" loading="lazy"/>
    <div class="details-description c-card-text">${post.content}</div> 
    </div>`;
  }
}
