function hideLoader() {
  var loader = document.getElementById("loader");
  loader.style.display = "none";
}


document.addEventListener(
  "DOMContentLoaded",
  function () {


    setTimeout(() => {
      hideLoader();
    }, 1500);
  },
  false
);
