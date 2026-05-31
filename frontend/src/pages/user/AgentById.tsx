import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import agentByImage from '../../assets/images/agent-images/agent-bg.png';
import agentImage from '../../assets/images/agent-images/agent-1.png';
import image1 from '../../assets/images/agent-images/list-img-1.png';
import image2 from '../../assets/images/agent-images/list-img-2.png';
import image3 from '../../assets/images/agent-images/list-img-3.png';
import image4 from '../../assets/images/agent-images/list-img-1.png';
import AgentByIdPropertyCard from '../../components/agent/AgentByIdPropertyCard';
import review1 from '../../assets/images/agent-images/review-1.png';
import { agentContactschema } from '../../services/validation/agent.valiadtion';
import type { AgentDataType } from '../../type/type/agent/agent.type';



const AgentById = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agentContactschema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
    },
  });

  // Handle submit action and dump data inside the console
  const onSubmit = (data: AgentDataType) => {
    console.log('Form Submitted Details:', data);
    reset()
  };

  const properties = [
    {
      id: 1,
      category: "residential",
      imgSrc: image1,
      title: "Duplex House",
      location: "BT Road",
      size: "9580 sq. ft.",
      price: "₹ 48 Lacs",
      redirectUrl: "#",
      badge: {
        text: "Special Offers",
        className: "bg-[#FCA311]"
      }
    },
    {
      id: 2,
      category: "single-family",
      imgSrc: image2,
      title: "Single Family House",
      location: "Sonarpur",
      size: "4580 sq. ft.",
      price: "₹ 38 Lacs",
      redirectUrl: "#",
      badge: {
        text: "Featured",
        className: "bg-[#1e293b]"
      }
    },
    {
      id: 3,
      category: "apartment",
      imgSrc: image3,
      title: "Luxury Apartment",
      location: "Baruipur",
      size: "1250 sq. ft.",
      price: "₹ 18 Lacs",
      redirectUrl: "#",
      badge: null
    },
    {
      id: 4,
      category: "apartment",
      imgSrc: image4,
      title: "Luxury Apartment",
      location: "Baruipur",
      size: "1250 sq. ft.",
      price: "₹ 18 Lacs",
      redirectUrl: "#",
      badge: null
    }
  ];

  return (
    <>
      <div
        className="relative w-full h-[37vh] min-h-[320px] bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: `url(${agentByImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <section className="px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-[1320px] mx-auto bg-white rounded-3xl relative z-20 -mt-20 md:-mt-32 p-6 md:p-12 mb-16 lg:mb-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              <div className="flex-shrink-0 w-full sm:w-[320px] mx-auto lg:mx-0">
                <img
                  src={agentImage}
                  alt="Jason Malfr"
                  className="w-full h-[320px] object-cover rounded-2xl shadow-sm"
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-yellow-400 flex gap-1 text-sm">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <span className="text-gray-500 text-sm ml-1">1 review</span>
                </div>
                <span className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight">
                  Jason Malfr
                </span>
                <p className="text-gray-500 text-sm mt-1 mb-6">Buying Agent</p>
                <div className="space-y-2 text-sm text-gray-800 break-words">
                  <p>
                    <span className="font-bold text-gray-900">Primary Phone:</span>
                    <a href="tel:3055559999" className="hover:text-blue-600">
                      (305) 555-9999
                    </a>
                  </p>
                  <p>
                    <span className="font-bold text-gray-900 uppercase">Email:</span>
                    <a href="mailto:Michael@Website.Net" className="hover:text-blue-600">
                      Michael@Website.Net
                    </a>
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 lg:gap-6 mt-6 text-gray-800 items-center">
                  <NavLink to="#" className="hover:text-pink-600 transition">
                    <i className="fa-brands fa-instagram text-xl"></i>
                  </NavLink>
                  <NavLink to="#" className="hover:text-green-500 transition">
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </NavLink>
                  <NavLink to="#" className="hover:text-blue-600 transition">
                    <i className="fa-brands fa-facebook-f text-xl"></i>
                  </NavLink>
                  <NavLink to="#" className="hover:text-black transition">
                    <i className="fa-brands fa-x-twitter text-xl"></i>
                  </NavLink>
                  <NavLink to="#" className="hover:text-blue-700 transition">
                    <i className="fa-brands fa-linkedin-in text-xl"></i>
                  </NavLink>
                  <NavLink to="#" className="hover:text-black transition">
                    <i className="fa-brands fa-tiktok text-xl"></i>
                  </NavLink>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-4 mt-8 w-full">
                  <button className="flex-1 sm:flex-none border-2 border-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 rounded-md text-[10px] sm:text-xs font-bold tracking-widest hover:bg-[#facc15] hover:text-[#171E2E] transition uppercase text-center">
                    Email Agent
                  </button>
                  <button className="flex-1 sm:flex-none border-2 border-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 rounded-md text-[10px] sm:text-xs font-bold tracking-widest hover:bg-[#facc15] hover:text-[#171E2E] transition flex items-center justify-center gap-2 uppercase">
                    <i className="fa-brands fa-whatsapp text-green-500 text-base"></i>
                    Whatsapp
                  </button>
                  <button className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 rounded-md text-[10px] sm:text-xs font-bold tracking-widest hover:bg-[#facc15] hover:text-[#171E2E] transition text-center">
                    305 555 9999
                  </button>
                </div>
              </div>
            </div>

            <div className="h-10 lg:h-16 w-full border-b border-gray-100 mb-10 lg:mb-16"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">A Brief Introduction</h2>
                <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed font-medium">
                  Whether It Is Working With A First Time Homebuyer, A Luxury Home Listing Or A Seasoned Investor, Michael Prides Himself On His Unparalleled Service With An Aptitude For Problem Solving – Something Essential For Navigating Clients Through The Challenges Of Today's Real Estate Market. My Focus Is Always On Serving My Clients With Honesty, Integrity And Discretion As A Dependable And Knowledgeable Broker Committed To Exceptional Results.
                </p>
                <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mt-8 lg:mt-10 mb-4">
                  Specialties & Service Areas
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="bg-[#111827] text-white px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-medium">
                    Residential
                  </span>
                  <span className="bg-[#111827] text-white px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-medium">
                    Commercial
                  </span>
                  <span className="bg-[#111827] text-white px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-medium">
                    Nashville
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 mt-10 lg:mt-12">
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900">Experience</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1.5 leading-relaxed">
                      18 Years As Expert Realtor
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900">Realtor Awards</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Best Realtor In Seattle
                      <br />
                      From 2000-2018
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900">Office Hours</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1.5 leading-relaxed">
                      9 AM - 5 PM, Monday -<br />
                      Saturday
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900">MLS Number</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1.5 leading-relaxed">
                      12345 MYID - Until
                      <br />
                      12/12/2025
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900">Languages Spoken</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1.5 leading-relaxed">
                      French, Spanish, English
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-bold text-gray-900">Office Address</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1.5 leading-relaxed">
                      1001 4th Ave, Seattle, WA
                      <br />
                      USA
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Me</h2>
                <div className="space-y-4 sm:space-y-5 text-[12px] sm:text-[13px] text-gray-700 font-medium mb-8 sm:mb-10 break-all sm:break-normal">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <i className="fa-solid fa-phone text-gray-400 text-base sm:text-lg w-5 text-center flex-shrink-0"></i>
                    <p>305 555 9999</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <i className="fa-solid fa-envelope text-gray-400 text-base sm:text-lg w-5 text-center flex-shrink-0"></i>
                    <p>Akshaydutta5454@Gmail.Com</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <i className="fa-solid fa-globe text-gray-400 text-base sm:text-lg w-5 text-center flex-shrink-0"></i>
                    <p>Website.Net</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <i className="fa-brands fa-skype text-gray-400 text-base sm:text-lg w-5 text-center flex-shrink-0"></i>
                    <p>Akshay .Wp</p>
                  </div>
                </div>

                <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          {...register('name')}
                          className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm outline-none focus:border-blue-500 transition"
                        />
                        {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email"
                          {...register('email')}
                          className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm outline-none focus:border-blue-500 transition"
                        />
                        {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone"
                          {...register('phone')}
                          className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm outline-none focus:border-blue-500 transition"
                        />
                        {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Message"
                      {...register('message')}
                      className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-3 text-[13px] sm:text-sm h-24 sm:h-32 resize-none outline-none focus:border-blue-500 transition"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-[11px] mt-0.5">{errors.message.message}</p>}
                  </div>

                  <div className="flex flex-col pt-2">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        {...register('consent')}
                        className="mt-1 flex-shrink-0 cursor-pointer border-gray-300 rounded"
                      />
                      <label
                        htmlFor="consent"
                        className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed cursor-pointer font-medium"
                      >
                        I Consent To My Information To Be Added For Marketing Communications. You May Periodically Receive Email Communications. At Any Time, You May Opt To Unsubscribe. I Will Not Sell Your Information To Any 3rd Party. I Agree To The{" "}
                        <NavLink to="#" className="underline text-gray-700">
                          Privacy Policy.
                        </NavLink>
                      </label>
                    </div>
                    {errors.consent && <p className="text-red-500 text-[11px] mt-1">{errors.consent.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#111827] hover:bg-[#facc15] hover:text-[#171E2E] text-white font-bold text-[11px] sm:text-xs tracking-widest px-6 sm:px-8 py-3 sm:py-3.5 rounded-md uppercase transition duration-200"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 mb-16">
        <div className="container mx-auto max-w-[1320px]">
          <h2 className="text-2xl sm:text-[32px] text-gray-900 mb-4 sm:mb-6 font-serif-heading">
            My Listing
          </h2>

          <div className="bg-white rounded-lg p-1.5 flex flex-col sm:flex-row gap-2 mb-8 sm:mb-10 shadow-sm border border-gray-100 w-full sm:max-w-fit overflow-x-auto hide-scrollbar">
            <div id="filter-container" className="flex sm:flex-wrap gap-2 w-full min-w-max">
              <button
                className="filter-btn bg-[#111827] text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-md text-[13px] sm:text-[15px] font-semibold transition"
                data-filter="all"
              >
                All (4)
              </button>
              <button
                className="filter-btn text-gray-800 hover:bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-[13px] sm:text-[15px] font-semibold transition"
                data-filter="apartment"
              >
                Apartment (1)
              </button>
              <button
                className="filter-btn text-gray-800 hover:bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-[13px] sm:text-[15px] font-semibold transition"
                data-filter="residential"
              >
                Residential (1)
              </button>
              <button
                className="filter-btn text-gray-800 hover:bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-[13px] sm:text-[15px] font-semibold transition"
                data-filter="single-family"
              >
                Single Family Home (1)
              </button>
            </div>
          </div>

          <div id="property-slider" className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 w-full">
            {properties.map((item) => (
              <AgentByIdPropertyCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <NavLink
              to="#"
              className="bg-[#171e2e] text-white px-5 py-4 rounded-lg text-m font-bold hover:bg-[#facc15] hover:text-[#171E2E] shadow hover:shadow-md transition-all duration-200"
            >
              Load More Properties
            </NavLink>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 mb-24">
        <div className="container mx-auto max-w-[1320px]">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-[26px] md:text-[28px] font-semibold text-gray-900 leading-tight">
              Property Reviews
            </h2>

            <div className="flex items-center gap-2 mt-2 md:mt-3 mb-6 md:mb-10">
              <div className="text-[#ffc107] flex gap-1 text-base sm:text-xl md:text-[22px]">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <span className="text-gray-800 text-xs sm:text-[15px] font-medium ml-1">
                1 review
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
              <div className="flex-shrink-0">
                <img
                  src={review1}
                  alt="Reviewer Avatar"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full object-cover bg-gray-200"
                />
              </div>
              <div className="flex-1 sm:pt-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                  <div>
                    <p className="text-gray-900 font-semibold text-[13px] sm:text-[15px]">
                      Posted by admin
                    </p>
                    <p className="text-gray-900 font-bold text-[14px] sm:text-base mt-0.5">
                      Excellent service!
                    </p>
                  </div>
                  <p className="text-gray-800 text-[11px] sm:text-[14px] font-medium mt-1 sm:mt-0">
                    Posted on 7 July 2025
                  </p>
                </div>
                <p className="text-gray-700 text-[12px] sm:text-[14px] md:text-[15px] leading-relaxed mt-2 md:mt-4">
                  I recently had the pleasure of working with Sam Daniels from
                  [Agency Name] in my quest to find the perfect home, and I cannot
                  speak highly enough of his professionalism, expertise, and
                  dedication to his clients. From our initial meeting, it was
                  evident that Sam possesses a profound understanding of the local
                  real estate market. He took the time to listen attentively to my
                  preferences, priorities, and budget constraints, ensuring that
                  he had a clear understanding of my needs before embarking on our
                  house-hunting journey. What truly sets Sam apart is his
                  unwavering commitment to his clients. Throughout the entire
                  process, he was consistently accessible, responsive, and
                  proactive in his communication. Whether it was promptly
                  answering my questions, providing valuable insights into
                  different neighborhoods,or scheduling property viewings at my
                  convenience, Sam's dedication to ensuring my satisfaction was
                  truly remarkable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgentById;