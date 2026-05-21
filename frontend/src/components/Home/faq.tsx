export const FaqSection = () => {
  const toggleAccordion = (id: number) => {
    const currentItem = document.getElementById(`item-${id}`);
    const allItems = document.querySelectorAll<HTMLElement>(".accordion-item");
  
    allItems.forEach((item) => {
      const content = item.querySelector<HTMLElement>(".accordion-content-wrapper");
      const plusIcon = item.querySelector<HTMLElement>(".plus-icon");
      const minusIcon = item.querySelector<HTMLElement>(".minus-icon");
      const trigger = item.querySelector<HTMLElement>(".accordion-trigger");
      const iconContainer = item.querySelector<HTMLElement>(".icon-container");
      const copy = item.querySelector<HTMLElement>("p");
      const opening = item === currentItem && content?.classList.contains("grid-rows-[0fr]");
  
      content?.classList.toggle("grid-rows-[0fr]", !opening);
      content?.classList.toggle("grid-rows-[1fr]", opening);
      plusIcon?.classList.toggle("hidden", opening);
      minusIcon?.classList.toggle("hidden", !opening);
      item.classList.toggle("bg-white", !opening);
      item.classList.toggle("bg-[#0F172A]", opening);
      trigger?.classList.toggle("text-[#1a2b3c]", !opening);
      trigger?.classList.toggle("text-white", opening);
      iconContainer?.classList.toggle("text-[#1a2b3c]", !opening);
      iconContainer?.classList.toggle("text-white", opening);
      copy?.classList.toggle("text-gray-600", !opening);
      copy?.classList.toggle("text-gray-300", opening);
    });
  };

  return (
    <>
        <section
              className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
            >
              <div className="max-w-[1320px] mx-auto">
                <span className="mb-10 text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl text-[#1a2b3c] leading-tight">
                    Have Question In Your Mind?
                  </h2>
                </span>
        
                <div
                  className="grid md:grid-cols-1 xl:grid-cols-2 gap-12 md:gap-24 items-center"
                >
                  <div className="space-y-4">
                    
                    <div
                      className="accordion-item bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-colors duration-300"
                      id="item-1"
                    >
                      <button onClick={() => toggleAccordion(1)}
                        className="accordion-trigger group w-full flex justify-between items-center px-6 py-5 text-left text-[#1a2b3c] text-lg font-medium outline-none hover:bg-[#0F172A] hover:text-white transition-colors"
                      >
                        <span>1. Business Strategy</span>
                        <div
                          className="icon-container text-[#1a2b3c] group-hover:text-white transition-colors"
                        >
                          <span
                            className="plus-icon w-5 h-5 transition-transform duration-300"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </span>
                          <span
                            className="minus-icon w-5 h-5 hidden transition-transform duration-300"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </span>
                        </div>
                      </button>
                      <div
                        className="accordion-content-wrapper grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out"
                      >
                        <div className="accordion-inner overflow-hidden">
                          <div className="px-6 pb-6">
                            <p
                              className="text-sm leading-relaxed text-gray-600 transition-colors duration-300"
                            >
                              A long established fact that a reader will be distracted
                              by the readable content of a page when looking at its
                              layout.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div
                      className="accordion-item bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-colors duration-300"
                      id="item-2"
                    >
                      <button onClick={() => toggleAccordion(2)}
                        className="accordion-trigger group w-full flex justify-between items-center px-6 py-5 text-left text-[#1a2b3c] text-lg font-medium outline-none hover:bg-[#0F172A] hover:text-white transition-colors"
                      >
                        <span>2. Growth Marketing</span>
                        <div
                          className="icon-container text-[#1a2b3c] group-hover:text-white transition-colors"
                        >
                          <span
                            className="plus-icon w-5 h-5 transition-transform duration-300"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </span>
                          <span
                            className="minus-icon w-5 h-5 hidden transition-transform duration-300"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </span>
                        </div>
                      </button>
                      <div
                        className="accordion-content-wrapper grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out"
                      >
                        <div className="accordion-inner overflow-hidden">
                          <div className="px-6 pb-6">
                            <p
                              className="text-sm leading-relaxed text-gray-600 transition-colors duration-300"
                            >
                              This is an example of the explanation showing when you
                              click on the accordion. It now expands and collapses with
                              a smooth transition.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    
                    <div
                      className="accordion-item bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-colors duration-300"
                      id="item-3"
                    >
                      <button onClick={() => toggleAccordion(3)}
                        className="accordion-trigger group w-full flex justify-between items-center px-6 py-5 text-left text-[#1a2b3c] text-lg font-medium outline-none hover:bg-[#0F172A] hover:text-white transition-colors"
                      >
                        <span>3. Market Analysis</span>
                        <div
                          className="icon-container text-[#1a2b3c] group-hover:text-white transition-colors"
                        >
                          <span
                            className="plus-icon w-5 h-5 transition-transform duration-300"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </span>
                          <span
                            className="minus-icon w-5 h-5 hidden transition-transform duration-300"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </span>
                        </div>
                      </button>
                      <div
                        className="accordion-content-wrapper grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out"
                      >
                        <div className="accordion-inner overflow-hidden">
                          <div className="px-6 pb-6">
                            <p
                              className="text-sm leading-relaxed text-gray-600 transition-colors duration-300"
                            >
                              Using CSS Grid for animation allows the browser to
                              calculate the exact height of the text dynamically,
                              ensuring zero lag.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  
                  <div
                    className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center mt-8 md:mt-0"
                  >
                    <div
                      className="absolute w-[180px] sm:w-[240px] md:w-[320px] h-[220px] sm:h-[300px] md:h-[420px] rounded-[1.5rem] md:rounded-[24px] overflow-hidden z-10 transform -translate-x-8 sm:-translate-x-12 md:-translate-x-16 -translate-y-6 sm:-translate-y-8 md:-translate-y-10"
                    >
                      <img
                        src="/assets/infinity-home/images/index/acordian-img-1.png"
                        alt="Building exterior"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute w-[180px] sm:w-[240px] md:w-[320px] h-[220px] sm:h-[300px] md:h-[420px] rounded-[1.5rem] md:rounded-[24px] overflow-hidden z-20 transform translate-x-8 sm:translate-x-12 md:translate-x-16 translate-y-6 sm:translate-y-8 md:translate-y-10"
                    >
                      <img
                        src="/assets/infinity-home/images/index/acordian-img-2.png"
                        alt="Modern Office"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </>
  );
};

