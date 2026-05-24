import bgimg from '../../assets/images/contacts-images/newsltr-bg.png'
const Newslettersection = () => {
  return (
    <section
      id="newsletter"
      className="relative py-14 md:py-20 bg-cover bg-center bg-no-repeat w-full"
    style={{backgroundImage:`url(${bgimg})`}}
    >
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        <div
          className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center"
        >
          <div>
            <h2
              className="font-serif text-[32px] sm:text-[44px] md:text-[56px] leading-[1.1] md:leading-[0.95] text-[#1b2948] font-light"
            >
              Subscribe Our Newsletter
            </h2>
            <p className="mt-4 md:mt-5 text-[14px] md:text-[16px] text-[#3d4658]">
              Sign up our newsletter to get update news article about company.
            </p>
          </div>

           {/* Form Content  */}
          <form onSubmit={(e)=>{e.preventDefault();
            console.log("form submitted")
          }}
            className="w-full flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start lg:justify-end mt-4 lg:mt-0"
          >
            <input
              type="email"
              placeholder="Email Address"
              className="w-full sm:flex-1 lg:flex-none lg:w-[310px] h-[48px] rounded-[10px] border border-[#1b2948] bg-white/80 backdrop-blur-sm px-4 text-[16px] text-[#1b2948] font-[inherit] outline-none placeholder:text-[#6a7385] transition-all duration-300 focus:bg-[#f8fafe] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              required
            />

            <button
              type="submit"
              className="flex items-center justify-center w-full sm:w-auto h-[48px] px-8 rounded-[10px] bg-[#15274b] text-white text-[16px] font-medium border border-transparent hover:bg-white hover:text-[#15274b] hover:border-[#15274b] transition-all duration-300 font-[inherit] whitespace-nowrap flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newslettersection