import { NavLink } from "react-router-dom";
import headset from "../../assets/images/contacts-images/headset.png";
import women from "../../assets/images/contacts-images/women-pointing.png" 
const Chatwithus = () => {
  return (
    <section
      id="contact-form"
      className="bg-[#f6f7fa] lg:bg-white overflow-hidden pt-8 sm:pt-12 md:pt-26 lg:pt-20"
    >
      <div className="container max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="content grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-end">
          <div className="relative w-full flex flex-col items-center justify-end pt-4 lg:pt-32 xl:pt-40">
            <div className="relative z-[1] w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] flex flex-col items-center lg:block mx-auto lg:ml-auto lg:mr-4">
              <div className="relative lg:absolute z-20 lg:-top-[300px] lg:-left-[0] xl:-top-[350px] xl:-left-[0] w-full max-w-[250px] bg-white border border-[#1a2848] rounded-[22px] p-6 sm:p-8 text-center shadow-sm mb-8 lg:mb-0">
                <div className="text-[#1a2848] inline-flex items-center justify-center mb-4">
                  <img
                    src={headset}
                    alt="Headset icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <p className="text-[20px] sm:text-[22px] leading-tight text-[#1b253d] font-serif font-semibold mb-3">
                  Chat With Live!
                </p>
                <p className="text-[12px] sm:text-[13px] leading-relaxed text-gray-600 mb-6">
                  One event with top speakers & trending topics. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
                <NavLink
                  to="chat"
                  className="inline-block text-[13px] font-medium border border-[#9ca6ba] rounded-lg px-8 py-2.5 text-[#1b253d] hover:bg-[#1a2848] hover:text-white transition-colors duration-300"
                >
                  Lets Chat
                </NavLink>
              </div>

              <img
                src={women}
                alt="Business advisor"
                className="w-full object-contain relative z-[1]"
              />
            </div>
          </div>

          <div className="w-full max-w-[600px] mx-auto lg:mx-0 pb-0 lg:pb-8">
            <span className="text-sm tracking-widest text-[#1a2640] font-bold uppercase mb-3 block">
              CONTACT US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#11212C] mb-8 sm:mb-10">
              Reach & Get In Touch With Us
            </h2>
              

            <form className="space-y-4 sm:space-y-5" onSubmit={(e)=>e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Name*"
                className="w-full h-12 sm:h-14 rounded-xl border border-[#7f8faa] bg-transparent px-4 sm:px-5 text-sm sm:text-base text-[#4d5a73] outline-none transition-all duration-300 focus:border-[#14244a] focus:shadow-[0_0_0_3px_rgba(20,36,74,0.12)]"
              />
              <input
                type="email"
                placeholder="Your Email*"
                className="w-full h-12 sm:h-14 rounded-xl border border-[#7f8faa] bg-transparent px-4 sm:px-5 text-sm sm:text-base text-[#4d5a73] outline-none transition-all duration-300 focus:border-[#14244a] focus:shadow-[0_0_0_3px_rgba(20,36,74,0.12)]"
              />
              <input
                type="tel"
                placeholder="Your ph No*"
                className="w-full h-12 sm:h-14 rounded-xl border border-[#7f8faa] bg-transparent px-4 sm:px-5 text-sm sm:text-base text-[#4d5a73] outline-none transition-all duration-300 focus:border-[#14244a] focus:shadow-[0_0_0_3px_rgba(20,36,74,0.12)]"
              />
              <input
                type="text"
                placeholder="Your Subject*"
                className="w-full h-12 sm:h-14 rounded-xl border border-[#7f8faa] bg-transparent px-4 sm:px-5 text-sm sm:text-base text-[#4d5a73] outline-none transition-all duration-300 focus:border-[#14244a] focus:shadow-[0_0_0_3px_rgba(20,36,74,0.12)]"
              />
              <textarea
                placeholder="Enter Message"
                className="w-full h-32 sm:h-40 rounded-xl border border-[#7f8faa] bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-[#4d5a73] outline-none resize-none transition-all duration-300 focus:border-[#14244a] focus:shadow-[0_0_0_3px_rgba(20,36,74,0.12)]"
              ></textarea>

              <div className="pt-2 sm:pt-4 pb-8">
                <button
                type="submit"
              
                  className="group inline-flex items-center justify-between min-w-[160px] sm:min-w-[180px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#1a2848] text-white hover:bg-white hover:text-[#1a2848] border border-transparent hover:border-[#1a2848] transition-all duration-300 shadow-md"
                >
                  <span className="text-sm sm:text-base font-medium">
                    Send Message
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 ml-4 rounded-full bg-white group-hover:bg-[#1a2848] transition-colors duration-300">
                    <i className="fa-solid fa-arrow-right text-sm sm:text-base text-[#1a2848] -rotate-45 group-hover:text-white group-hover:rotate-0 transition-transform duration-300"></i>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatwithus;
