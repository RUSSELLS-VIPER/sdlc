export interface BadgeInterface {
  text: string;
  className: string;
}

export interface AgentByIdPropertyCardProps {
  item: {
    id: number;
    category: string;
    title: string;
    imgSrc: string;
    location: string;
    size: string;
    price: string;
    redirectUrl: string;
    badge: BadgeInterface | null;
  };
}