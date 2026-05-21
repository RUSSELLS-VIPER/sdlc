//     Ongoin Projects Slider And Dots

      const track = document.getElementById("profileSliderTrack");
      const slides = track.querySelectorAll(".profile-slide");
      const dotsContainer = document.getElementById("sliderDots");
      const dots = dotsContainer.querySelectorAll("span");

      let index = 0;
      const totalActualSlides = slides.length - 1;
      let autoSlideInterval;

      function Dots(activeIndex) {
        dots.forEach((dot, i) => {
          if (i === activeIndex) {
            dot.classList.remove("bg-gray-200");
            dot.classList.add("bg-accent");
          } else {
            dot.classList.remove("bg-accent");
            dot.classList.add("bg-gray-200");
          }
        });
      }

      function goToSlide(targetIndex) {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${targetIndex * 20}%)`;

        Dots(targetIndex === totalActualSlides ? 0 : targetIndex);

        if (targetIndex === totalActualSlides) {
          setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = `translateX(0)`;
          }, 500);
        }
      }

      function moveSlider() {
        index++;
        goToSlide(index);
      }

      function startAutoSlide() {
        autoSlideInterval = setInterval(moveSlider, 3000);
      }

      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          clearInterval(autoSlideInterval);
          index = i;
          goToSlide(index);
          startAutoSlide();
        });
      });
      
      startAutoSlide();