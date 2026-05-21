  // Video Section
      document.addEventListener("DOMContentLoaded", () => {
        const wrapper = document.getElementById("promo-vid-wrapper");
        const video = document.getElementById("promo-vid-element");

        wrapper.addEventListener("click", (e) => {
          e.preventDefault();

          if (video.paused) {
            video.play();
            wrapper.classList.add("is-playing");
          } else {
            video.pause();
            wrapper.classList.remove("is-playing");
          }
        });
      });

// FaQs Section
      document.addEventListener("DOMContentLoaded", () => {
        const toggles = document.querySelectorAll(".faq-toggle");

        toggles.forEach((toggle) => {
          toggle.addEventListener("click", function (e) {
            e.preventDefault();

            const currentItem = this.closest(".faq-item");
            const isActive = currentItem.classList.contains("is-active");

            document.querySelectorAll(".faq-item").forEach((item) => {
              item.classList.remove("is-active");
            });

            if (!isActive) {
              currentItem.classList.add("is-active");
            }
          });
        });

        const clearBtn = document.getElementById("clear-faq-search");
        const inputField = document.getElementById("faq-search-input");

        clearBtn.addEventListener("click", (e) => {
          e.preventDefault();
          inputField.value = "";
          inputField.focus();
        });
      });