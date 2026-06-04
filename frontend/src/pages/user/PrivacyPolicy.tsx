import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PRIVACY_IMAGE_PATH = "/infinity-horizon/assets/images/privacy";
const privacyImage = (fileName: string) => `${PRIVACY_IMAGE_PATH}/${fileName}`;

type TextBlock = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  afterItemsParagraphs?: string[];
  subsections?: {
    title: string;
    items: string[];
  }[];
  contactDetails?: boolean;
};

const privacyPolicySections: TextBlock[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      'Welcome to Infinity Horizon ("Company", "we", "our", or "us"). We respect your privacy and are committed to protecting the personal information you share with us through our website and related digital platforms. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with our services.',
      "By using our website, you agree to the terms outlined in this Privacy Policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    paragraphs: ["We may collect the following information:"],
    subsections: [
      {
        title: "Personal Information",
        items: [
          "Full Name",
          "Email Address",
          "Mobile Number",
          "Postal Address",
          "Any information submitted through enquiry or contact forms",
        ],
      },
      {
        title: "Property-Related Information",
        items: [
          "Property preferences",
          "Budget requirements",
          "Project interests",
          "Site visit requests",
        ],
      },
      {
        title: "Technical Information",
        items: [
          "IP Address",
          "Browser Type",
          "Device Information",
          "Operating System",
          "Website Usage Data",
        ],
      },
      {
        title: "Marketing Information",
        items: ["Communication preferences", "Feedback, reviews, and survey responses"],
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    paragraphs: ["We use the collected information to:"],
    items: [
      "Respond to enquiries and property-related requests.",
      "Provide information about residential and commercial projects.",
      "Schedule property visits and consultations.",
      "Improve website performance and user experience.",
      "Send project updates, promotional offers, newsletters, and marketing communications.",
      "Comply with legal and regulatory requirements.",
      "Maintain internal records and customer support services.",
    ],
  },
  {
    title: "4. Data Security",
    paragraphs: [
      "Infinity Horizon implements reasonable technical and organizational security measures to protect your personal information against unauthorized access, misuse, disclosure, alteration, or destruction.",
      "While we strive to protect your data, no online transmission or electronic storage system can be guaranteed to be 100% secure.",
    ],
  },
  {
    title: "5. Sharing of Information",
    paragraphs: [
      "We do not sell your personal information.",
      "However, we may share information with:",
    ],
    items: [
      "Authorized business partners and service providers.",
      "Legal, regulatory, or government authorities when required by law.",
      "Marketing and advertising service providers assisting us in promoting our projects.",
    ],
  },
  {
    title: "6. Your Rights",
    paragraphs: ["You may have the right to:"],
    items: [
      "Access your personal information.",
      "Request correction of inaccurate information.",
      "Withdraw consent for marketing communications.",
      "Request deletion of personal data where legally permissible.",
      "Object to certain processing activities.",
    ],
    afterItemsParagraphs: [
      "To exercise these rights, please contact us using the details provided below.",
    ],
  },
  {
    title: "7. Communication Consent",
    paragraphs: [
      "By voluntarily submitting your information through forms, chat services, emails, WhatsApp, or any other communication channel on our website, you expressly authorize Infinity Horizon to contact you regarding our projects, offers, services, and updates through:",
    ],
    items: [
      "Phone Calls",
      "SMS",
      "WhatsApp Messages",
      "Emails",
      "Other communication channels",
    ],
    afterItemsParagraphs: [
      "This authorization applies even if your contact number is registered under DND (Do Not Disturb) services.",
    ],
  },
  {
    title: "8. Cookies Policy",
    paragraphs: [
      "Our website may use cookies and similar technologies to enhance user experience, analyze website traffic, and improve our services.",
      "You can choose to disable cookies through your browser settings. However, certain website features may not function properly if cookies are disabled.",
    ],
  },
  {
    title: "9. Third-Party Services",
    paragraphs: ["Our website may integrate third-party tools such as:"],
    items: [
      "Google Analytics",
      "Google Ads",
      "Meta (Facebook & Instagram) Pixel",
      "CRM Systems",
      "Lead Management Platforms",
    ],
    afterItemsParagraphs: [
      "These third-party providers may collect information according to their respective privacy policies.",
    ],
  },
  {
    title: "10. Changes to This Privacy Policy",
    paragraphs: [
      "Infinity Horizon reserves the right to update this Privacy Policy at any time. Changes will become effective immediately upon posting on the website.",
    ],
  },
  {
    title: "11. Contact Us",
    paragraphs: ["If you have any questions regarding this Privacy Policy, please contact:"],
    contactDetails: true,
  },
];

const termsOfUseSections: TextBlock[] = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using the Infinity Horizon website, you agree to be bound by these Terms of Use and all applicable laws and regulations.",
      "If you do not agree with any part of these terms, please discontinue use of the website.",
    ],
  },
  {
    title: "2. Use of Website",
    paragraphs: [
      "You agree to use the website only for lawful purposes and in a manner that does not violate the rights of others or restrict their use of the website.",
      "You shall not:",
    ],
    items: [
      "Upload malicious software or harmful content.",
      "Attempt unauthorized access to website systems.",
      "Misuse information available on the website.",
    ],
  },
  {
    title: "3. Property Information Disclaimer",
    paragraphs: [
      "All project details, floor plans, images, specifications, amenities, pricing, and availability displayed on the website are for informational purposes only and may be subject to change without prior notice.",
      "Actual project specifications may vary from the representations shown on the website.",
    ],
  },
  {
    title: "4. Intellectual Property Rights",
    paragraphs: ["All website content, including:"],
    items: ["Text", "Images", "Graphics", "Logos", "Videos", "Designs", "Layouts"],
    afterItemsParagraphs: [
      "are the property of Infinity Horizon and are protected by applicable intellectual property laws. Unauthorized use, reproduction, or distribution is strictly prohibited.",
    ],
  },
  {
    title: "5. Third-Party Links",
    paragraphs: [
      "The website may contain links to third-party websites for user convenience.",
      "Infinity Horizon does not control or endorse these websites and is not responsible for their content, privacy practices, or services.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    paragraphs: [
      "Infinity Horizon shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:",
    ],
    items: [
      "Use of the website.",
      "Inability to access the website.",
      "Reliance on website content.",
      "Technical interruptions or errors.",
    ],
  },
  {
    title: "7. Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless Infinity Horizon, its employees, affiliates, partners, and representatives from any claims, damages, liabilities, or expenses resulting from your misuse of the website.",
    ],
  },
  {
    title: "8. Governing Law",
    paragraphs: [
      "These Terms of Use shall be governed by and construed in accordance with the laws of India.",
      "Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal.",
    ],
  },
  {
    title: "9. Modifications to Terms",
    paragraphs: [
      "Infinity Horizon reserves the right to modify these Terms of Use at any time without prior notice.",
      "Continued use of the website after updates constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "10. Contact Information",
    paragraphs: ["For questions regarding these Terms of Use, please contact:"],
    contactDetails: true,
  },
];

