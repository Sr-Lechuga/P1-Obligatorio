const arrowLeft = document.querySelector(".overlay-right i"),
      arrowRight = document.querySelector(".overlay-left i"),
      container = document.querySelector(".container");

arrowLeft.addEventListener("click", () => {
    container.classList.toggle("right-panel-active");
});

arrowRight.addEventListener("click", () => {
    container.classList.toggle("right-panel-active");
});