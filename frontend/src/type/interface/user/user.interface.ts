import type { PropertyItem } from "../../type/property/property";

export interface BufferData {
  type: "Buffer";
  data: number[]; // Array of byte numbers [137, 80, 78...]
}

// Types the profile picture object
export interface ProfilePic {
  contentType: string; // e.g., "image/png"
  data: BufferData;
}


export interface AgentInterface{
  email: string 
  name: string
  city?: string
  districct?: string
  locality?: string
  _id: string
  phoneNo?: string
  profilePic?: ProfilePic
}



  export interface AgentPic {
  contentType: string;
  data: {
    type: string;
    data: number[];
  };
}

export interface AgentProperty {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  apartmentType: string;
  bhk: string;
  sqft: string;
  price: number;
  address: string;
  image: ProfilePic; // Uses same data/contentType binary buffer structure
  status: "Sold" | "Available" | string;
  projectStatus: "Ongoing" | "Completed" | string;
  likes: string[];
  ownerId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  phoneNo: number;
  role: "agent" | string;
  isVerified: boolean;
  locality: string;
  district: string;
  city: string;
  profilePic: ProfilePic;
  createdAt: string;
  updatedAt: string;
  __v: number;
  count?: number;         // Provided when fetched with property aggregation
  properties?: AgentProperty[]; // Provided by agentById fetch route
}

// Updated InitialUserState matching your redux state structure
export interface InitialUserState {
  profile: AgentPic | null; // Replace 'any' with your UserProfile interface if available
  favouritesPropertyIds: string[];
  loading: boolean;
  error: string | null;
  wishList: PropertyItem[];     // Replace 'any' with your PropertyItem interface
  agent: Agent[];      // Array of agents for your slider list
  agentId: {
    agent: Agent;
    properties: AgentProperty[] 
  } | null; // Remapped from 'agentId' for semantic precision
}
