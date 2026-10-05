export const businesses = [
  {
    id: "business_001",
    name: "Mama B Kitchen",
    category: "Nigerian Meals",
    rating: 4.7,
    reviews: 128,
    location: "Wuse 2, Abuja",
    distance: "1.2km",
    description: "Home of authentic Nigerian comfort food. Family recipes passed down for generations.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    verified: true,
    pickup: true,
    delivery: true,
  },
  {
    id: "business_002",
    name: "Bakers' Corner",
    category: "Bakery",
    rating: 4.5,
    reviews: 89,
    location: "Garki, Abuja",
    distance: "2.1km",
    description: "Freshly baked pastries, bread and savory pies every morning.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    verified: true,
    pickup: true,
    delivery: false,
  },
  {
    id: "business_003",
    name: "Grandma's Pot",
    category: "Soups & Swallow",
    rating: 4.9,
    reviews: 210,
    location: "Utako, Abuja",
    distance: "3.3km",
    description: "Traditional soups and swallow made the old-fashioned way. Taste of home.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    verified: true,
    pickup: true,
    delivery: true,
  },
  {
    id: "business_004",
    name: "Healthy Bites",
    category: "Salads & Healthy",
    rating: 4.6,
    reviews: 67,
    location: "Maitama, Abuja",
    distance: "4.1km",
    description: "Fresh salads and healthy bowls for the mindful eater.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    verified: false,
    pickup: true,
    delivery: true,
  },
  {
    id: "business_005",
    name: "Green Bowl Kitchen",
    category: "Continental",
    rating: 4.4,
    reviews: 54,
    location: "Jabi, Abuja",
    distance: "2.8km",
    description: "Continental dishes with a healthy twist.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    verified: true,
    pickup: true,
    delivery: true,
  },
];

import { FOOD_CATALOG } from "./foodCatalog";

// Single source of truth lives in foodCatalog.js — edit names,
// descriptions and photos there. `status` is app state, kept here.
export const initialListings = FOOD_CATALOG.map((item) => ({
  status: "active",
  ...item,
}));

export const categories = ["All", "Meals", "Grills", "Soups", "Pastries", "Snacks"];

export const initialAddresses = [
  { id: "addr_1", label: "Home", address: "12 Example Street, Wuse 2, Abuja, Nigeria", isDefault: true },
  { id: "addr_2", label: "Office", address: "Plot 45, Central Business District, Abuja", isDefault: false },
];

export const initialNotifications = [
  { id: "n1", title: "Welcome to ReFood!", body: "Discover surplus food near you at 50% off.", time: "2h ago", read: false },
  { id: "n2", title: "Order on the way! 🛵", body: "Ahmed Ibrahim is on the way with your order #RF842915 from Mama B Kitchen.", time: "10m ago", read: false },
  { id: "n3", title: "Mama B Kitchen has new surplus!", body: "Party Jollof Rice & Chicken now available.", time: "5h ago", read: false },
];

export const initialOrders = [
  {
    id: "RF842915",
    businessId: "business_001",
    fulfillment: "delivery",
    addressId: "addr_1",
    paymentMethod: "Card VISA •••• 4242",
    status: "on_the_way",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    estimatedWindow: "12:30 PM - 1:00 PM",
    deliveryFee: 500,
    serviceFee: 100,
    subtotal: 1800,
    total: 2400,
    items: [
      {
        listingId: "listing_001",
        name: "Party Jollof Rice & Chicken",
        qty: 1,
        price: 1800,
        businessId: "business_001",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80&fit=crop",
      },
    ],
  },
  {
    id: "RF719234",
    businessId: "business_001",
    fulfillment: "pickup",
    addressId: "addr_1",
    paymentMethod: "Card Mastercard •••• 5512",
    status: "completed",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    estimatedWindow: "6:00 PM - 8:00 PM",
    deliveryFee: 0,
    serviceFee: 100,
    subtotal: 1500,
    total: 1600,
    items: [
      {
        listingId: "listing_003",
        name: "Pounded Yam Porridge",
        qty: 1,
        price: 1500,
        businessId: "business_001",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80&fit=crop",
      },
    ],
  },
];

export const initialDriverMessages = {
  RF842915: [
    {
      id: "m1",
      sender: "driver",
      text: "Hello Mercy! 👋 I have picked up your order from Mama B Kitchen and I am on my way to 12 Example Street, Wuse 2.",
      time: "10 mins ago",
      timestamp: Date.now() - 10 * 60 * 1000,
    },
    {
      id: "m2",
      sender: "driver",
      text: "Estimated arrival is in about 5–10 minutes. Please have your 7-digit code ready!",
      time: "5 mins ago",
      timestamp: Date.now() - 5 * 60 * 1000,
    },
  ],
};
