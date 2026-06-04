import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layout/User/Navbar";
import Footer from "../../layout/User/Footer";
import { Helmet } from "react-helmet-async";

const TERMS_BG = "/infinity-horizon/assets/images/terms/terms-bg.png";

const Terms: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Helmet>
				<title>Infinity Horizon | Terms & Conditions</title>
				<meta name="description" content="Read the Terms & Conditions of Infinity Horizon to understand the rules, obligations, and policies governing the use of our website." />
			</Helmet>
			<Navbar />

			<div
				className="relative w-full h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat flex flex-col"
				style={{ backgroundImage: `url(${TERMS_BG})` }}
			>
				<div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
					<h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">Terms & Conditions</h1>
					<div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base font-medium mt-2">
						<Link to="/" className="hover:text-yellow-400 transition">Home</Link>
						<span className="text-[10px] sm:text-xs"><i className="fa-solid fa-angle-right" /></span>
						<span className="text-white">Terms & Conditions</span>
					</div>
				</div>
			</div>

			<main className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-10 py-10 font-['Inter'] text-[#1E1E1E] flex-1">
				<section className="mb-10">
					<p className="text-[16px] mb-4 leading-relaxed">Welcome to the Infinity Horizon website ("Website"). By accessing and using this Website, you agree to comply with and be bound by these Terms & Conditions ("Terms"). If you do not agree with any part of these Terms, please discontinue use of the Website immediately.</p>
					<p className="text-[16px] leading-relaxed">Infinity Horizon ("Company", "We", "Us", or "Our") reserves the right to modify, update, revise, or amend these Terms at any time without prior notice. Any changes will become effective immediately upon posting on the Website. Your continued use of the Website constitutes acceptance of the revised Terms.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">1. Purpose of this Website</h2>
					<p className="text-[16px] mb-4 leading-relaxed">This Website is intended to provide general information regarding Infinity Horizon, its residential and commercial real estate projects, services, amenities, pricing, offers, and related information.</p>
					<p className="text-[16px] leading-relaxed">The content available on this Website is for informational purposes only and does not constitute a legal offer, contract, or commitment of any kind.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">2. Information Relating to Available Properties and Pricing</h2>
					<p className="text-[16px] mb-4 leading-relaxed">All project details, layouts, floor plans, specifications, pricing, payment schedules, offers, amenities, availability, and project timelines displayed on the Website are indicative and subject to change without prior notice.</p>
					<p className="text-[16px] mb-4 leading-relaxed">Infinity Horizon reserves the right to modify, withdraw, or update any information relating to projects at its sole discretion.</p>
					<p className="text-[16px] leading-relaxed">Users are advised to verify all project-related information directly with the Company's authorized representatives before making any purchase decision.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">3. Acceptance of Terms</h2>
					<p className="text-[16px] leading-relaxed">By accessing, browsing, or using this Website, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms & Conditions and all applicable laws and regulation.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">4. Prohibition on Use of Protected Material</h2>
					<p className="text-[16px] mb-4 leading-relaxed">All content available on this Website, including but not limited to:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1 mb-4">
						<li>Text</li>
						<li>Graphics</li>
						<li>Images</li>
						<li>Logos</li>
						<li>Videos</li>
						<li>Designs</li>
						<li>Project Brochures</li>
						<li>Layouts</li>
						<li>Trademarks</li>
						<li>Software</li>
					</ul>
					<p className="text-[16px] mb-4 leading-relaxed">is the exclusive property of Infinity Horizon or its licensors and is protected under applicable intellectual property laws.</p>
					<p className="text-[16px] mb-4 leading-relaxed">No material from this Website may be copied, reproduced, distributed, modified, transmitted, displayed, or used for commercial purposes without prior written consent from Infinity Horizon.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">5. User Conduct</h2>
					<p className="text-[16px] mb-4 leading-relaxed">Users agree not to:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1 mb-4">
						<li>Use the Website for any unlawful purpose.</li>
						<li>Attempt unauthorized access to any part of the Website.</li>
						<li>Upload malicious software, viruses, or harmful content.</li>
						<li>Interfere with the operation or security of the Website.</li>
						<li>Misrepresent identity or provide false information through enquiry forms.</li>
					</ul>
					<p className="text-[16px] leading-relaxed">Any violation may result in termination of access and legal action where applicable.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">6. Accuracy of Information</h2>
					<p className="text-[16px] mb-4 leading-relaxed">While Infinity Horizon strives to ensure the accuracy of information provided on the Website, we do not warrant that all content is complete, accurate, current, or error-free.</p>
					<p className="text-[16px] mb-4 leading-relaxed">Project images, renders, illustrations, and visual representations are artistic impressions and may differ from actual construction or completed developments.</p>
					<p className="text-[16px] leading-relaxed">Infinity Horizon shall not be liable for any decisions made based on information published on the Website.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">7. Indemnity</h2>
					<p className="text-[16px] mb-4 leading-relaxed">You agree to indemnify and hold harmless Infinity Horizon, its directors, employees, affiliates, agents, consultants, and partners from and against any claims, liabilities, damages, losses, costs, or expenses arising from:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1">
						<li>Your use of the Website.</li>
						<li>Violation of these Terms.</li>
						<li>Infringement of any third-party rights.</li>
						<li>Submission of false or misleading information.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">8. Site Security</h2>
					<p className="text-[16px] mb-4 leading-relaxed">Users are prohibited from violating or attempting to violate the security of the Website, including but not limited to:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1 mb-4">
						<li>Unauthorized access to servers or databases.</li>
						<li>Data mining or scraping activities.</li>
						<li>Distribution of malware or harmful software.</li>
						<li>Attempts to disrupt Website functionality.</li>
					</ul>
					<p className="text-[16px] leading-relaxed">Infinity Horizon reserves the right to investigate and pursue legal remedies against any such activities.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">9. Privacy</h2>
					<p className="text-[16px] mb-4 leading-relaxed">Your use of this Website is also governed by our Privacy Policy.</p>
					<p className="text-[16px] leading-relaxed">By using the Website, you consent to the collection, storage, processing, and use of your information as described in the Privacy Policy.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">10. Limitation of Liability</h2>
					<p className="text-[16px] mb-4 leading-relaxed">Infinity Horizon shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1 mb-4">
						<li>Access to or use of the Website.</li>
						<li>Inability to access the Website.</li>
						<li>Technical interruptions, system failures, or delays.</li>
						<li>Reliance on Website content.</li>
					</ul>
					<p className="text-[16px] leading-relaxed">All Website content is provided on an "as is" and "as available" basis.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">11. Governing Law and Jurisdiction</h2>
					<p className="text-[16px] mb-4 leading-relaxed">These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.</p>
					<p className="text-[16px] leading-relaxed">Any disputes arising out of or relating to the use of this Website shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">12. Contact Us</h2>
					<p className="text-[16px] mb-4 leading-relaxed">For any questions, concerns, or requests relating to these Terms & Conditions, please contact:</p>
					<p className="text-[16px] font-semibold mb-2">Infinity Horizon</p>
					<p className="text-[16px] mb-2">Email: info@infinityhorizon.com</p>
					<p className="text-[16px] mb-2">Phone: +28352032032-940</p>
					<p className="text-[16px]">Address: Kolkata, West Bengal, India</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">13. Miscellaneous</h2>
					<p className="text-[16px] mb-4 leading-relaxed">If any provision of these Terms is found to be invalid, unlawful, or unenforceable, the remaining provisions shall remain in full force and effect.</p>
					<p className="text-[16px] mb-4 leading-relaxed">Failure by Infinity Horizon to enforce any provision of these Terms shall not constitute a waiver of such provision or any other rights.</p>
					<p className="text-[16px] leading-relaxed">These Terms constitute the entire agreement between the user and Infinity Horizon concerning the use of this Website.</p>
				</section>

				<section className="mb-10">
					<h2 className="text-[24px] font-semibold mb-4">14. Terms & Conditions for Overriding DND/NDNC</h2>
					<p className="text-[16px] mb-4 leading-relaxed">By submitting your contact information through any form, enquiry section, WhatsApp link, email, phone call request, chatbot, or any other communication channel available on the Website, you expressly authorize Infinity Horizon and its authorized representatives to contact you regarding:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1 mb-4">
						<li>Property information</li>
						<li>Project updates</li>
						<li>Site visit scheduling</li>
						<li>Promotional offers</li>
						<li>Marketing campaigns</li>
						<li>Customer support services</li>
					</ul>
					<p className="text-[16px] mb-4 leading-relaxed">You agree to receive communications through:</p>
					<ul className="list-disc pl-5 text-[16px] space-y-1 mb-4">
						<li>Phone Calls</li>
						<li>SMS</li>
						<li>WhatsApp Messages</li>
						<li>Emails</li>
						<li>Other electronic communication channels</li>
					</ul>
					<p className="text-[16px] mb-4 leading-relaxed">This consent shall override any registration under DND (Do Not Disturb) or NDNC (National Do Not Call Registry) regulations to the extent permitted under applicable law.</p>
					<p className="text-[16px] mb-4 leading-relaxed">You may opt out of marketing communications at any time by contacting Infinity Horizon through the details provided above.</p>
				</section>
			</main>

		</div>
	);
};

export default Terms;
