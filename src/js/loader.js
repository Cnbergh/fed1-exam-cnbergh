function hideLoader() {
  var loader = document.getElementById("loader");
  loader.style.display = "none";
}

// Event listener for window.onload
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // your code here

    setTimeout(() => {
      hideLoader();
    }, 1500);
  },
  false
);

// window.onload = function() {
//   hideLoader();
// };
