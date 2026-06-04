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

export interface InitialUserState {
  profile: null;
  favouritesPropertyIds: string[];
  loading: boolean;
  error: string | null;
  wishList: PropertyItem[] 
  agent: AgentInterface[]
}