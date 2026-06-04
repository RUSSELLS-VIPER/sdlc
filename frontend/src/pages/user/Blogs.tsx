import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BLOG_IMAGE_PATH = "/infinity-horizon/assets/images/blog-images";
const blogImage = (fileName: string) => `${BLOG_IMAGE_PATH}/${fileName}`;

type BuyerGuideCard = {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
};

type BuyingTip = {
  number: string;
  title: string;
  description: string;
};

type FeaturedBlog = {
  title: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  slug: string;
};

type LatestArticle = FeaturedBlog & {
  description: string;
  hoverImage: string;
  hoverImageAlt: string;
};

const buyerGuideCards: BuyerGuideCard[] = [
  {
    title: "First-Time Buyers",
    description:
      "A comprehensive guide for those entering the property market for the first time. Learn the essentials of home buying.",
    icon: "icon%20(14).png",
    iconAlt: "Home icon",
  },
  {
    title: "Financing Options",
    description:
      "Explore mortgage options, loan types, and financial planning strategies for your property investment.",
    icon: "icon%20(11).png",
    iconAlt: "Dollar icon",
  },
  {
    title: "Property Inspection",
    description:
      "What to look for during property viewings and inspections. A checklist for smart buyers.",
    icon: "icon%20(12).png",
    iconAlt: "Search icon",
  },
  {
    title: "Legal Process",
    description:
      "Understanding contracts, legal requirements, and documentation for property transactions.",
    icon: "icon%20(13).png",
    iconAlt: "Document icon",
  },
];

const buyingTips: BuyingTip[] = [
  {
    number: "01",
    title: "Research the Neighborhood",
    description:
      "Investigate local amenities, schools, transport links, and future development plans before committing.",
  },
  {
    number: "02",
    title: "Get Pre-Approved for a Mortgage",
    description:
      "Know your budget and strengthen your offer by getting mortgage pre-approval before house hunting.",
  },
  {
    number: "03",
    title: "Consider Future Resale Value",
    description:
      "Think about the property's potential appreciation and marketability for future selling opportunities.",
  },
  {
    number: "04",
    title: "Hire a Professional Inspector",
    description:
      "Never skip the home inspection. A professional can identify hidden issues that could cost you thousands.",
  },
];

const featuredHeroBlog = {
  title: "Real Estate Market Forecast 2024: What Buyers Need to Know",
  category: "Market Trends",
  date: "May 05, 2026",
  author: "James Anderson",
  image: "Image%20(15).png",
  imageAlt: "City apartment building",
  slug: "real-estate-market-forecast-2024",
};

const featuredBlogs: FeaturedBlog[] = [
  {
    title: "Top 5 Neighborhood for Property Investment",
    category: "Investment",
    date: "April 30, 2026",
    image: "Image%20(16).png",
    imageAlt: "Property exterior",
    slug: "top-neighborhoods-for-property-investment",
  },
  {
    title: "How to Stage Your Home for a Quick Sale",
    category: "Home Staging",
    date: "April 30, 2026",
    image: "Image%20(18).png",
    imageAlt: "Staged living room",
    slug: "stage-your-home-for-a-quick-sale",
  },
  {
    title: "Understanding Mortgage Rates in 2024",
    category: "Finance",
    date: "April 30, 2026",
    image: "Image%20(20).png",
    imageAlt: "Mortgage calculator",
    slug: "understanding-mortgage-rates-2024",
  },
  {
    title: "Top 5 Neighborhood for Property Investment",
    category: "Buy & Sell Guide",
    date: "April 30, 2026",
    image: "Image%20(17).png",
    imageAlt: "Buy and sell signs",
    slug: "buy-sell-neighborhood-investment",
  },
  {
    title: "How to Stage Your Home for a Quick Sale",
    category: "Local Area insights",
    date: "April 30, 2026",
    image: "Image%20(19).png",
    imageAlt: "House model on documents",
    slug: "local-home-staging-advice",
  },
  {
    title: "Understanding Mortgage Rates in 2024",
    category: "Trending News",
    date: "April 30, 2026",
    image: "Image%20(21).png",
    imageAlt: "Real estate trend chart",
    slug: "mortgage-rate-trending-news",
  },
];

