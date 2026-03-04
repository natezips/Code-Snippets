
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".test-slider");
    const testimonials = document.querySelectorAll(".testimonial");
    const dotsContainer = document.querySelector(".test-dots-container");
    const prevButton = document.querySelector(".test-prev");
    const nextButton = document.querySelector(".test-next");
    const gap = 20;

    // Clone slides to not jump back to the beginning
    const firstClone = testimonials[0].cloneNode(true);
    const lastClone = testimonials[testimonials.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, testimonials[0]);

    slider.scrollLeft = slideWidth();



    let currentIndex = 1;
    let scrollTimeout;

    function slideWidth() {
        if (!testimonials.length) return 0;
        return testimonials[0].getBoundingClientRect().width + gap;
    }

    function createDots() {
        dotsContainer.innerHTML = "";

        testimonials.forEach((_, idx) => {
            const dot = document.createElement("span");
            dot.classList.add("test-dot");

            if (idx === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                goToSlide(idx + 1); // +1 because of clone at start
            });

            dotsContainer.appendChild(dot);
        });
    }


    function updateDots() {
        const dots = document.querySelectorAll(".test-dot");

        let dotIndex = currentIndex - 1;

        // Handle clone edges
        if (currentIndex === 0) dotIndex = testimonials.length - 1;
        if (currentIndex === testimonials.length + 1) dotIndex = 0;

        dots.forEach((d, i) => {
            d.classList.toggle("active", i === dotIndex);
        });
    }


    function goToSlide(index) {
        currentIndex = index;
        slider.scrollTo({
            left: slideWidth() * index,
            behavior: "smooth"
        });
        updateDots();
    }

    function showPrevSlide() {
        currentIndex--;
        goToSlide(currentIndex);
    }

    function showNextSlide() {
        currentIndex++;
        goToSlide(currentIndex);
    }

    slider.addEventListener("scroll", () => {

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {

            // At fake first (clone last)
            if (currentIndex === 0) {
                slider.scrollLeft = slideWidth() * testimonials.length;
                currentIndex = testimonials.length;
            }

            // At fake last (clone first)
            if (currentIndex === testimonials.length + 1) {
                slider.scrollLeft = slideWidth();
                currentIndex = 1;
            }

            updateDots();

        }, 120);
    });

    function handleScroll() {
        currentIndex = Math.round(slider.scrollLeft / slideWidth());
        updateDots();
    }

    prevButton.addEventListener("click", showPrevSlide);
    nextButton.addEventListener("click", showNextSlide);
    slider.addEventListener("scroll", handleScroll);

    createDots();

});









