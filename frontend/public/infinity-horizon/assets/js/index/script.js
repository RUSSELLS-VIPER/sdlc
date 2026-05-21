 
 
 
// Our Ongoing Projects
      const projectSlider = document.getElementById("projects-slider");
      const prevBtn = document.getElementById("prev-btn");
      const nextBtn = document.getElementById("next-btn");

      const scrollAmount = 424;

      prevBtn.addEventListener("click", () => {
        if (projectSlider.scrollLeft <= 10) {
          projectSlider.scrollTo({
            left: projectSlider.scrollWidth,
            behavior: "smooth",
          });
        } else {
          projectSlider.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
        }
      });

      nextBtn.addEventListener("click", () => {
        const maxScroll = projectSlider.scrollWidth - projectSlider.clientWidth;

        if (projectSlider.scrollLeft >= maxScroll - 10) {
          projectSlider.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          projectSlider.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      });
      const setupSlider = (id, nextBtnId) => {
        const el = document.getElementById(id);
        const btn = document.getElementById(nextBtnId);
        if (!el) return;
        btn?.addEventListener("click", () => {
          el.scrollLeft += 400;
        });
        let isDown = false,
          startX,
          scrollLeft;
        el.addEventListener("mousedown", (e) => {
          isDown = true;
          startX = e.pageX - el.offsetLeft;
          scrollLeft = el.scrollLeft;
          el.style.scrollBehavior = "auto";
        });
        el.addEventListener("mouseleave", () => (isDown = false));
        el.addEventListener("mouseup", () => {
          isDown = false;
          el.style.scrollBehavior = "smooth";
        });
        el.addEventListener("mousemove", (e) => {
          if (!isDown) return;
          e.preventDefault();
          const walk = (e.pageX - el.offsetLeft - startX) * 2;
          el.scrollLeft = scrollLeft - walk;
        });
      };
 
 // Hero Video
      function toggleGlobalVideo() {
        const v = document.getElementById("heroVideo");
        const play = document.getElementById("playIcon");
        const pause = document.getElementById("pauseIcon");
        if (v.paused) {
          v.play();
          play.classList.add("hidden");
          pause.classList.remove("hidden");
        } else {
          v.pause();
          play.classList.remove("hidden");
          pause.classList.add("hidden");
        }
      }

      window.onload = () => {
        setupSlider("content-house");
        setupSlider("project-scroll", "nextBtn");
        setupSlider("agent-slider", "agent-next");
      };

// Video Section
      const video = document.getElementById("bgVideo");
      const controlBtn = document.getElementById("videoControlBtn");
      const controlIcon = document.getElementById("controlIcon");

      controlBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          controlIcon.classList.remove("fa-play", "ml-1");
          controlIcon.classList.add("fa-pause");
        } else {
          video.pause();
          controlIcon.classList.remove("fa-pause");
          controlIcon.classList.add("fa-play", "ml-1");
        }
      });


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


// Calculator Section
        let currentInput = "0";
        const screen = document.getElementById("screen");

        function updateScreen() {
          screen.innerText = currentInput;
        }

        function appendNum(num) {
          if (currentInput === "0") currentInput = num;
          else currentInput += num;
          updateScreen();
        }

        function appendOp(op) {
          const lastChar = currentInput.slice(-1);
          if (["+", "-", "*", "/"].includes(lastChar)) {
            currentInput = currentInput.slice(0, -1) + op;
          } else {
            currentInput += op;
          }
          updateScreen();
        }

        function clearScreen() {
          currentInput = "0";
          updateScreen();
        }

        function calculate() {
          try {
            currentInput = String(new Function("return " + currentInput)());
            updateScreen();
          } catch (e) {
            currentInput = "Error";
            updateScreen();
            setTimeout(clearScreen, 1500);
          }
        }

// Form Section
        const contactTrigger = document.getElementById(
          "contact-dropdown-trigger",
        );
        const contactMenu = document.getElementById("contact-dropdown-options");
        const contactArrow = document.getElementById("contact-dropdown-icon");
        const contactSelectedText = document.getElementById(
          "contact-dropdown-label",
        );

        contactTrigger.addEventListener("click", (e) => {
          e.stopPropagation();
          contactMenu.classList.toggle("hidden");
          contactArrow.classList.toggle("rotate-180");
        });

        document.querySelectorAll(".contact-option-item").forEach((item) => {
          item.addEventListener("click", (e) => {
            contactSelectedText.innerText = e.target.getAttribute("data-value");
            contactSelectedText.classList.remove("text-gray-500");
            contactSelectedText.classList.add("text-[#1a2b3c]");
            contactMenu.classList.add("hidden");
            contactArrow.classList.remove("rotate-180");
          });
        });

        window.addEventListener("click", (e) => {
          const container = document.getElementById(
            "contact-dropdown-container",
          );
          if (container && !container.contains(e.target)) {
            contactMenu.classList.add("hidden");
            contactArrow.classList.remove("rotate-180");
          }
        });

// Auto-Scroll LoGos
      const sliders = document.querySelectorAll(".drag-slider");

      sliders.forEach((slider) => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener("mousedown", (e) => {
          isDown = true;
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", () => {
          isDown = false;
        });

        slider.addEventListener("mouseup", () => {
          isDown = false;
        });

        slider.addEventListener("mousemove", (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 2;
          slider.scrollLeft = scrollLeft - walk;
        });
      });

// Accordion Section
        function toggleAccordion(id) {
          const currentItem = document.getElementById(`item-${id}`);
          const allItems = document.querySelectorAll(".accordion-item");

          allItems.forEach((item) => {
            const content = item.querySelector(".accordion-content-wrapper");
            const plusIcon = item.querySelector(".plus-icon");
            const minusIcon = item.querySelector(".minus-icon");

            if (item === currentItem) {
              if (content.classList.contains("grid-rows-[0fr]")) {
                content.classList.remove("grid-rows-[0fr]");
                content.classList.add("grid-rows-[1fr]");
                plusIcon.classList.add("hidden");
                minusIcon.classList.remove("hidden");
              } else {
                content.classList.add("grid-rows-[0fr]");
                content.classList.remove("grid-rows-[1fr]");
                plusIcon.classList.remove("hidden");
                minusIcon.classList.add("hidden");
              }
            } else {
              content.classList.add("grid-rows-[0fr]");
              content.classList.remove("grid-rows-[1fr]");
              plusIcon.classList.remove("hidden");
              minusIcon.classList.add("hidden");
            }
          });
        }