      // auto scroll
      const wrapper = document.getElementById("team-members-wrapper");
      const scrollSpeed = 2000;
      function startSimpleScroll() {
        setInterval(() => {
          const firstCard = wrapper.children[0];
          const secondCard = wrapper.children[1];
          const step =
            secondCard.getBoundingClientRect().left -
            firstCard.getBoundingClientRect().left;
          wrapper.style.transition = "transform 0.5s ease-in-out";
          wrapper.style.transform = `translate3d(-${step}px, 0, 0)`;

          setTimeout(() => {
            wrapper.style.transition = "none";
            wrapper.style.transform = "translate3d(0, 0, 0)";
            wrapper.appendChild(firstCard);
          }, 500);
        }, scrollSpeed);
      }
      startSimpleScroll();