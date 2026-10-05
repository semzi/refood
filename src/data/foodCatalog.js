// ─────────────────────────────────────────────────────────────
// ReFood editable food catalog
// 👉 EDIT THIS FILE to fix a dish name, description or photo.
// - `name`: shown on the food card, details page, cart & orders
// - `image`: must be a direct image URL (Unsplash links work best)
// - After saving, the app picks it up on reload for NEW visitors.
//   (Existing saved app data refreshes automatically — see STORAGE_KEY.)
// ─────────────────────────────────────────────────────────────

export const FOOD_CATALOG = [
  {
    id: "listing_001",
    businessId: "business_001",
    name: "Party Jollof Rice & Chicken",
    category: "Meals",
    description:
      "Smoky party jollof rice served with grilled chicken and fried plantain. A true Nigerian classic, cooked fresh daily.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80&fit=crop",
    originalPrice: 3500,
    surplusPrice: 1800,
    quantity: 4,
    pickupWindow: "Today, 6:00 PM - 8:00 PM",
    location: "Wuse 2, Abuja • 1.2km",
    delivery: true,
    tags: ["Spicy", "Popular"],
  },
  {
    id: "listing_002",
    businessId: "business_002",
    name: "Suya Peppered Platter",
    category: "Grills",
    description:
      "Well-spiced suya sliced from fresh beef, grilled over open coal with yaji spice. Served with onions and tomatoes.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&fit=crop",
    originalPrice: 2500,
    surplusPrice: 1200,
    quantity: 3,
    pickupWindow: "Today, 5:00 PM - 7:00 PM",
    location: "Garki, Abuja • 2.1km",
    delivery: false,
    tags: ["Grill", "Popular"],
  },
  {
    id: "listing_003",
    businessId: "business_003",
    name: "Pounded Yam Porridge",
    category: "Soups",
    description:
      "Smooth pounded yam served with rich egusi soup loaded with assorted meat, stockfish and ugu leaves.",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80&fit=crop",
    originalPrice: 3000,
    surplusPrice: 1500,
    quantity: 2,
    pickupWindow: "Today, 6:30 PM - 8:30 PM",
    location: "Utako, Abuja • 3.3km",
    delivery: true,
    tags: ["Traditional", "Hearty"],
  },
  {
    id: "listing_004",
    businessId: "business_004",
    name: "Fried Rice & Sausage",
    category: "Meals",
    description:
      "Colourful Nigerian-style fried rice with mixed vegetables, shrimps and grilled sausage. Perfect for one.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80&fit=crop",
    originalPrice: 2800,
    surplusPrice: 1400,
    quantity: 5,
    pickupWindow: "Today, 7:00 PM - 8:00 PM",
    location: "Maitama, Abuja • 4.1km",
    delivery: true,
    tags: ["Meals", "Popular"],
  },
  {
    id: "listing_005",
    businessId: "business_005",
    name: "Meat Pie (Pack of 3)",
    category: "Pastries",
    description:
      "Flaky golden crust filled with seasoned minced meat, potatoes and carrots. Freshly baked this morning.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&fit=crop",
    originalPrice: 1800,
    surplusPrice: 900,
    quantity: 6,
    pickupWindow: "Today, 5:30 PM - 7:30 PM",
    location: "Jabi, Abuja • 2.8km",
    delivery: true,
    tags: ["Bakery", "Snack"],
  },
  {
    id: "listing_006",
    businessId: "business_001",
    name: "Plantain Fritata",
    category: "Meals",
    description:
      "Ripe plantains and seasoned eggs baked with peppers and onions into a golden fritata. Hearty and filling.",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80&fit=crop",
    originalPrice: 1500,
    surplusPrice: 700,
    quantity: 8,
    pickupWindow: "Today, 4:00 PM - 6:00 PM",
    location: "Wuse 2, Abuja • 1.2km",
    delivery: true,
    tags: ["Meals", "Popular"],
  },
  {
    id: "listing_007",
    businessId: "business_002",
    name: "White Moi Moi (2 Wraps)",
    category: "Meals",
    description:
      "Steamed bean pudding made with blended black-eyed peas, peppers and spices. Soft and flavourful.",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80&fit=crop",
    originalPrice: 1200,
    surplusPrice: 600,
    quantity: 10,
    pickupWindow: "Today, 6:00 PM - 8:00 PM",
    location: "Garki, Abuja • 2.8km",
    delivery: false,
    tags: ["Traditional", "Healthy"],
  },
];
