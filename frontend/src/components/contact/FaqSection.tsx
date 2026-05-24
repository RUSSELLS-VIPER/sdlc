import { NavLink } from 'react-router-dom'
import { Plus } from "lucide-react";
import  faqillustrate from "../../assets/images/contacts-images/Frame 575.png"

const FaqSection = () => {
    return (
        <section
            id="faq"
            className="bg-[#edf1f7] py-16 md:py-24 max-md:pt-12 max-md:pb-[52px] lg:py-[66px]"
        >
            <div className="max-w-[1320px] lg:max-w-[984px] mx-auto px-4 md:px-6">
                <div
                    className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-12 max-md:gap-[34px] lg:gap-[72px] items-start"
                >
                    <div className="faq-intro max-md:text-center">
                        <p
                            className="text-[20px] max-md:text-xs lg:text-[10px] font-semibold uppercase tracking-wide lg:tracking-normal text-[#1b2846] max-md:leading-[1.2] lg:leading-none"
                        >
                            Frequently Asked Questions
                        </p>

                        <p
                            className="font-playfair text-[#17294b] text-[30px] sm:text-[38px] md:text-[48px] lg:text-[36px] leading-[1.1] uppercase mt-4 lg:mt-[22px] lg:max-w-[420px]"
                        >
                            Frequently Asked Questions
                        </p>

                        <div
                            className="image-wrap w-full max-w-[360px] max-md:max-w-[238px] lg:max-w-[250px] mt-10 max-md:mt-7 lg:mt-9 mx-auto"
                        >
                            <img
                                src={faqillustrate}
                                alt="FAQ illustration"
                                className="w-full object-contain"
                            />
                        </div>

                        <div className="text-center">
                            <p
                                className="font-playfair text-[#1e2a44] text-[26px] max-md:text-2xl md:text-[34px] lg:text-lg mt-6 max-md:mt-[22px] lg:mt-5 lg:leading-none"
                            >
                                Any questions?
                            </p>
                            <p
                                className="text-[#2f3a51] text-[16px] max-md:text-sm md:text-[24px] lg:text-[10px] mt-2 leading-normal max-md:leading-[1.35] lg:leading-[1.3]"
                            >
                                You can ask anything you want to know about us.
                            </p>
                        </div>

                        <div
                            className="mt-12 max-md:mt-7 lg:mt-[38px] max-w-[520px] lg:max-w-[360px] mx-auto lg:mx-0"
                        >
                            <label
                                className="font-playfair text-[16px] max-md:text-sm md:text-[24px] lg:text-[10px] text-[#25314a] block mb-3 lg:mb-2.5 max-md:text-left"
                            >
                                Let me know
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="faq-search-input"
                                    placeholder="Enter here"
                                    className="w-full h-[54px] max-md:h-12 md:h-[66px] lg:h-[34px] rounded-[10px] lg:rounded-md border border-[#1a2848] bg-transparent pl-5 lg:pl-[14px] pr-14 lg:pr-11 text-[18px] max-md:text-sm md:text-[32px] lg:text-[10px] text-[#40506d] font-[inherit] outline-none transition-colors duration-300 focus:bg-white"
                                />
                                <NavLink
                                    to="/faq"
                                   
                                    aria-label="Clear input"
                                    className="absolute right-4 lg:right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 max-md:w-7 max-md:h-7 lg:w-[18px] lg:h-[18px] rounded-full border border-[#1a2848] text-[#1a2848] flex items-center justify-center text-[14px] lg:text-[8px] hover:bg-[#1a2848] hover:text-white transition-colors duration-300"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div
                        className="space-y-6 max-md:space-y-3 lg:space-y-[16px] lg:pt-[86px]"
                    >
                        <div
                            className="faq-item border border-[#c4cad5] rounded-[14px] max-md:rounded-xl lg:rounded-[10px] bg-[#eef1f6] px-5 py-4 max-md:px-[14px] max-md:py-[13px] lg:px-[14px] lg:py-2"
                        >
                            <NavLink to="/faq" className="faq-toggle block w-full">
                                <div
                                    className="flex items-center justify-between text-left gap-6 max-md:gap-3 lg:gap-[14px]"
                                >
                                    <span
                                        className="faq-question transition-colors duration-300 font-playfair text-[20px] max-md:text-base md:text-[22px] lg:text-xs leading-tight max-md:leading-[1.25] lg:leading-[1.2] text-[#1e2a44]"
                                    >
                                        When is the right time to sell my house?
                                    </span>
                                    <span
                                        className="faq-icon flex-none text-[24px] max-md:text-[22px] lg:text-base leading-none text-[#1f2a42]"
                                    ><Plus size={14} /></span>
                                    
                                </div>
                            </NavLink>
                            <div className="faq-content-wrapper">
                                <div>
                                    <p
                                        className="faq-answer pt-3 text-[14px] md:text-[18px] lg:text-[11px] leading-[1.4] text-[#3f4a60]"
                                    >
                                        The right time to sell your house is when market conditions
                                        favor sellers-typically when demand is high and inventory is
                                        low. It also depends on your personal readiness, such as
                                        financial goals and relocation plans.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="faq-item border border-[#c4cad5] rounded-[14px] max-md:rounded-xl lg:rounded-[10px] bg-[#eef1f6] px-5 py-4 max-md:px-[14px] max-md:py-[13px] lg:px-[14px] lg:py-2"
                        >
                            <NavLink to="/faq" className="faq-toggle block w-full">
                                <div
                                    className="flex items-center justify-between text-left gap-6 max-md:gap-3 lg:gap-[14px]"
                                >
                                    <span
                                        className="faq-question transition-colors duration-300 font-playfair text-[20px] max-md:text-base md:text-[22px] lg:text-xs leading-tight max-md:leading-[1.25] lg:leading-[1.2] text-[#1e2a44]"
                                    >
                                        What is the process of buying a home?
                                    </span>
                                    <span
                                        className="faq-icon flex-none text-[24px] max-md:text-[22px] lg:text-base leading-none text-[#1f2a42]"
                                    ><Plus size={14} /></span>
                                    
                                </div>
                            </NavLink>
                            <div className="faq-content-wrapper">
                                <div>
                                    <p
                                        className="faq-answer pt-3 text-[14px] md:text-[18px] lg:text-[11px] leading-[1.4] text-[#3f4a60]"
                                    >
                                        The process usually starts with determining your budget and
                                        getting pre-approved for a mortgage. After that, you search
                                        for homes, make an offer, complete an inspection, and
                                        finally close the deal.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="faq-item border border-[#c4cad5] rounded-[14px] max-md:rounded-xl lg:rounded-[10px] bg-[#eef1f6] px-5 py-4 max-md:px-[14px] max-md:py-[13px] lg:px-[14px] lg:py-2"
                        >
                            <NavLink to="/faq" className="faq-toggle block w-full">
                                <div
                                    className="flex items-center justify-between text-left gap-6 max-md:gap-3 lg:gap-[14px]"
                                >
                                    <span
                                        className="faq-question transition-colors duration-300 font-playfair text-[20px] max-md:text-base md:text-[22px] lg:text-xs leading-tight max-md:leading-[1.25] lg:leading-[1.2] text-[#1e2a44]"
                                    >
                                        How much do I need for a down payment?
                                    </span>
                                    <span
                                        className="faq-icon flex-none text-[24px] max-md:text-[22px] lg:text-base leading-none text-[#1f2a42]"
                                    ><Plus size={14} /></span>
                                    
                                </div>
                            </NavLink>
                            <div className="faq-content-wrapper">
                                <div>
                                    <p
                                        className="faq-answer pt-3 text-[14px] md:text-[18px] lg:text-[11px] leading-[1.4] text-[#3f4a60]"
                                    >
                                        Down payments usually range from 3% to 20% based on your
                                        loan type and eligibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="faq-item border border-[#c4cad5] rounded-[14px] max-md:rounded-xl lg:rounded-[10px] bg-[#eef1f6] px-5 py-4 max-md:px-[14px] max-md:py-[13px] lg:px-[14px] lg:py-2"
                        >
                            <NavLink to="/faq" className="faq-toggle block w-full">
                                <div
                                    className="flex items-center justify-between text-left gap-6 max-md:gap-3 lg:gap-[14px]"
                                >
                                    <span
                                        className="faq-question transition-colors duration-300 font-playfair text-[20px] max-md:text-base md:text-[22px] lg:text-xs leading-tight max-md:leading-[1.25] lg:leading-[1.2] text-[#1e2a44]"
                                    >
                                        How do I know how much house I can afford?
                                    </span>
                                    <span
                                        className="faq-icon flex-none text-[24px] max-md:text-[22px] lg:text-base leading-none text-[#1f2a42]"
                                    ><Plus size={14} /></span>
                                    
                                </div>
                            </NavLink>
                            <div className="faq-content-wrapper">
                                <div>
                                    <p
                                        className="faq-answer pt-3 text-[14px] md:text-[18px] lg:text-[11px] leading-[1.4] text-[#3f4a60]"
                                    >
                                        Use your monthly income, liabilities, and lender
                                        pre-approval to set a safe budget range.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="faq-item border border-[#c4cad5] rounded-[14px] max-md:rounded-xl lg:rounded-[10px] bg-[#eef1f6] px-5 py-4 max-md:px-[14px] max-md:py-[13px] lg:px-[14px] lg:py-2"
                        >
                            <a href="#" className="faq-toggle block w-full">
                                <div
                                    className="flex items-center justify-between text-left gap-6 max-md:gap-3 lg:gap-[14px]"
                                >
                                    <span
                                        className="faq-question transition-colors duration-300 font-playfair text-[20px] max-md:text-base md:text-[22px] lg:text-xs leading-tight max-md:leading-[1.25] lg:leading-[1.2] text-[#1e2a44]"
                                    >
                                        What is a pre-approval, and why is it important?
                                    </span>
                                    <span
                                        className="faq-icon flex-none text-[24px] max-md:text-[22px] lg:text-base leading-none text-[#1f2a42]"
                                    ><Plus size={14} /></span>
                                    
                                </div>
                            </a>
                            <div className="faq-content-wrapper">
                                <div>
                                    <p
                                        className="faq-answer pt-3 text-[14px] md:text-[18px] lg:text-[11px] leading-[1.4] text-[#3f4a60]"
                                    >
                                        Pre-approval confirms your loan eligibility and strengthens
                                        your offer while buying.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="faq-item border border-[#c4cad5] rounded-[14px] max-md:rounded-xl lg:rounded-[10px] bg-[#eef1f6] px-5 py-4 max-md:px-[14px] max-md:py-[13px] lg:px-[14px] lg:py-2"
                        >
                            <NavLink to="/faq" className="faq-toggle block w-full">
                                <div
                                    className="flex items-center justify-between text-left gap-6 max-md:gap-3 lg:gap-[14px]"
                                >
                                    <span
                                        className="faq-question transition-colors duration-300 font-playfair text-[20px] max-md:text-base md:text-[22px] lg:text-xs leading-tight max-md:leading-[1.25] lg:leading-[1.2] text-[#1e2a44]"
                                    >
                                        Should I buy or rent a home?
                                    </span>
                                    <span
                                        className="faq-icon flex-none text-[24px] max-md:text-[22px] lg:text-base leading-none text-[#1f2a42]"
                                    ><Plus size={14} /></span>
                                    
                                </div>
                            </NavLink>
                            <div className="faq-content-wrapper">
                                <div>
                                    <p
                                        className="faq-answer pt-3 text-[14px] md:text-[18px] lg:text-[11px] leading-[1.4] text-[#3f4a60]"
                                    >
                                        Buying helps build long-term equity; renting offers
                                        flexibility depending on your goals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqSection