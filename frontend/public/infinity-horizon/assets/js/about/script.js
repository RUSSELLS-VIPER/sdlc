
// Banner Number Count
      document.addEventListener("DOMContentLoaded", () => {
        const counters = document.querySelectorAll(".counter");

        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute("data-target"));
                const suffix = counter.getAttribute("data-suffix") || "";
                const duration = 2000;
                const fps = 60;
                const totalFrames = (duration / 1000) * fps;
                const increment = target / totalFrames;

                let current = 0;

                const updateCount = () => {
                  current += increment;
                  if (current >= target) {
                    counter.innerText = target + suffix;
                  } else {
                    if (target % 1 !== 0) {
                      counter.innerText = current.toFixed(1) + suffix;
                    } else {
                      counter.innerText = Math.floor(current) + suffix;
                    }
                    requestAnimationFrame(updateCount);
                  }
                };

                updateCount();
                observer.unobserve(counter);
              }
            });
          },
          { threshold: 0.3 },
        );

        counters.forEach((c) => observer.observe(c));
      });

// Who We Are Section
      const setupTeamScroll = () => {
        const scrollContainer = document.getElementById(
          "team-scroll-container",
        );
        const cards = document.querySelectorAll(".team-card");

        const scrollLeftBtnDesktop = document.getElementById(
          "scroll-left-desktop",
        );
        const scrollRightBtnDesktop = document.getElementById(
          "scroll-right-desktop",
        );
        const scrollLeftBtnMobile =
          document.getElementById("scroll-left-mobile");
        const scrollRightBtnMobile = document.getElementById(
          "scroll-right-mobile",
        );

        const getScrollAmount = () => {
          if (cards.length === 0) return 300;
          const cardWidth = cards[0].offsetWidth;
          const gap =
            parseInt(window.getComputedStyle(scrollContainer).gap) || 16;
          return cardWidth + gap;
        };

        const scrollLeft = () => {
          scrollContainer.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth",
          });
        };

        const scrollRight = () => {
          scrollContainer.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth",
          });
        };

        if (scrollLeftBtnDesktop)
          scrollLeftBtnDesktop.addEventListener("click", scrollLeft);
        if (scrollRightBtnDesktop)
          scrollRightBtnDesktop.addEventListener("click", scrollRight);
        if (scrollLeftBtnMobile)
          scrollLeftBtnMobile.addEventListener("click", scrollLeft);
        if (scrollRightBtnMobile)
          scrollRightBtnMobile.addEventListener("click", scrollRight);
      };

      document.addEventListener("DOMContentLoaded", setupTeamScroll);

// Testimonials

const track = document.getElementById("testimonial-track");
      const cards = document.querySelectorAll(".testi-card");
      const btnLeft = document.getElementById("btn-testi-left");
      const btnRight = document.getElementById("btn-testi-right");

      btnRight.addEventListener("click", () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        track.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      });

      btnLeft.addEventListener("click", () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        track.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
      });

      const observerOptions = {
        root: track,
        rootMargin: "0px -48% 0px -48%",
        threshold: 0,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card) => {
              card.classList.remove("active");
              card.classList.add("inactive");
            });

            entry.target.classList.add("active");
            entry.target.classList.remove("inactive");
          }
        });
      }, observerOptions);

      cards.forEach((card) => observer.observe(card));

      cards.forEach((card) => {
        card.addEventListener("click", () => {
          card.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        });
      });