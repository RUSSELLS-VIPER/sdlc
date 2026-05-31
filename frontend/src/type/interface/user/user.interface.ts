import type { PropertyItem } from "../../type/property/property";

export interface InitialUserState {
  profile: null;
  favouritesPropertyIds: string[];
  loading: boolean;
  error: string | null;
  wishList: PropertyItem[] 
}