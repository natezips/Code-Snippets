document.addEventListener("DOMContentLoaded", function () {
    const gridItems = document.querySelectorAll(".gallery-grid-item");
    const overlay = document.querySelector(".gallery-carousel-overlay");
    const carouselImage = document.getElementById("gallery-carousel-image");
    const prevButton = document.getElementById("gallery-prev-btn");
    const nextButton = document.getElementById("gallery-next-btn");
    const imageCounter = document.getElementById("gallery-image-counter");
    const closeButton = document.getElementById("gallery-close-btn");
    let currentIndex = 0;

    // Add click event listeners to grid items
    gridItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentIndex = index;
            showImage(currentIndex);
            overlay.style.display = "flex";
        });
    });

    // Show image in the carousel
    function showImage(index) {
        const imagePath = `images/gallery-${index + 1}.jpg`;
        carouselImage.src = imagePath;
        imageCounter.textContent = `${index + 1}/20`;
    }

    // Handle next button click
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % 20;
        showImage(currentIndex);
    });

    // Handle previous button click
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + 20) % 20;
        showImage(currentIndex);
    });


    // Close the carousel
    closeButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });

});