const renderTextBlock = (block: TextBlock) => (
  <div key={block.title} className="mb-10">
    <div className="mb-4 text-[24px] font-semibold">{block.title}</div>

    {block.paragraphs?.map((paragraph, index) => (
      <p
        key={paragraph}
        className={`text-[16px] leading-relaxed ${index < (block.paragraphs?.length ?? 0) - 1 || block.items || block.subsections ? "mb-4" : ""}`}
      >
        {paragraph}
      </p>
    ))}

    {block.items && (
      <ul className="mb-6 list-disc space-y-1 pl-5 text-[16px]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}

    {block.afterItemsParagraphs?.map((paragraph) => (
      <p key={paragraph} className="mb-4 text-[16px] leading-relaxed">
        {paragraph}
      </p>
    ))}

    {block.subsections?.map((subsection) => (
      <div key={subsection.title} className="mb-6">
        <div className="mb-3 text-[20px] font-semibold">{subsection.title}</div>
        <ul className="list-disc space-y-1 pl-5 text-[16px]">
          {subsection.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    ))}

    {block.contactDetails && (
      <>
        <p className="mb-2 text-[16px] font-semibold">Infinity Horizon</p>
        <p className="mb-2 text-[16px]">Email: info@infinityhorizon.com</p>
        <p className="mb-2 text-[16px]">Phone: +91 XXXXXXXXXX</p>
        <p className="text-[16px]">Address: Kolkata, West Bengal, India</p>
      </>
    )}
  </div>
);

const PrivacyPolicy = () => {
  const location = useLocation();
  const isTermsPage = location.pathname === "/terms-condition";
  const pageTitle = isTermsPage ? "Terms of Use" : "Privacy Policy";

  useEffect(() => {
    if (!isTermsPage) return;

    window.requestAnimationFrame(() => {
      document.getElementById("terms-of-use")?.scrollIntoView();
    });
  }, [isTermsPage]);

  return (
    <div className="bg-white">
      <Helmet>
        <title>
          {isTermsPage
            ? "Infinity Horizon | Terms & Conditions"
            : "Infinity Horizon | Privacy Policy & Data Protection"}
        </title>
        <meta
          name="description"
          content={
            isTermsPage
              ? "Read the Terms & Conditions of Infinity Horizon to understand the rules, obligations, and policies governing the use of our website."
              : "Read the Infinity Horizon Privacy Policy to learn how we collect, use, store, and protect your personal information."
          }
        />
      </Helmet>
      {/* Hero Banner Section */}
      <section
        className="relative flex h-[50vh] min-h-[400px] w-full flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35)), url(${privacyImage("privacy-bg.png")})`,
        }}
      >
        <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 pt-24 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            {pageTitle}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-white/90 sm:text-sm md:text-base">
            <Link to="/" className="transition hover:text-yellow-400">
              Home
            </Link>
            <span className="text-[10px] sm:text-xs">
              <i className="fa-solid fa-angle-right"></i>
            </span>
            <span className="text-white">{pageTitle}</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="mx-auto max-w-[1320px] px-5 py-10 font-['Inter'] text-[#1E1E1E] md:px-8 lg:px-10">
        {/* Privacy Policy Content Section */}
        <section id="privacy-policy">{privacyPolicySections.map(renderTextBlock)}</section>

        {/* Terms of Use Content Section */}
        <section id="terms-of-use">
          <div className="mb-10 text-[32px] font-bold">Terms of Use</div>
          {termsOfUseSections.map(renderTextBlock)}
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
