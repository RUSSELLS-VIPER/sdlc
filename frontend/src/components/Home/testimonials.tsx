import { useEffect } from "react";

export const TestimonialsSection = () => {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | null,
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
    ) => {
      if (!el) return;
      el.addEventListener(type, handler as EventListener);
      cleanups.push(() => el.removeEventListener(type, handler as EventListener));
    };
  
    const track = document.getElementById("testimonial-track");
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".testi-card"));
    const scrollTestimonial = (direction: number) => {
      if (!track || cards.length === 0) return;
      const gap = parseInt(window.getComputedStyle(track).gap || "0", 10);
      track.scrollBy({ left: direction * (cards[0].offsetWidth + gap), behavior: "smooth" });
    };
  
    on(document.getElementById("btn-testi-left"), "click", () => scrollTestimonial(-1));
    on(document.getElementById("btn-testi-right"), "click", () => scrollTestimonial(1));
  
    let observer: IntersectionObserver | undefined;
    if (track && cards.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            cards.forEach((card) => {
              card.classList.remove("active");
              card.classList.add("inactive");
            });
            entry.target.classList.add("active");
            entry.target.classList.remove("inactive");
          });
        },
        { root: track, rootMargin: "0px -48% 0px -48%", threshold: 0 },
      );
  
      cards.forEach((card) => {
        observer?.observe(card);
        on(card, "click", () => card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }));
      });
    }
  
    return () => {
      observer?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
        <section className="bg-[#f3f6f9] px-6 py-12">
              <div
                className="max-w-[1320px] flex flex-col items-center justify-center mx-auto"
              >
                <h2
                  className="text-3xl md:text-4xl lg:text-[40px] font-semibold text-center text-[#1a1f2c] mb-8 lg:mb-16"
                >
                  What People Say
                </h2>
        
                <div className="relative w-full max-w-[1320px]">
                  <div
                    id="testimonial-track"
                    className="flex gap-4 lg:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-12 w-full px-4 sm:px-0"
                  >
                    <div
                      className="shrink-0 w-[5vw] md:w-[calc(50%-175px)] lg:w-[calc(50%-200px)]"
                    ></div>
        
                    <div
                      className="testi-card inactive shrink-0 snap-center w-[85vw] sm:w-[350px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-between h-full rounded-md relative cursor-pointer"
                    >
                      <div className="testi-bubble p-6 sm:p-8 relative mb-10 rounded-md">
                        <p
                          className="testi-text text-base sm:text-lg font-medium leading-relaxed"
                        >
                          “Infinity Horizon Properties are designed to offer all
                          amenities within the project. They understand the importance
                          of a comfortable living space”
                        </p>
                        <div
                          className="testi-tail absolute -bottom-8 right-10 w-16 h-16 rotate-45 rounded-sm z-[-1]"
                        ></div>
                      </div>
                      <div className="px-2 mt-auto">
                        <h4 className="testi-author font-semibold text-lg lg:text-xl">
                          Robert Downey 1
                        </h4>
                        <p className="testi-role text-sm mt-1">Resident</p>
                      </div>
                    </div>
        
                    <div
                      className="testi-card inactive shrink-0 snap-center w-[85vw] sm:w-[350px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-between h-full rounded-md relative cursor-pointer"
                    >
                      <div className="testi-bubble p-6 sm:p-8 relative mb-10 rounded-md">
                        <p
                          className="testi-text text-base sm:text-lg font-medium leading-relaxed"
                        >
                          “Infinity Horizon Properties are designed to offer all
                          amenities within the project. They understand the importance
                          of a comfortable living space”
                        </p>
                        <div
                          className="testi-tail absolute -bottom-8 right-10 w-16 h-16 rotate-45 rounded-sm z-[-1]"
                        ></div>
                      </div>
                      <div className="px-2 mt-auto">
                        <h4 className="testi-author font-semibold text-lg lg:text-xl">
                          Robert Downey 2
                        </h4>
                        <p className="testi-role text-sm mt-1">Resident</p>
                      </div>
                    </div>
        
                    <div
                      className="testi-card inactive shrink-0 snap-center w-[85vw] sm:w-[350px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-between h-full rounded-md relative cursor-pointer"
                    >
                      <div className="testi-bubble p-6 sm:p-8 relative mb-10 rounded-md">
                        <p
                          className="testi-text text-base sm:text-lg font-medium leading-relaxed"
                        >
                          “Infinity Horizon Properties are designed to offer all
                          amenities within the project. They understand the importance
                          of a comfortable living space”
                        </p>
                        <div
                          className="testi-tail absolute -bottom-8 right-10 w-16 h-16 rotate-45 rounded-sm z-[-1]"
                        ></div>
                      </div>
                      <div className="px-2 mt-auto">
                        <h4 className="testi-author font-semibold text-lg lg:text-xl">
                          Robert Downey 3
                        </h4>
                        <p className="testi-role text-sm mt-1">Resident</p>
                      </div>
                    </div>
        
                    <div
                      className="testi-card inactive shrink-0 snap-center w-[85vw] sm:w-[350px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-between h-full rounded-md relative cursor-pointer"
                    >
                      <div className="testi-bubble p-6 sm:p-8 relative mb-10 rounded-md">
                        <p
                          className="testi-text text-base sm:text-lg font-medium leading-relaxed"
                        >
                          “Infinity Horizon Properties are designed to offer all
                          amenities within the project. They understand the importance
                          of a comfortable living space”
                        </p>
                        <div
                          className="testi-tail absolute -bottom-8 right-10 w-16 h-16 rotate-45 rounded-sm z-[-1]"
                        ></div>
                      </div>
                      <div className="px-2 mt-auto">
                        <h4 className="testi-author font-semibold text-lg lg:text-xl">
                          Robert Downey 4
                        </h4>
                        <p className="testi-role text-sm mt-1">Resident</p>
                      </div>
                    </div>
        
                    <div
                      className="testi-card inactive shrink-0 snap-center w-[85vw] sm:w-[350px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-between h-full rounded-md relative cursor-pointer"
                    >
                      <div className="testi-bubble p-6 sm:p-8 relative mb-10 rounded-md">
                        <p
                          className="testi-text text-base sm:text-lg font-medium leading-relaxed"
                        >
                          “Infinity Horizon Properties are designed to offer all
                          amenities within the project. They understand the importance
                          of a comfortable living space”
                        </p>
                        <div
                          className="testi-tail absolute -bottom-8 right-10 w-16 h-16 rotate-45 rounded-sm z-[-1]"
                        ></div>
                      </div>
                      <div className="px-2 mt-auto">
                        <h4 className="testi-author font-semibold text-lg lg:text-xl">
                          Robert Downey 5
                        </h4>
                        <p className="testi-role text-sm mt-1">Resident</p>
                      </div>
                    </div>
        
                    <div
                      className="shrink-0 w-[5vw] md:w-[calc(50%-175px)] lg:w-[calc(50%-200px)]"
                    ></div>
                  </div>
                </div>
        
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    id="btn-testi-left"
                    className="flex items-center justify-center w-12 h-12 bg-[#111827] rounded-full hover:bg-slate-800 transform hover:-translate-x-1 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg"
                  >
                    <i
                      className="fa-solid fa-arrow-left text-[#eab308] text-sm md:text-base"
                    ></i>
                  </button>
                  <button
                    id="btn-testi-right"
                    className="flex items-center justify-center w-12 h-12 bg-[#e2e8f0] border border-slate-300 rounded-full hover:bg-slate-200 transform hover:translate-x-1 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none shadow-sm hover:shadow-md"
                  >
                    <i
                      className="fa-solid fa-arrow-right text-[#eab308] text-sm md:text-base"
                    ></i>
                  </button>
                </div>
              </div>
            </section>
      </>
  );
};

