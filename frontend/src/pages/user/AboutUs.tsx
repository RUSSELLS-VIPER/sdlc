import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AgentsSection, TestimonialsSection } from "../../components/Home";
import "../../styles/infinity-about.css";
import "../../styles/infinity-cmn.css";
import "../../styles/infinity-home.css";
const centerImage = "/infinity-horizon/assets/images/about-images/zeroIncidentCircle.png";
const ABOUT_IMG = "/infinity-horizon/assets/images/about-images";
const img = (name: string) => `${ABOUT_IMG}/${name}`;

const storyItems = [
  ["1999", "ourStory1999.png"],
  ["2005", "ourStory2005.png"],
  ["2010", "ourStory2010.png"],
  ["2014", "ourStory2014.png"],
  ["2020", "ourStory2020.png"],
  ["2025", "ourStory2025.png"],
];

const offerCards = [
  {
    number: "0.1",
    title: "What we do",
    text: "We maintain this by ensuring transparency and professional conduct.",
    cta: "Our Solutions",
    image: "wwo3.png",
  },
  {
    number: "0.2",
    title: "Our impact",
    text: "To Empower Businesses With Cutting-Edge Web Solutions That Enhance Digital Presence.",
    cta: "Discover More",
    image: "wwo4.png",
  },
  {
    number: "0.3",
    title: "Our values",
    text: "To Empower Businesses With Cutting-Edge Web Solutions That Enhance Digital Presence.",
    cta: "Discover More",
    image: "wwo5.png",
  },
];

const logos = [
  "aboutcom1.png",
  "aboutcom2.png",
  "aboutcom3.png",
  "aboutcom4.png",
  "aboutcom5.png",
  "aboutcom6.png",
];