const latestArticles: LatestArticle[] = [
  {
    title: "10 Questions to Ask Before Buying Your First Home",
    category: "Buying Guide",
    date: "April 30, 2026",
    description:
      "Essential questions that every first-time buyer should consider before making their biggest investment.",
    image: "Image%20(22).png",
    imageAlt: "Luxury home with pool",
    hoverImage: "side%20view%20villa.jpg",
    hoverImageAlt: "Luxury home alternate view",
    slug: "questions-before-buying-first-home",
  },
  {
    title: "Renovations That Add the Most Value to Your Property",
    category: "Home Improvement",
    date: "April 30, 2026",
    description:
      "Discover which home improvements offer the best return on investment when selling your home.",
    image: "Image%20(23).png",
    imageAlt: "Home renovation team",
    hoverImage: "villa-key.jpg",
    hoverImageAlt: "Home improvement tools",
    slug: "renovations-that-add-property-value",
  },
  {
    title: "How to Choose the Right Real Estate Agent",
    category: "Expert Tips",
    date: "April 30, 2026",
    description:
      "Key factors to consider when selecting an agent who will best represent your interests.",
    image: "Image%20(24).png",
    imageAlt: "House key with model home",
    hoverImage: "agent.jpg",
    hoverImageAlt: "Real estate agent",
    slug: "choose-the-right-real-estate-agent",
  },
];

const blogDetailsPath = (slug: string) => `/blog?article=${slug}`;

