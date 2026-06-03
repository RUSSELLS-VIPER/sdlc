export type Property = {
  id:string | number;
  title: string;
  img: string;
  price: string;
  location: string;
  status: string;
  projectStatus?: string;
  sqft: string;
  bhk: string;
  apartmentType?: string;
  propertyType?: string;
  likesCount?: number;
};

export type PropertyItem = {
    _id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    image: string | undefined;
    status?: string;
    projectStatus?: string;
    sqft?: string;
    bhk?: string;
    apartmentType?: string;
    propertyType?: string;
    likesCount: number;
};

export type PropertyState = {
    loading: boolean;
    error: string | null;
    items: PropertyItem[];
    itemById: PropertyItem | null
};
