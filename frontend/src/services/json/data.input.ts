import img1 from "../../assets/images/image/Rectangle 82.png";
import img2 from "../../assets/images/image/Rectangle 82 (1).png";
import img3 from "../../assets/images/image/Rectangle 82 (2).png";
import feedbackImg from "../../assets/images/image/feedback 1.png";

import {
  Users,
  House,
  CircleCheck,
  Clock3,
  MessageCircleMore,
  CircleHelp,
} from "lucide-react";

export const stats = [
  {
    title: "Total Customer",
    value: "12,4560",
    Icon: Users,
  },
  {
    title: "Listed Properties",
    value: "450",
    Icon: House,
  },
  {
    title: "Closed Deals",
    value: "320",
    Icon: CircleCheck,
  },
  {
    title: "Pending Deals",
    value: "320",
    Icon: Clock3,
  },
  {
    title: "Active Inqueries",
    value: "320",
    Icon: MessageCircleMore,
  },
  {
    title: "Customer Visits",
    value: "320",
    Icon: CircleHelp,
  },
];

export const activeCustomers = [
  {
    image: img1,
    name: "Asit Sengupta",
    location: "Santragachhi, Howrah",
  },
  {
    image: img2,
    name: "Asit Sengupta",
    location: "Santragachhi, Howrah",
  },
  {
    image: img1,
    name: "Asit Sengupta",
    location: "Santragachhi, Howrah",
  },
];

export const feedbackData = {
  image: img3,
  feedbackImage: feedbackImg,
  name: "Rahul Verma",
  rating: 4.6,
  comment: "I was very impressed with the professionalism.",
};

export const regions = [
  {
    region: "Howrah",
    count: 312,
    percentage: 69,
  },
  {
    region: "Tamluk",
    count: 189,
    percentage: 42,
  },
  {
    region: "Barasat",
    count: 212,
    percentage: 47,
  },
  {
    region: "Madhyamgram",
    count: 423,
    percentage: 94,
  },
  {
    region: "Sodepur",
    count: 200,
    percentage: 44,
  },
];

export const customers = [
  {
    id: "CUS 2009",
    image: img1,
    customerName: "Sabuj Bera",
    propertyType: "House",
    email: "sabuj00@gmail.com",
    phone: "5645345670",
    status: "Lost",
    budget: "Rs. 39,7860",
    registrationDate: "Aug 8, 2024",
  },
  {
    id: "CUS 2016",
    image: img1,
    customerName: "Snehas Roy",
    propertyType: "Office Space",
    email: "abs123@gmail.com",
    phone: "9745345670",
    status: "Negotiation",
    budget: "Rs. 78,7668",
    registrationDate: "Aug 9, 2026",
  },
  {
    id: "CUS 2018",
    image: img1,
    customerName: "Suraj Sing",
    propertyType: "Villa",
    email: "suraj34@gmail.com",
    phone: "9445345670",
    status: "Site visit",
    budget: "Rs. 54,7860",
    registrationDate: "Sep 7, 2020",
  },
  {
    id: "CUS 2020",
    image: img2,
    customerName: "Anu Paul",
    propertyType: "Commercial",
    email: "anupaul56@gmail.com",
    phone: "9745775670",
    status: "Inquiry",
    budget: "Rs. 44,7860",
    registrationDate: "Jan 9, 2018",
  },
];