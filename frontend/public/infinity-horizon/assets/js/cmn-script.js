// Mobile Menu
      const $ = (id) => document.getElementById(id);
      const toggleClass = (el, cls) => el.classList.toggle(cls);

      const toggleDrawer = () => {
        toggleClass($("mobile-menu"), "translate-x-full");
        toggleClass($("menu-overlay"), "opacity-0");
        toggleClass($("menu-overlay"), "invisible");
        toggleClass($("icon-menu"), "hidden");
        toggleClass($("icon-close"), "hidden");
        document.body.style.overflow = document.body.style.overflow
          ? ""
          : "hidden";
      };

      ["menu-btn", "close-menu-btn", "menu-overlay"].forEach(
        (id) => ($(id).onclick = toggleDrawer),
      );

      $("desktop-properties-btn").onclick = (e) => {
        e.preventDefault();
        toggleClass($("desktop-properties-dropdown"), "force-show");
      };
      document.onclick = (e) => {
        if (
          !$("desktop-properties-btn").contains(e.target) &&
          !$("desktop-properties-dropdown").contains(e.target)
        ) {
          $("desktop-properties-dropdown").classList.remove("force-show");
        }
      };

      $("mobile-properties-btn").onclick = (e) => {
        e.preventDefault();
        toggleClass($("mobile-properties-menu"), "open");
        $("mobile-properties-icon").style.transform = $(
          "mobile-properties-menu",
        ).classList.contains("open")
          ? "rotate(180deg)"
          : "rotate(0deg)";
      };