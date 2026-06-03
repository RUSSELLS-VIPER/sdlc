import { NavLink } from "react-router-dom";
import userMB1 from "../../assets/images/userDashboardImages/userMB1.png";
import userMB2 from "../../assets/images/userDashboardImages/userMB2.png";
import userMB3 from "../../assets/images/userDashboardImages/userMB3.png";
import mapPin from "../../assets/images/userDashboardImages/map-pin.svg";
import userCYA1 from "../../assets/images/userDashboardImages/userCYA1.png";
import userCYA2 from "../../assets/images/userDashboardImages/userCYA2.png";
import userCYA3 from "../../assets/images/userDashboardImages/userCYA3.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const MyBookings = () => {
  type contactFormType = {
    name: string;
    email: string;
    phone: string;
    subject: string;
  };

   const contactSchema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup.string().required("Email is Required").email("Invalid Email"),
    phone: yup.string().required("Phone No is Required"),
    subject: yup.string().required("Subject is Required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<contactFormType>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
    },
  });

  const onSubmit = (data: contactFormType) => {
    console.log(data);
    reset()
  };

  const cardData = [
    {
      id: 1,
      imageSrc: userMB1,
      title: "Pent House",
      location: "Barasat, Chapadali More",
      details: "Sq.FT - 800, \u00A04BHK",
      statusText: "Booked",
    },
    {
      id: 2,
      imageSrc: userMB2,
      title: "Apartment",
      location: "Barasat, Colony More",
      details: "Sq.FT - 1200, \u00A02BHK",
      statusText: "Under Radar",
    },
    {
      id: 3,
      imageSrc: userMB3,
      title: "Pent House",
      location: "Barasat, Chapadali More",
      details: "Sq.FT - 800, \u00A02BHK",
      statusText: "Under Radar",
    },
  ];
  return (
    <>
      {/* section 2 start */}
      <section>
        <div className="w-full mx-auto mb-6 space-y-12">
          {/* Dynamic Cards Container Grid */}
          <div className="flex flex-col gap-6 xl:grid xl:grid-cols-3">
            {cardData.map((card) => (
              <div key={card.id} className="w-full">
                <div className="rounded-2xl overflow-hidden bg-[#F0F4F9] h-full flex flex-col">
                  {/* Responsive Image Height */}
                  <div className="w-full h-48 sm:h-64 md:h-72 rounded-t-2xl overflow-hidden">
                    <img
                      src={card.imageSrc}
                      alt={`userMB${card.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Responsive Padding and Layout Shift */}
                  <div className="pt-4 pb-3 px-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 flex-1">
                    <div className="flex-1 space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                        {card.title}
                      </h3>

                      <div className="flex items-center text-gray-600 gap-2">
                        <img
                          src={mapPin}
                          alt="map-pin"
                          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-700"
                        />
                        <span className="text-sm sm:text-base font-medium tracking-wide">
                          {card.location}
                        </span>
                      </div>

                      <div className="text-gray-700 font-semibold text-sm sm:text-base pt-0.5 tracking-wide">
                        {card.details}
                      </div>
                    </div>

                    {/* Responsive Button sizing & Dynamic Style Assignment */}
                    <div className="flex-shrink-0 w-full sm:w-auto pt-1">
                      <button
                        className={`w-full sm:w-auto text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl transition-colors duration-200 text-sm sm:text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          card.statusText === "Booked"
                            ? "bg-[#43B40A] hover:bg-[#45a612] focus:ring-[#43B40A]"
                            : "bg-[#ffaa16] hover:bg-[#e59813] focus:ring-[#ffaa16]"
                        }`}
                      >
                        {card.statusText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* slides */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative h-64 md:h-[340px] w-full rounded-2xl overflow-hidden shadow-md bg-slate-900">
                {/* Slide 1 */}
                <div className="slide-track-1 absolute inset-0 w-full h-full transition-transform">
                  <img
                    src={userCYA1}
                    alt="userCYA1"
                    className="w-full h-full object-cover object-top brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-start">
                    <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide leading-tight max-w-sm">
                      Get in Touch with Your Agent
                    </h2>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="slide-track-2 absolute inset-0 w-full h-full opacity-0">
                  <img
                    src={userCYA2}
                    alt="userCYA2"
                    className="w-full h-full object-cover object-top brightness-[0.65]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-start">
                    <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide leading-tight max-w-sm">
                      Our Trusted Agents
                    </h2>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="slide-track-3 absolute inset-0 w-full h-full opacity-0">
                  <img
                    src={userCYA3}
                    alt="userCYA3"
                    className="w-full h-full object-cover object-top brightness-[0.65]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-start">
                    <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide leading-tight max-w-sm">
                      Our Efficient Agents
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex">
                <NavLink
                  to="#"
                  className="group flex items-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border border-transparent hover:border-[#0F172A]"
                >
                  Call Your Agent
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                    <i className="fa-solid fa-arrow-right text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"></i>
                  </div>
                </NavLink>
              </div>
            </div>

            {/* form */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-2xl font-serif font-bold text-[#0c1f3f] tracking-wide">
                Contact Us
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                action="#"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name")}
                    className="w-full px-4 py-3 border border-slate-400 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-transparent"
                  />
                  {errors?.name && <p className="text-red-500 text-sm">{errors?.name?.message}</p> }
                </div>
                <div>
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="+91 2345678912"
                    className="w-full px-4 py-3 border border-slate-400 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-transparent"
                  />
                  {errors?.phone && <p className="text-red-500 text-sm">{errors?.phone?.message}</p> }
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="infinityhorizon@gmail.com"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-slate-400 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-transparent"
                  />
                  {errors?.email && <p className="text-red-500 text-sm">{errors?.email?.message}</p> }
                </div>
                <div>
                  <textarea
                    placeholder="Subject"
                    rows={2}
                    {...register("subject")}
                    className="w-full px-4 py-3 border border-slate-400 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-transparent resize-none"
                  ></textarea>
                  {errors?.subject && <p className="text-red-500 text-sm">{errors?.subject?.message}</p> }
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group flex items-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border border-transparent hover:border-[#0F172A]"
                  >
                    <span className="text-sm font-medium whitespace-nowrap">
                      Submit
                    </span>

                    <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                      <i className="fa-solid fa-arrow-right text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"></i>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* recent activity */}
        <div className="mt-4 flex items-center text-sm font-medium text-slate-800">
          <span>Recent Activity :</span>

          <div className="relative h-7 w-56 overflow-hidden">
            <div className="activity-line-1 absolute inset-0 flex items-center px-3 whitespace-nowrap">
              You viewed 2BHK in Newtown
            </div>

            <div className="activity-line-2 absolute inset-0 flex items-center px-3 whitespace-nowrap opacity-0">
              Agent replied to your inquiry
            </div>

            <div className="activity-line-3 absolute inset-0 flex items-center px-3 whitespace-nowrap opacity-0">
              Visit scheduled for Sunday
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyBookings;
