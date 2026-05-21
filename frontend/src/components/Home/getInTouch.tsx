import { useEffect } from "react";

export const GetInTouchSection = () => {
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
  
    const contactMenu = document.getElementById("contact-dropdown-options");
    const contactArrow = document.getElementById("contact-dropdown-icon");
    const contactSelectedText = document.getElementById("contact-dropdown-label");
  
    on(document.getElementById("contact-dropdown-trigger"), "click", (event) => {
      event.stopPropagation();
      contactMenu?.classList.toggle("hidden");
      contactArrow?.classList.toggle("rotate-180");
    });
  
    document.querySelectorAll<HTMLElement>(".contact-option-item").forEach((item) => {
      on(item, "click", () => {
        if (contactSelectedText) {
          contactSelectedText.innerText = item.getAttribute("data-value") ?? "";
          contactSelectedText.classList.remove("text-gray-500");
          contactSelectedText.classList.add("text-[#1a2b3c]");
        }
        contactMenu?.classList.add("hidden");
        contactArrow?.classList.remove("rotate-180");
      });
    });
  
    on(document.body, "click", (event) => {
      const container = document.getElementById("contact-dropdown-container");
      if (container && !container.contains(event.target as Node)) {
        contactMenu?.classList.add("hidden");
        contactArrow?.classList.remove("rotate-180");
      }
    });
  
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
        <section
              className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#f3f6f9] overflow-hidden"
            >
              <div
                className="max-w-[1320px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center"
              >
                <div
                  className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] flex items-center justify-center"
                >
                  <div
                    className="absolute w-[140px] sm:w-[200px] md:w-[260px] h-[200px] sm:h-[280px] md:h-[360px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg z-10 transform -rotate-[15deg] -translate-x-12 sm:-translate-x-20 md:-translate-x-32 translate-y-4 sm:translate-y-8 md:translate-y-12"
                  >
                    <img
                      src="/assets/infinity-home/images/index/form-img-2.png"
                      alt="Building Background Left"
                      className="w-full h-full object-cover"
                    />
                  </div>
        
                  <div
                    className="absolute w-[140px] sm:w-[200px] md:w-[260px] h-[200px] sm:h-[280px] md:h-[360px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg z-10 transform rotate-[20deg] translate-x-16 sm:translate-x-24 md:translate-x-36 translate-y-10 sm:translate-y-16 md:translate-y-24"
                  >
                    <img
                      src="/assets/infinity-home/images/index/form-img-3.png"
                      alt="Building Background Right"
                      className="w-full h-full object-cover"
                    />
                  </div>
        
                  <div
                    className="absolute w-[140px] sm:w-[200px] md:w-[260px] h-[200px] sm:h-[280px] md:h-[360px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl z-30 transform -translate-y-2 sm:-translate-y-4 md:-translate-y-8"
                  >
                    <img
                      src="/assets/infinity-home/images/index/form-img-1.png"
                      alt="Building Main"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
        
                <div className="text-left mt-8 md:mt-0">
                  <h2 className="text-4xl sm:text-5xl text-[#1a2b3c] mb-4 leading-tight">
                    Get In Touch <br />
                    With Our Experts
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg mb-10 sm:mb-12">
                    A 30-min discovery call to see how we can help.
                  </p>
        
                  <form
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-12"
                  >
                    <div className="relative border-b border-gray-400 pb-2 transition-all">
                      <input
                        type="text"
                        className="w-full text-sm bg-transparent text-[#1a2b3c] focus:outline-none placeholder-gray-500"
                        placeholder="Name"
                      />
                    </div>
        
                    <div className="relative border-b border-gray-400 pb-2 transition-all">
                      <input
                        type="email"
                        className="w-full text-sm bg-transparent text-[#1a2b3c] focus:outline-none placeholder-gray-500"
                        placeholder="Email (required)"
                      />
                    </div>
        
                    <div className="relative border-b border-gray-400 pb-2 transition-all">
                      <input
                        type="tel"
                        className="w-full text-sm bg-transparent text-[#1a2b3c] focus:outline-none placeholder-gray-500"
                        placeholder="Phone Number"
                      />
                    </div>
        
                    <div
                      className="relative border-b border-gray-400 pb-2"
                      id="contact-dropdown-container"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer py-0.5"
                        id="contact-dropdown-trigger"
                      >
                        <span className="text-sm text-gray-500" id="contact-dropdown-label"
                          >Select Service</span
                        >
                        <i
                          className="fa-solid fa-chevron-down text-[14px] text-gray-400 transition-transform duration-300"
                          id="contact-dropdown-icon"
                        ></i>
                      </div>
        
                      <div
                        id="contact-dropdown-options"
                        className="hidden absolute left-0 right-0 top-full mt-1 bg-white/95 backdrop-blur-md shadow-lg rounded-xl overflow-hidden z-50 border border-gray-200"
                      >
                        <div
                          className="contact-option-item px-4 py-3 text-sm text-[#1a2b3c] hover:bg-[#1a2b3c] hover:text-white cursor-pointer transition-colors"
                          data-value="Buying Property"
                        >
                          Buying Property
                        </div>
                        <div
                          className="contact-option-item px-4 py-3 text-sm text-[#1a2b3c] hover:bg-[#1a2b3c] hover:text-white cursor-pointer transition-colors"
                          data-value="Renting Property"
                        >
                          Renting Property
                        </div>
                        <div
                          className="contact-option-item px-4 py-3 text-sm text-[#1a2b3c] hover:bg-[#1a2b3c] hover:text-white cursor-pointer transition-colors"
                          data-value="Selling Property"
                        >
                          Selling Property
                        </div>
                      </div>
                    </div>
        
                    <div
                      className="sm:col-span-2 relative border-b border-gray-400 pb-2 transition-all"
                    >
                      <textarea
                        className="w-full text-sm bg-transparent text-[#1a2b3c] resize-none h-6 pt-1 focus:outline-none placeholder-gray-500"
                        placeholder="Message"
                      ></textarea>
                    </div>
        
                    <div className="sm:col-span-2 mt-2 sm:mt-4">
                      <button
                        type="submit"
                        className="group flex items-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border border-transparent hover:border-[#0F172A]"
                      >
                        <span className="text-sm font-medium whitespace-nowrap">Send</span>
        
                        <div
                          className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]"
                        >
                          <i
                            className="fa-solid fa-arrow-right text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"
                          ></i>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
      </>
  );
};

