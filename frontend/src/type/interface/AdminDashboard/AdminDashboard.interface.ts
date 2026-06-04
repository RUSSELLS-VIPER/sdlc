 export interface Transaction {
  id: string;
  name: string;
  image: string;
  property: string;
  amount: string;
  status: "Lost" | "Completed" | "Failed";
  date: string;
}

export interface CalendarEvent {
  title: string;
  type: "event" | "meeting";
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  event?: CalendarEvent;
}
 export interface Customer {
  id: string;
  name: string;
  image: string;
  propertyType: string;
  email: string;
  phone: string;
  status: string;
  budget: string;
  registrationDate: string;
}

 export const getStatusColor = (status: string) => {
  switch (status) {
    case "Lost":
      return "bg-[#ff7457]";

    case "Negotiation":
      return "bg-[#e7cde9]";

    case "Site visit":
      return "bg-[#f2c564]";

    default:
      return "bg-[#aab6ff]";
  }
};

