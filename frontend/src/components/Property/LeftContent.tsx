import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import agentprofile from "../../assets/images/property_details/michael.png";
import { apiService } from '../../services/api.service';
import { getErrorMessage } from '../../services/helper/global.helper';
import { useAppSeletor } from '../../services/helper/reduxstore';

const LeftContent: React.FC = () => {
  const { id: propertyId } = useParams<{ id: string }>();
  const { itemById } = useAppSeletor((state) => state.property);
  const agent = itemById?.createdBy;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phoneNo: '',
    messageText: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const arrayBufferToBase64 = (arr: number[]): string => {
    let binary = "";
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(arr[i]);
    }
    return btoa(binary);
  };

  const getAvatarSource = (): string => {
    const profilePic = agent?.profilePic;
    if (profilePic) {
      if (typeof profilePic === "string") {
        return profilePic;
      }

      const contentType = profilePic.contentType;
      const imageData = profilePic.data;

      if (imageData && typeof imageData === "object" && "$binary" in imageData) {
        const embeddedBase64 = (imageData as any).$binary?.base64;
        if (embeddedBase64) {
          return `data:${contentType};base64,${embeddedBase64}`;
        }
      } else if (
        imageData &&
        typeof imageData === "object" &&
        "type" in imageData &&
        imageData.type === "Buffer" &&
        Array.isArray(imageData.data)
      ) {
        try {
          const base64String = arrayBufferToBase64(imageData.data);
          return `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing buffer-shaped profile picture:", error);
        }
      } else if (Array.isArray(imageData)) {
        try {
          const base64String = arrayBufferToBase64(imageData);
          return `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing profile picture buffer:", error);
        }
      }
    }
    return agentprofile;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!propertyId) {
      toast.error('Property id is missing');
      return;
    }

    if (!localStorage.getItem('token')) {
      toast.error('Please login first to contact the agent');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiService.client.submitPropertyInquiry(propertyId, {
        name: formState.name,
        email: formState.email,
        phoneNo: formState.phoneNo,
        messageText: formState.messageText,
      });

      toast.success(response.data?.message || 'Inquiry submitted successfully');
      setFormState({
        name: '',
        email: '',
        phoneNo: '',
        messageText: '',
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // flex-col এবং gap-6 দিয়ে দুটি কার্ডকে একসাথে বাইন্ড রাখা হয়েছে
    <div className="flex flex-col gap-6"> 
      
      {/* ১ম কার্ড: Contact Agent & View Listing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-4 mb-5">
          <img
            src={getAvatarSource()}
            alt="Agent Profile"
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {agent?.name || "Michael Rutter"}
            </h3>
            <p className="text-sm text-gray-500">
              {agent?.role
                ? agent.role.charAt(0).toUpperCase() + agent.role.slice(1)
                : "Buying Agent"}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="bg-[#171e2e] text-white px-5 py-4 rounded-lg font-semibold text-sm hover:bg-[#facc15] hover:text-[#171E2E] shadow hover:shadow-md transition-all duration-200 w-full flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-phone-volume"></i>
          Contact Agent & View Listing
        </button>
      </div>

      {/* ২য় কার্ড: Contact Property Owner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">
          Contact Property Owner
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phoneNo"
              value={formState.phoneNo}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <div>
            <textarea
              name="messageText"
              value={formState.messageText}
              onChange={handleInputChange}
              placeholder="Message"
              rows={4}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#171e2e] text-white px-5 py-4 rounded-lg font-semibold text-sm hover:bg-[#facc15] hover:text-[#171E2E] shadow hover:shadow-md transition-all duration-200 w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default LeftContent;
