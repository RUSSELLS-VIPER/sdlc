import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const agents = [
  {
    image: "/assets/infinity-home/images/index/agent-1.png",
    alt: "Agent 1",
  },
  {
    image: "/assets/infinity-home/images/index/agent-2.png",
    alt: "Agent 2",
  },
  {
    image: "/assets/infinity-home/images/index/agent-3.png",
    alt: "Agent 3",
  },
  {
    image: "/assets/infinity-home/images/index/agent-4.png",
    alt: "Agent 4",
  },
];

export const AgentsSection = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollAgentsRight = () => {
    const slider = sliderRef.current;
    const card = slider?.querySelector<HTMLElement>(".agent-card");
    if (!slider || !card) return;

    const gap = parseInt(window.getComputedStyle(slider).gap || "0", 10);
    slider.scrollBy({ left: card.offsetWidth + gap, behavior: "smooth" });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (event: MouseEvent) => {
      isDown = true;
      startX = event.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.remove("scroll-smooth");
    };

    const stopDragging = () => {
      isDown = false;
      slider.classList.add("scroll-smooth");
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDown) return;
      event.preventDefault();
      const walk = (event.pageX - slider.offsetLeft - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", stopDragging);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="py-[50px] lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 lg:mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">
              Meet Our Agents
            </h2>
            <p className="text-[#1E1E1E] text-2xl sm:text-xl">
              Always give you best suggestion
            </p>
          </div>
          <button
            type="button"
            onClick={scrollAgentsRight}
            className="flex items-center justify-center w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full bg-[#111827] text-amber-500 border-2 hover:bg-white hover:text-black hover:border-black transition-colors"
            aria-label="Scroll agents"
          >
            <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-pointer select-none pb-8 px-1"
        >
          {agents.map((agent) => (
            <div
              key={agent.image}
              className="agent-card group relative flex-shrink-0 w-[200px] sm:w-[270px] lg:w-[320px] h-[300px] sm:h-[400px] lg:h-[450px]"
            >
              <div className="absolute inset-0 overflow-hidden bg-white border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[120px] group-hover:rounded-[24px] lg:rounded-[160px] lg:group-hover:rounded-[24px]">
                <img
                  src={agent.image}
                  alt={agent.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 lg:pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-white text-base font-bold pt-1">4.9</span>
                    <span className="text-orange-400 text-xl">&#9733;</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                    Danial Carter
                  </h3>
                  <p className="text-gray-300 text-xs lg:text-sm mb-2">
                    Field Executive
                  </p>
                  <div className="flex gap-6 items-center justify-center text-[#FCA311] transition-all duration-300 px-5 py-2 border border-white backdrop-blur rounded-2xl">
                    <Link to="#" className="hover:scale-110 transition-transform">
                      <img
                        src="/assets/infinity-home/images/index/fb-logo.png"
                        alt="Facebook"
                        className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                      />
                    </Link>
                    <Link to="#" className="hover:scale-110 transition-transform">
                      <img
                        src="/assets/infinity-home/images/index/insta-logo.png"
                        alt="Instagram"
                        className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
