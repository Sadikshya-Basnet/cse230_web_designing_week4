const track = document.querySelector(".slider-track");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const dotsContainer = document.querySelector(".slider-dots");

const originalSlides = Array.from(track.querySelectorAll("img"));
const totalSlides = originalSlides.length;

if (totalSlides > 0) {

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[totalSlides - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    const allSlides = track.querySelectorAll("img");

    let currentIndex = 1;
    let isTransitioning = false;

    originalSlides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.classList.add("dot");
        dot.setAttribute("aria-label", `Go to image ${index + 1}`);

        dot.addEventListener("click", () => {
            if (isTransitioning) return;

            currentIndex = index + 1;
            updateDots();
            moveTrack();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function moveTrack(animate = true) {
        track.style.transition = animate
            ? "transform 0.5s ease-in-out"
            : "none";

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        if (animate) {
            isTransitioning = true;
        }
    }

    function updateDots() {
        const realIndex =
            (currentIndex - 1 + totalSlides) % totalSlides;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === realIndex);

            dot.setAttribute(
                "aria-current",
                index === realIndex ? "true" : "false"
            );
        });
    }

    nextButton.addEventListener("click", () => {
        if (isTransitioning) return;

        currentIndex++;
        moveTrack();
        updateDots();
    });

    prevButton.addEventListener("click", () => {
        if (isTransitioning) return;

        currentIndex--;
        moveTrack();
        updateDots();
    });

    track.addEventListener("transitionend", (event) => {
        if (event.target !== track) return;

        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            moveTrack(false);
        }

        else if (currentIndex === 0) {
            currentIndex = totalSlides;
            moveTrack(false);
        }

        isTransitioning = false;
    });

    moveTrack(false);
    updateDots();

} else {
    console.error("The image slider has no images.");
}

