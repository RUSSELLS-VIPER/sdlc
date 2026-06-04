export interface MongoBinaryData {
  $binary: {
    base64: string;
    subType: string;
  };
}

export interface LegacyBufferData {
  type: string;
  data: number[];
}

export interface UserDashboardPropertyCardProps {
  item: {
    _id: { $oid: string } | string;
    title: string;
    description: string;
    price: number;
    address: string;
    bhk?: string;
    sqft?: string;
    apartmentType?: string;
    propertyType?: string;
    projectStatus?: string;
    status?: string;
    image?: string | {
      contentType: string;
      data: MongoBinaryData | number[] | LegacyBufferData;
    };
    createdBy?: string | {
      _id: string;
      name: string;
      email: string;
      role: string;
      profilePic?: {
        contentType: string;
        data: any;
      };
    };
    likes?: string[];
    createdAt?: { $date: string } | string;
    updatedAt?: { $date: string } | string;
  };
}

export interface StatType {
   id: number;
    title: string;
    value: number;
    linkTo: string;
    linkText: string;
    imgSrc: string;
    imgAlt: string;

}

export interface UserDashboardStatCardProps {
  stat: StatType
}

export interface AgentListData{
    id: number;
    name: string;
    location: string;
    visitStatus: string;
    statusColor: string;
    date: string;
    bhk: string;
    downloadLink: string;
}


export interface VisitIndicatorData {
    id: number;
    slideClassName: string;
    imageSrc: string;
    title: string;
    location: string;
    bhk: string;
    agentName: string;
    visitText: string;
}

export interface UserVisitIndicatorCardProps {
  slide: VisitIndicatorData
}

export interface UserAgentListDataProps {
  agent: AgentListData
}

export interface NotificationsData {
    id: string;
    title: string;
    description: string;
    time: string;
    isUnread: boolean;
    iconClass: string;
    iconBgClass: string;
}

export interface UserNotificationProps{
  notification: NotificationsData
}


export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface ProfileFormData {
  name: string;
  email: string;
  phoneNo: string;
  city: string;
  district: string;
  locality: string;
  profilePic?: File | null | undefined
  

}