const Blogs = () => {
  return (
    <div className="overflow-hidden bg-white text-neutral-900">
      <Helmet>
        <title>Infinity Horizon | Real Estate Tips & Market Updates</title>
        <meta name="description" content="Discover valuable real estate insights, property tips, and market updates to make smarter investment decisions." />
        <link rel="canonical" href="https://sdlc-6d9t.vercel.app/blog/" />
      </Helmet>
      {/* Hero Banner Section */}
      <section
        className="relative flex h-[50vh] min-h-[400px] w-full flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.45)), url(${blogImage("blog-bg.png")})`,
        }}
      >
        <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 pb-12 pt-24 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            Blogs & Updates
          </h1>
          <p className="mb-4 text-xl text-white drop-shadow-sm sm:text-3xl">
            Turning Properties into Possibilities
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-white/90 sm:text-sm md:text-base">
            <Link to="/" className="transition hover:text-yellow-400">
              Home
            </Link>
            <span className="text-[10px] sm:text-xs">
              <i className="fa-solid fa-angle-right"></i>
            </span>
            <span className="text-white">Blogs</span>
          </div>
        </div>
      </section>

      <main>
        {/* Buyer's Guide Section */}
        <section className="bg-neutral-200 py-16 md:py-20">
          <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-extrabold leading-tight text-[#0F172A] md:text-[42px]">
                Buyer's Guide
              </h2>
              <p className="mt-5 text-2xl font-extrabold tracking-normal text-neutral-900">
                Everything you need to know about purchasing your dream property
              </p>
            </div>

            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {buyerGuideCards.map((card) => (
                <article
                  key={card.title}
                  className="cursor-pointer rounded-lg bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-[#FCA311]">
                    <img
                      className="h-10 w-10 object-contain"
                      src={blogImage(card.icon)}
                      alt={card.iconAlt}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-[#0F172A]">
                    {card.title}
                  </h3>
                  <p className="mt-5 text-[17px] leading-tight text-neutral-800">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Buying Tips Section */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-extrabold text-[#0F172A] md:text-[42px]">
                Smart Buying Tips
              </h2>
              <p className="mt-5 text-2xl font-extrabold">
                We Provide every bit of knowledge you need to make a smart choice
              </p>
            </div>

            <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">
                  Professional insights to help you make informed decisions.
                </h3>

                <div className="mt-8 space-y-7">
                  {buyingTips.map((tip) => (
                    <div
                      key={tip.number}
                      className="grid grid-cols-[3.25rem_1fr] gap-1"
                    >
                      <span className="font-serif text-3xl font-extrabold text-[#FCA311]">
                        {tip.number}
                      </span>
                      <div>
                        <h4 className="text-2xl font-semibold leading-none text-[#0F172A]">
                          {tip.title}
                        </h4>
                        <p className="mt-2 max-w-3xl text-[17px] leading-tight">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <img
                className="h-[460px] w-full rounded-lg object-cover shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
                src={blogImage("Image%20(14).png")}
                alt="Modern home with pool"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Featured Blogs Section */}
        <section className="bg-neutral-200 py-16">
          <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-extrabold text-[#0F172A] md:text-[42px]">
                Featured Blogs
              </h2>
              <p className="mt-5 text-xl font-extrabold md:text-2xl">
                Stay Informed with the latest real estate news and events.
              </p>
            </div>

            <div className="featured-blog-layout mt-10 grid items-stretch gap-8 xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)_minmax(0,1fr)]">
              {/* Left Hero Card */}
              <div className="featured-blog-hero group relative h-full min-h-[380px] w-full cursor-pointer overflow-hidden rounded-lg shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                <img
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={blogImage(featuredHeroBlog.image)}
                  alt={featuredHeroBlog.imageAlt}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0F172A]/55 transition-colors duration-500 group-hover:bg-[#0F172A]/40"></div>
                <div className="relative flex h-full flex-col justify-start p-6 text-white md:p-8">
                  <div className="rounded-xl bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] p-5">
                    <Link
                      to={blogDetailsPath(featuredHeroBlog.slug)}
                      className="block rounded bg-[#FCA311] px-4 py-1 text-center text-base font-medium"
                    >
                      {featuredHeroBlog.category}
                    </Link>
                    <h3 className="mt-5 font-serif text-2xl font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[#FCA311] md:text-3xl">
                      {featuredHeroBlog.title}
                    </h3>
                    <p className="mt-4 flex items-center gap-2 text-base">
                      <CalendarDays className="h-4 w-4" />
                      {featuredHeroBlog.date}
                    </p>
                    <p className="flex items-center gap-2 text-base">
                      <User className="h-4 w-4" />
                      {featuredHeroBlog.author}
                    </p>
                  </div>
                </div>
              </div>

              {[featuredBlogs.slice(0, 3), featuredBlogs.slice(3)].map(
                (column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="featured-blog-list flex flex-col justify-between gap-7"
                  >
                    {column.map((blog) => (
                      <div
                        key={blog.slug}
                        className="featured-blog-card group flex cursor-pointer flex-col gap-4 rounded-lg bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg sm:flex-row"
                      >
                        <img
                          className="featured-blog-thumb h-48 w-full rounded-lg object-cover sm:h-[92px] sm:w-[140px]"
                          src={blogImage(blog.image)}
                          alt={blog.imageAlt}
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[#FCA311]">
                            {blog.category}
                          </p>
                          <h3 className="text-[17px] font-semibold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#FCA311]">
                            {blog.title}
                          </h3>
                          <p className="mt-2 text-sm text-neutral-600">
                            {blog.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-extrabold text-[#0F172A] md:text-[42px]">
                Latest Articles
              </h2>
              <p className="mt-5 text-xl font-extrabold md:text-2xl">
                Stay Informed with the latest real estate articles and news.
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={blogDetailsPath(article.slug)}
                  className="group overflow-hidden rounded-lg bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="h-[260px] w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      src={blogImage(article.image)}
                      alt={article.imageAlt}
                      loading="lazy"
                    />
                    <img
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      src={blogImage(article.hoverImage)}
                      alt={article.hoverImageAlt}
                      loading="lazy"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded bg-[#14213D] px-4 py-2 text-xs text-white">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-[22px] font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-[#FCA311]">
                      {article.title}
                    </h3>
                    <p className="mt-5 text-[17px] leading-tight text-neutral-800">
                      {article.description}
                    </p>
                    <div className="mt-7 text-sm text-neutral-500">
                      <p>{article.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blogs;
