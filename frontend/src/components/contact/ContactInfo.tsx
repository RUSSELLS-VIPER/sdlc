
 import office from "../../assets/images/contacts-images/office.png"
import  clock from  "../../assets/images/contacts-images/clock.png"
import  misscall from "../../assets/images/contacts-images/misscall.png"
import message from "../../assets/images/contacts-images/message.png"
const ContactInfo = () => {
  return (
    
         <section id="contact-info" className="bg-[#edf1f7] py-16 lg:py-[58px]">
      <div className="max-w-[1320px] lg:max-w-[984px] mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2
            className="font-playfair text-[36px] sm:text-[44px] md:text-[52px] lg:text-[48px] leading-[0.95] lg:leading-none text-[#1e2330]"
          >
            Contact & Join Together
          </h2>
          <p
            className="mt-4 text-[16px] lg:text-[11px] lg:leading-[1.25] text-gray-600 lg:text-[#1e2330] lg:max-w-[500px] lg:mx-auto"
          >
            Vivamus magna justo, lacinia eget consectetur sed, convallis at
            tellus. Quisque velit nisi,pretium utlacinia,inementum id enim.
          </p>
        </div>

        <div
          className="mt-12 lg:mt-[70px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12"
        >
          <div
            className="contact-card group bg-white border border-[#1a2848]/60 rounded-2xl lg:rounded-[14px] px-6 lg:px-4 py-7 lg:py-[18px] text-center min-h-[176px] lg:min-h-[154px] flex flex-col justify-center transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[#14244a] hover:bg-[#14244a] hover:shadow-[0_10px_20px_rgba(20,36,74,0.28)]"
          >
            <div
              className="card-icon-wrap w-12 h-12 mx-auto rounded-full bg-[#14244a] flex items-center justify-center transition-all duration-[350ms] group-hover:bg-white"
            >
              <div className="image-wrap">
                <img
                  src={office}
                  alt="Office icon"
                  className="w-8 h-8 transition-all duration-[350ms] group-hover:[filter:brightness(0)_saturate(100%)_invert(70%)_sepia(87%)_saturate(2211%)_hue-rotate(353deg)_brightness(101%)_contrast(98%)]"
                />
              </div>
            </div>
            <p
              className="card-title mt-4 text-[20px] md:text-[24px] font-semibold text-[#1a2640] transition-all duration-[350ms] group-hover:text-white"
            >
              Visit in office
            </p>
            <p
              className="card-copy mt-2 text-[16px] text-gray-600 transition-all duration-[350ms] group-hover:text-white"
            >
              West Bengal,Kolkata, India
            </p>
          </div>
          <div
            className="contact-card group bg-white border border-[#1a2848]/60 rounded-2xl lg:rounded-[14px] px-6 lg:px-4 py-7 lg:py-[18px] text-center min-h-[176px] lg:min-h-[154px] flex flex-col justify-center transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[#14244a] hover:bg-[#14244a] hover:shadow-[0_10px_20px_rgba(20,36,74,0.28)]"
          >
            <div
              className="card-icon-wrap w-12 h-12 mx-auto rounded-full bg-[#14244a] flex items-center justify-center transition-all duration-[350ms] group-hover:bg-white"
            >
              <div className="image-wrap">
                <img
                  src={clock}
                  alt="Clock icon"
                  className="w-8 h-8 transition-all duration-[350ms] group-hover:[filter:brightness(0)_saturate(100%)_invert(70%)_sepia(87%)_saturate(2211%)_hue-rotate(353deg)_brightness(101%)_contrast(98%)]"
                />
              </div>
            </div>
            <p
              className="card-title mt-4 text-[20px] md:text-[24px] font-semibold text-[#1a2640] transition-all duration-[350ms] group-hover:text-white"
            >
              Office Hours
            </p>
            <p
              className="card-copy mt-2 text-[16px] text-gray-600 transition-all duration-[350ms] group-hover:text-white"
            >
              Mon to Fri: 9am - 6pm
            </p>
          </div>
          <div
            className="contact-card group bg-white border border-[#1a2848]/60 rounded-2xl lg:rounded-[14px] px-6 lg:px-4 py-7 lg:py-[18px] text-center min-h-[176px] lg:min-h-[154px] flex flex-col justify-center transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[#14244a] hover:bg-[#14244a] hover:shadow-[0_10px_20px_rgba(20,36,74,0.28)]"
          >
            <div
              className="card-icon-wrap w-12 h-12 mx-auto rounded-full bg-[#14244a] flex items-center justify-center transition-all duration-[350ms] group-hover:bg-white"
            >
              <div className="image-wrap">
                <img
                  src={misscall}
                  alt="Phone icon"
                  className="w-8 h-8 transition-all duration-[350ms] group-hover:[filter:brightness(0)_saturate(100%)_invert(70%)_sepia(87%)_saturate(2211%)_hue-rotate(353deg)_brightness(101%)_contrast(98%)]"
                />
              </div>
            </div>
            <p
              className="card-title mt-4 text-[20px] md:text-[24px] font-semibold text-[#1a2640] transition-all duration-[350ms] group-hover:text-white"
            >
              Call Us Now
            </p>
            <p
              className="card-copy mt-2 text-[16px] text-gray-600 transition-all duration-[350ms] group-hover:text-white"
            >
              Get expert help in minutes
            </p>
          </div>
          <div
            className="contact-card group bg-white border border-[#1a2848]/60 rounded-2xl lg:rounded-[14px] px-6 lg:px-4 py-7 lg:py-[18px] text-center min-h-[176px] lg:min-h-[154px] flex flex-col justify-center transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[#14244a] hover:bg-[#14244a] hover:shadow-[0_10px_20px_rgba(20,36,74,0.28)]"
          >
            <div
              className="card-icon-wrap w-12 h-12 mx-auto rounded-full bg-[#14244a] flex items-center justify-center transition-all duration-[350ms] group-hover:bg-white"
            >
              <div className="image-wrap">
                <img
                  src={message}
                  alt="Message icon"
                  className="w-8 h-8 transition-all duration-[350ms] group-hover:[filter:brightness(0)_saturate(100%)_invert(70%)_sepia(87%)_saturate(2211%)_hue-rotate(353deg)_brightness(101%)_contrast(98%)]"
                />
              </div>
            </div>
            <p
              className="card-title mt-4 text-[20px] md:text-[24px] font-semibold text-[#1a2640] transition-all duration-[350ms] group-hover:text-white"
            >
              Send Message
            </p>
            <p
              className="card-copy mt-2 text-[16px] text-gray-600 transition-all duration-[350ms] group-hover:text-white"
            >
              Drop a line......
            </p>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default ContactInfo