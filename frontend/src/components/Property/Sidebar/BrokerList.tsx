import { useEffect, useState } from "react";
import broker1 from "../../../assets/images/properties/chandana.png";
import broker2 from "../../../assets/images/properties/akshay.png";
import broker3 from "../../../assets/images/properties/ankita.png";
import { MoveRight } from "lucide-react";
import { apiService } from "../../../services/api.service";

interface Agent {
  _id: string;
  name: string;
  email: string;
  profilePic?: {
    contentType: string;
    data: any;
  };
  phoneNo?: number;
  locality?: string;
  district?: string;
  city?: string;
}

const BrokerList = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const fallbacks = [broker1, broker2, broker3];
  const experiences = ["15+ Years Of", "10+ Years Of", "17+ Years Of", "12+ Years Of", "8+ Years Of"];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await apiService.users.getAllAgents();
        if (res.data?.success) {
          setAgents(res.data.agents || []);
        }
      } catch (err) {
        console.error("Error fetching brokers list:", err);
      }
    };

    fetchAgents();
  }, []);

  const arrayBufferToBase64 = (arr: number[]): string => {
    let binary = "";
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(arr[i]);
    }
    return btoa(binary);
  };

  const getAvatarSource = (agent: Agent, index: number): string => {
    const profilePic = agent.profilePic;
    if (profilePic) {
      if (typeof profilePic === "string") {
        return profilePic;
      }

      const contentType = profilePic.contentType;
      const imageData = profilePic.data;

      if (imageData && typeof imageData === "object" && "$binary" in imageData) {
        const embeddedBase64 = imageData.$binary?.base64;
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
    return fallbacks[index % fallbacks.length];
  };

  const displayedAgents = agents.length > 0 ? agents.slice(0, 3) : [];

  return (
    <div>
      <div className="bg-[#F0F4F9] rounded-3xl p-6 text-center">
        <h3 className="font-bold text-gray-800 mb-5 text-lg">Broker List</h3>
        <div className="flex justify-center items-center flex-row gap-8 mb-6 flex-wrap">
          {displayedAgents.length === 0 ? (
            <div className="text-sm text-gray-400 py-4 w-full">No brokers listed.</div>
          ) : (
            displayedAgents.map((agent, index) => (
              <div key={agent._id} className="flex flex-col items-center">
                <img
                  src={getAvatarSource(agent, index)}
                  className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover mb-2"
                  alt={agent.name}
                  loading="lazy"
                />
                <span className="text-sm font-semibold text-gray-800 truncate max-w-[80px]">
                  {agent.name}
                </span>
                <span className="text-[10px] font-bold text-orange-400">
                  {experiences[index % experiences.length]}
                  <br />
                  Experience
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center">
          <a
            href="#"
            className="group flex items-center justify-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border-2 border-white hover:border-[#0F172A]"
          >
            <span className="text-sm font-medium whitespace-nowrap">View All</span>

            <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
              <MoveRight className="text-sm transition-transform duration-300 ease-in-out text-slate-900 -rotate-45 group-hover:text-amber-400 group-hover:rotate-0" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrokerList;