const AboutUs = () => {
  useEffect(() => {
    const counters = Array.from(document.querySelectorAll<HTMLElement>(".about-counter"));
    let frame = 0;
    const totalFrames = 90;

    const tick = () => {
      frame += 1;
      counters.forEach((counter) => {
        const target = Number(counter.dataset.target ?? 0);
        const suffix = counter.dataset.suffix ?? "";
        const value = Math.min(target, (target * frame) / totalFrames);
        const formatted = Number.isInteger(target) ? Math.floor(value).toString() : value.toFixed(1);
        counter.textContent = `${formatted}${suffix}`;
      });

      if (frame < totalFrames) window.requestAnimationFrame(tick);
    };

    const animation = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      {/* Hero Section Starts */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat flex flex-col"
        // Force the height using inline styles so Tailwind doesn't have to generate it
        style={{
          backgroundImage: `url(${img("about-bg.png")})`,
          height: "80vh", // Sets the base height
          minHeight: "500px" // Prevents it from getting too small on tiny screens
        }}
      >
        <div className="absolute inset-0 bg-[#111827]/40"></div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 pt-24">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            About US
          </h1>
          <div className="lg:w-[45%] md:w-[70%] sm:w-full mb-4">
            <p className="text-white">
              A trusted presence in the Nashville real estate market, known for
              expert guidance, strong partnerships, and a results-focused approach.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base font-medium mt-2">
            <Link to="/" className="hover:text-yellow-400 transition text-white">
              Home
            </Link>
            <span className="text-[10px] sm:text-xs">
              <i className="fa-solid fa-angle-right text-white"></i>
            </span>
            <span className="text-white text-md">About Us</span>
          </div>
        </div>
      </section>

      <main>
        {/* Banner Photo Scroll Section Starts */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white relative z-30 -mt-8 sm:-mt-12 md:-mt-20 rounded-t-[2rem] md:rounded-t-[4rem]">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
              <div className="lg:w-1/2 w-full">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#11212C] font-light leading-tight tracking-wide">
                  Shaping The World Of Things To Come
                </h2>
              </div>

              <div className="lg:w-1/2 w-full flex flex-col items-start gap-5 sm:gap-6">
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                  We'd Love To Share More With You, Please Complete This Form And Our
                  Dedicated Team Will Get Back To You Shortly.
                </p>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
                  In Markets From Renewable Energy, Sports And Entertainment, To Data
                  Centers And Healthcare, We Work To Ensure The Built Environment Leaves
                  Positive Impact. Together, We Strive To Make Your Project Better Than
                  You Imagined Possible.
                </p>
                <Link
                  to="#meetourteam"
                  className="inline-flex items-center gap-3 bg-[#D4AF37] text-white text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-[#bfa031] transition-all duration-300 group"
                 
                >
                  Meet Our Team
                  <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                </Link>
              </div>
            </div>

            <div
              className="relative w-full  rounded-[30px] sm:rounded-[50px]  bg-no-repeat p-4 sm:p-8 md:p-12 overflow-hidden flex items-end justify-center sm:justify-end"
              style={{
                backgroundImage: `url(${img("bg-ps.png")})`,
                backgroundColor: "#f1f5f9",
              }}
            >
              <div className="w-full max-w-sm flex flex-col gap-3 sm:gap-4 z-10">
                <div className="bg-white/90 sm:bg-white backdrop-blur-md p-3 sm:p-5 rounded-[1.5rem] sm:rounded-3xl text-center border border-white/20 flex justify-between sm:justify-center items-center gap-2 sm:gap-12 md:gap-32 h-[110px] sm:h-[130px]">
                  <div className="flex flex-col justify-center sm:justify-between h-full py-1 pl-2 sm:pl-0">
                    <div className="p-1 sm:p-2 bg-transparent text-center rounded-2xl text-[#11212C] w-full">
                      <i className="fa-solid fa-city text-xl sm:text-2xl"></i>
                    </div>
                    <span
                      className="text-2xl sm:text-3xl font-bold text-[#11212C] about-counter"
                      data-target="40"
                      data-suffix="+"
                    >
                      0+
                    </span>
                  </div>

                  <div className="relative w-28 sm:w-36 h-20 sm:h-24 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute w-full animate-scroll-vertical">
                      <div className="flex gap-1 h-20 sm:h-24 p-1">
                        <img
                          src={img("ps1.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-200"
                          alt="Architecture 1"
                        />
                        <img
                          src={img("ps2.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-300"
                          alt="Architecture 2"
                        />
                      </div>

                      <div className="flex gap-1 h-20 sm:h-24 p-1">
                        <img
                          src={img("ps1.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-200"
                          alt="Architecture 3"
                        />
                        <img
                          src={img("ps2.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-300"
                          alt="Architecture 4"
                        />
                      </div>

                      <div className="flex gap-1 h-20 sm:h-24 p-1">
                        <img
                          src={img("ps1.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-200"
                          alt="Architecture 5"
                        />
                        <img
                          src={img("ps2.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-300"
                          alt="Architecture 6"
                        />
                      </div>

                      <div className="flex gap-1 h-20 sm:h-24 p-1">
                        <img
                          src={img("ps1.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-200"
                          alt="Architecture 7"
                        />
                        <img
                          src={img("ps2.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-300"
                          alt="Architecture 8"
                        />
                      </div>

                      <div className="flex gap-1 h-20 sm:h-24 p-1">
                        <img
                          src={img("ps1.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-200"
                          alt="Architecture 9"
                        />
                        <img
                          src={img("ps2.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-300"
                          alt="Architecture 10"
                        />
                      </div>

                      <div className="flex gap-1 h-20 sm:h-24 p-1">
                        <img
                          src={img("ps1.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-200"
                          alt="Architecture 11"
                        />
                        <img
                          src={img("ps2.png")}
                          className="w-1/2 h-full object-cover rounded-md bg-slate-300"
                          alt="Architecture 12"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/90 sm:bg-white backdrop-blur-md p-3 sm:p-5 rounded-[1.5rem] sm:rounded-3xl text-center border border-white/20 flex flex-col justify-between h-[110px] sm:h-[130px] shadow-xl">
                    <div className="p-1 sm:p-2 bg-transparent rounded-2xl text-[#11212C]">
                      <i className="fa-solid fa-map-location text-xl sm:text-2xl"></i>
                    </div>
                    <div>
                      <span
                        className="text-xl sm:text-2xl font-bold text-[#11212C] block mb-0.5 about-counter"
                        data-target="18"
                        data-suffix="m+"
                      >
                        0m+
                      </span>
                      <p className="text-[10px] sm:text-[12px] text-[#11212C] font-normal tracking-wide leading-tight">
                        Square feet of property
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/90 sm:bg-white backdrop-blur-md p-3 sm:p-5 rounded-[1.5rem] sm:rounded-3xl text-center border border-white/20 flex flex-col justify-between h-[110px] sm:h-[130px] shadow-xl">
                    <div className="p-1 sm:p-2 bg-transparent rounded-2xl text-[#11212C]">
                      <i className="fa-solid fa-circle-check text-xl sm:text-2xl"></i>
                    </div>
                    <div>
                      <span
                        className="text-xl sm:text-2xl font-bold text-[#11212C] block mb-0.5 about-counter"
                        data-target="2.5"
                        data-suffix="b+"
                      >
                        0b+
                      </span>
                      <p className="text-[10px] sm:text-[12px] text-[#11212C] font-normal tracking-wide leading-tight">
                        Total projects cost
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2nd Building Scroll Section Starts */}
        <section className="bg-[#F8FAFC] py-6 sm:py-10 md:py-16 overflow-hidden">
          <div className="max-w-[1320px] mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 sm:mb-10 lg:mb-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#11212C] font-light leading-tight tracking-wide">
                  <span className="font-bold">25+</span> Years Of A Remarkable Journey
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full relative">

            <div className="flex animate-scroll-left hover:[animation-play-state:paused] w-max gap-10 sm:gap-16 md:gap-24 lg:gap-32 pr-10 sm:pr-16 md:pr-24 lg:pr-32 capitalize transition-all">
              {[...storyItems, ...storyItems].map(([year, image], index) => (
                <div key={`${year}-${index}`} className="flex flex-col items-center text-center">

                  <div className="relative w-[280px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[380px] md:h-[420px] flex flex-col items-center text-center mb-6 sm:mb-8 group mt-10 cursor-pointer">

                    {/* FIX 1: Changed -top-6 sm:-top-8 to -top-12 sm:-top-16 
        This pushes the year higher up so it peeks out above the building more.
      */}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 font-sans text-5xl sm:text-6xl md:text-7xl tracking-tighter select-none pointer-events-none"
                      style={{
                        color: "#D4AF37",
                        fontWeight: 900,
                        top: "-2rem" /* This replaces -top-16 and forces it up */
                      }}
                    >
                      {year}
                    </span>

                    <div className="relative w-full aspect-square z-10">
                      <img
                        src={img(image)}
                        alt={`Our story ${year}`}
                        className="w-full h-full duration-700 group-hover:-translate-y-3 object-cover"
                      />
                      <div className="absolute inset-x-4 -bottom-6 h-6 bg-black/10 rounded-full blur-xl scale-95 opacity-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* FIX 2: Added 'w-full whitespace-normal capitalize'
      This forces the text to respect the max-w-[260px] boundary and wrap onto the next line!
    */}
                  <p
                    className="text-[#64748B] text-xs sm:text-sm leading-relaxed px-2 font-light mt-4 sm:mt-6 mx-auto capitalize"
                    style={{
                      width: "100%",
                      maxWidth: "260px",
                      whiteSpace: "normal" /* This forces the text to wrap */
                    }}
                  >
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusm doloremque laudtium, totam rem aperiam, eaque ipsa
                  </p>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section Starts */}
        <section className="bg-white py-8 sm:py-12 md:py-16 overflow-hidden font-sans">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 bg-white">
            <div className="mb-12 md:mb-20">
              <span className="text-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 inline-block">
                What We Offer
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#11212C] font-light leading-tight tracking-tight max-w-3xl">
                Take A Brief Look At
                <br />
                Some Of The Services <br />
                We Offer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-5">
              {[
                ["Construction Management", "To Empower Businesses With Cutting-Edge Web Solutions That", "wwo1.png"],
                ["Architecture & Design", "Our Solutions Are Designed To Meet The Needs Of Modern Enterprises.", "wwo2.png"],
              ].map(([title, text, image]) => (
                <div
                  key={title}
                  className="group service-card bg-[#0F172A] rounded-[2rem] sm:rounded-3xl flex flex-col justify-between min-h-[320px] sm:min-h-[380px] overflow-hidden border border-transparent hover:border-slate-200 shadow-xl hover:bg-white transition-all duration-500 cursor-pointer"
                >
                  <div className="p-5 sm:p-8 relative z-10">
                    <h3 className="card-title text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-3 transition-colors duration-500">
                      {title}
                    </h3>
                    <p className="text-white card-desc text-xs sm:text-sm md:text-base transition-colors duration-500">
                      {text}
                    </p>
                  </div>

                  <div className="relative w-full mt-4">
                    <img
                      src={img(image)}
                      className="w-full object-cover transform translate-y-4 group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500 "
                      alt={title}
                    />
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#11212C] group-hover:bg-[#11212C] group-hover:text-white flex items-center justify-center shadow-md transition-all duration-500 z-20">
                      <i className="fa-solid fa-arrow-right text-base sm:text-lg transform -rotate-45 group-hover:rotate-0 transition-transform duration-500"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-4 capitalize mt-4 ">
              {offerCards.map((card) => (
                <div
                  key={card.number}
                  className="group offer-card bg-white rounded-[2rem] sm:rounded-3xl flex flex-col justify-between min-h-[350px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:bg-[#11212C] transition-all duration-500 cursor-pointer"
                >
                  <div className="p-8 relative z-10">
                    <span className="text-sm offer-num text-[#0E0E0E] group-hover:text-white block mb-4 font-mono border-b-2 border-[#0E0E0E] group-hover:border-white pb-1 transition-colors duration-500">
                      {card.number}
                    </span>
                    <h3 className="text-3xl offer-title text-[#11212C] group-hover:text-white font-light mb-4 transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="text-[#0E0E0E] offer-desc group-hover:text-white/70 text-sm md:text-base leading-relaxed mb-6 transition-colors duration-500">
                      {card.text}
                    </p>
                    <Link
                      to="#"
                      className="text-[#D4AF37] underline underline-offset-4 text-sm font-medium"
                    >
                      {card.cta}
                    </Link>
                  </div>

                  <div className="w-full mt-2">
                    <img
                      src={img(card.image)}
                      className="object-cover transform translate-y-4 group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500"
                      alt={card.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agents Section Starts */}
        <section id="meetourteam" className="bg-[#F8FAFC]">
          <AgentsSection />
        </section>

        {/* Logo Slider Section Starts */}
        <section className="w-full bg-white py-4 sm:py-6 md:py-8 overflow-hidden">
          <div className="w-full relative">
            {/* Explicitly forcing display flex here to ensure horizontal layout */}
            <div
              className="animate-scroll items-center select-none"
              style={{ display: "flex" }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex-shrink-0"

                  style={{ paddingRight: "clamp(24px, 5vw, 64px)" }}
                >
                  <img
                    src={img(logo)}
                    alt={logo.replace(".png", "")}
                    className="w-auto object-contain"
                    style={{ height: "clamp(50px, 6vw, 90px)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*Circle Section */}

        <section className="relative w-full overflow-hidden bg-[#F8FAFC] font-sans antialiased">

          {/* 2. TOP BACKGROUND: We overlay a pure White box on the top half */}
          <div
            className="w-full  relative z-0"
            style={{
              height: "200px", backgroundColor: "#f8fafc"
            }}
          >
            {/* The weird, broken U-shape div that was here has been DELETED! */}
          </div>

          {/* CENTER CIRCLE WRAPPER */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none"
            style={{ top: "200px", width: "280px", height: "280px" }}
          >

            {/* Spinning SVG Text */}
            {/* 3. Removed the 'bg-[#F8FAFC]' class from the SVG so it is transparent */}
            <svg
              viewBox="0 0 200 200"
              className="absolute w-full h-full animate-spin-slow origin-center z-0 rounded-full"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text className="font-semibold text-[10px] uppercase" fill="black">
                <textPath
                  xlinkHref="#circlePath"
                  startOffset="0"
                  textLength="468"
                >
                  Our goal is zero incidents Our goal is zero incidents Our goal is zero incidents
                </textPath>
              </text>
            </svg>

            {/* Center Image */}
            <div
              className="absolute rounded-full overflow-hidden z-10 pointer-events-auto shadow-md"
              style={{ width: "180px", height: "180px" }}
            >
              <img
                src={centerImage}
                alt="Zero Incidents Focus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* BOTTOM SPACING */}
          <div style={{ height: "180px" }}></div>
        </section>
        {/* Testimonials Section Starts */}
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default AboutUs;
