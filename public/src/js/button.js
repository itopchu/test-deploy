const topButton = document.querySelector("#backToTopButton");
function backToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

topButton.addEventListener("click", backToTop);