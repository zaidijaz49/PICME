import { HiHome, HiChatAlt2, HiUser, HiCreditCard } from "react-icons/hi"; 
 export const photographersData = [
  {
    id: 1,
    name: "Joy Mark",
    category: "Wedding Photographer",
    rating: 4.0,
    reviews: 123,
  },
  {
    id: 2,
    name: "Alex John",
    category: "Wedding Photographer",
    rating: 4.5,
    reviews: 89,
  },
  
];

 export const allCategories = [
  "birthday",
  "wedding",
  "funeral",
  "concert",
  "travel",
];
 export const photographerData = [
  { id: 1, name: "Joy Mark", category: "Wedding", rating: 4.5, reviews: 120 },
];
export const images = [
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
  "https://images.pexels.com/photos/36053909/pexels-photo-36053909.jpeg",
];
export const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "Amazing service! Highly recommend to everyone.",
  },
  {
    id: 2,
    name: "Mark Smith",
    date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "Very good, but could improve the response time.",
  },
  {
    id: 3,
    name: "Sara Lee",
  date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment:
      "Loved it! Will definitely come backved it! Will definitely come backved it! Will definitely come back.",
  },
  {
    id: 4,
    name: "Sara Lee",
 date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment: "Loved it! Will definitely come back.",
  },
  {
    id: 5,
    name: "Sara Lee",
   date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment: "Loved it! Will definitely come back.",
  },
  {
    id: 5,
    name: "Sara Lee",
   date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment: "Loved it! Will definitely come back.",
  },
];
 export const paymentMethods = [
  {
    id: "visa",
    name: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  },
  {
    id: "mastercard",
    name: "MasterCard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
  {
    id: "paypal",
    name: "Paypal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
];


 export const AdminMenu = [
  { path: "/photographerdashboard", label: "Home", icon: HiHome },
  { path: "/photographerdashboard/photographerchat", label: "Chat", icon: HiChatAlt2 },
  { path: "/photographerdashboard/photographerprofile", label: "Profile", icon: HiUser },
  { path: "/photographerdashboard/transaction", label: "Transaction History", icon: HiCreditCard }
];
 export const CustomerMenu = [
  { path: "/customerdashboard", label: "Home", icon: HiHome },
  { path: "/customerdashboard/chat", label: "Chat", icon: HiChatAlt2 },
  { path: "/customerdashboard/profile", label: "Profile", icon: HiUser },
];


export const Bookings = [
 {
    id: 1,
    name: "Sarah Ahmed",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    date: "10 Feb",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]
export const History = [
 {
    id: 1,
    name: "Sarah Ahmed",
    package: "Premium Package",
    price: "30",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]
 export const faqs = [
  {
    question: "Who can list a photographer portfolio?",
    answer:
      "Anyone can apply as a freelancer for the PicME App. A secure verification process confirms identity and determines eligibility for app access.",
  },
  {
    question: "Is PicMe available in U.S?",
    answer:
      "Yes, PicMe is currently available in select U.S. cities and expanding to more locations soon.",
  },
  {
    question: "How can I pay for booking?",
    answer:
      "You can pay securely through the app using major credit cards, debit cards, or other supported payment methods.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations are allowed within the defined time window before the booking. Late cancellations may incur a fee.",
  },
];