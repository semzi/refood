import { createContext, useContext, useEffect, useState } from "react";
import { businesses as initialBusinesses, initialListings, initialAddresses, initialNotifications, initialOrders, initialDriverMessages } from "../data/demoData";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const STORAGE_KEY = "refood_state_v2";

export const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Mercy%20S.&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc";

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/business')) {
      return 'business';
    }
    return "customer";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      try {
        const p = JSON.parse(s);
        if (p.currentUser) {
          if (!p.currentUser.avatar || p.currentUser.avatar.includes("unsplash.com")) {
            return { ...p.currentUser, avatar: DEFAULT_AVATAR };
          }
          return p.currentUser;
        }
      } catch {}
    }
    return {
      name: "Mercy S.",
      email: "mercy@example.com",
      phone: "070 1234 5678",
      avatar: DEFAULT_AVATAR,
      location: "Abuja, Nigeria"
    };
  });
  const [businessUser] = useState({ id: "business_001", name: "Mega Kitchen Lekki", owner: "Mama B", email: "mama@kitchen.ng" });

  const [listings, setListings] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { const p = JSON.parse(s); if (p.listings) return p.listings; } catch {}
    return initialListings;
  });
  const [businesses, setBusinesses] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { const p = JSON.parse(s); if (p.businesses) return p.businesses; } catch {}
    return initialBusinesses;
  });
  const [cart, setCart] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).cart || []; } catch { return []; }
    return [];
  });
  const [favorites, setFavorites] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).favorites || []; } catch { return []; }
    return [];
  });
  const [orders, setOrders] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).orders || initialOrders; } catch { return initialOrders; }
    return initialOrders;
  });
  const [addresses, setAddresses] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).addresses || initialAddresses; } catch { return initialAddresses; }
    return initialAddresses;
  });
  const [notifications, setNotifications] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).notifications || initialNotifications; } catch { return initialNotifications; }
    return initialNotifications;
  });
  const [reviews, setReviews] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).reviews || []; } catch { return []; }
    return [];
  });
  const [driverMessages, setDriverMessages] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).driverMessages || initialDriverMessages; } catch { return initialDriverMessages; }
    return initialDriverMessages;
  });
  const [driverTyping, setDriverTyping] = useState({});

  // navigation with history so every page can go back
  const [route, setRoute] = useState({ name: "home", params: {} });
  const [history, setHistory] = useState([]);

  const goBack = (fallback = "home") => {
    if (history.length === 0) {
      setRoute({ name: fallback, params: {} });
      return;
    }
    const last = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setRoute(last);
  };

  const navigate = (name, params = {}) => {
    // legacy / defensive: navigate(-1) or navigate("back") means go back
    if (name === -1 || name === "back") {
      goBack();
      return;
    }
    // don't push duplicates of the exact same route
    if (route.name === name && JSON.stringify(route.params || {}) === JSON.stringify(params || {})) return;
    setHistory(prev => [...prev.slice(-30), route]);
    setRoute({ name, params });
  };
  const canGoBack = history.length > 0;

  const switchRole = (newRole) => {
    setRole(newRole);
    if (typeof window !== 'undefined') {
      if (newRole === 'business' && !window.location.pathname.startsWith('/business')) {
        window.history.pushState({}, '', '/business');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else if (newRole === 'customer' && window.location.pathname.startsWith('/business')) {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  const updateCurrentUser = (data) => {
    setCurrentUser(prev => ({ ...prev, ...data }));
  };

  useEffect(() => {
    const data = { role, currentUser, listings, businesses, cart, favorites, orders, addresses, notifications, reviews, driverMessages };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [role, currentUser, listings, businesses, cart, favorites, orders, addresses, notifications, reviews, driverMessages]);

  const toggleFavorite = (listingId) => {
    setFavorites(prev => prev.includes(listingId) ? prev.filter(id => id !== listingId) : [...prev, listingId]);
  };

  const addToCart = (listingId, qty = 1) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing || listing.status === "sold_out") return;
    setCart(prev => {
      const exist = prev.find(c => c.listingId === listingId);
      const newQty = exist ? exist.qty + qty : qty;
      if (newQty > listing.quantity) return prev; // prevent over quantity
      if (exist) return prev.map(c => c.listingId === listingId ? { ...c, qty: newQty } : c);
      return [...prev, { listingId, qty }];
    });
  };
  const updateCartQty = (listingId, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(c => c.listingId !== listingId));
    else {
      const listing = listings.find(l => l.id === listingId);
      if (qty > listing.quantity) return;
      setCart(prev => prev.map(c => c.listingId === listingId ? { ...c, qty } : c));
    }
  };
  const removeFromCart = (listingId) => setCart(prev => prev.filter(c => c.listingId !== listingId));
  const clearCart = () => setCart([]);

  const createOrder = ({ fulfillment = "delivery", addressId, paymentMethod = "Card" }) => {
    if (cart.length === 0) return null;
    // validate quantities
    for (const item of cart) {
      const listing = listings.find(l => l.id === item.listingId);
      if (!listing || listing.quantity < item.qty || listing.status === "sold_out") return null;
    }
    const orderId = "RF" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const items = cart.map(c => {
      const l = listings.find(li => li.id === c.listingId);
      return {
        listingId: c.listingId,
        qty: c.qty,
        quantity: c.qty,
        price: l.surplusPrice || l.discountPrice || l.price,
        discountPrice: l.discountPrice || l.surplusPrice,
        businessId: l.businessId,
        title: l.name || l.title,
        name: l.name || l.title,
        image: l.image,
      };
    });
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const deliveryFee = fulfillment === "delivery" ? 500 : 0;
    const serviceFee = 100;
    const total = subtotal + deliveryFee + serviceFee;
    const order = {
      id: orderId,
      items,
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      fulfillment,
      addressId,
      paymentMethod,
      status: "placed", // placed -> preparing -> ready -> delivered
      date: now.toISOString(),
      createdAt: now.toISOString(),
      estimatedWindow: fulfillment === "delivery" ? "12:30 PM - 1:00 PM" : "6:00 PM - 8:00 PM",
      businessId: items[0]?.businessId || "business_001",
      businessName: "Mega Kitchen Lekki",
      deliveryAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
      customerPhone: "070 1234 5678",
      deliveryPin: "4 8 2 9",
    };
    // deduct quantity
    setListings(prev => prev.map(l => {
      const cartItem = cart.find(c => c.listingId === l.id);
      if (cartItem) {
        const newQty = (l.quantity || l.quantityLeft || 5) - cartItem.qty;
        return { ...l, quantity: newQty, quantityLeft: newQty, status: newQty <= 0 ? "sold_out" : l.status };
      }
      return l;
    }));
    setOrders(prev => [order, ...prev]);

    // Setup initial driver greeting for delivery orders
    if (fulfillment === "delivery") {
      const business = businesses.find(b => b.id === items[0]?.businessId);
      setDriverMessages(prev => ({
        ...prev,
        [orderId]: [
          {
            id: "m_init1",
            sender: "driver",
            text: `Hello Mercy! 👋 I have received your order from ${business?.name || "the restaurant"}. I'll update you as soon as I pick it up.`,
            time: "Just now",
            timestamp: Date.now(),
          }
        ]
      }));
    }

    clearCart();
    // notification
    const business = businesses.find(b => b.id === items[0]?.businessId);
    setNotifications(prev => [{ id: Date.now().toString(), title: "Order confirmed!", body: `Your order #${orderId} from ${business?.name || "Mega Kitchen Lekki"} is confirmed.`, time: "Just now", read: false }, ...prev]);
    return order;
  };

  const advanceOrderStatus = (orderId) => {
    const flow = ["placed", "preparing", "ready", "delivered"];
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const idx = flow.indexOf(o.status);
      if (idx === -1 || idx === flow.length - 1) return o;
      const next = flow[idx + 1];
      // add notification
      const titles = {
        preparing: "Your food is being prepared in kitchen 👨‍🍳",
        ready: "Your rider is on the way! 🛵",
        delivered: "Order delivered! Enjoy your meal 😋",
      };
      setNotifications(p => [{
        id: Date.now().toString() + Math.random(),
        title: titles[next] || "Order update",
        body: `Order #${orderId} status updated to: ${next.replaceAll("_", " ")}`,
        time: "Just now",
        read: false
      }, ...p]);
      return { ...o, status: next };
    }));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const titles = {
        placed: "Order Received ✓",
        preparing: "Your food is being prepared 👨‍🍳",
        ready: "Your rider is on the way! 🛵",
        delivered: "Order delivered! Enjoy your meal 😋",
        cancelled: "Order cancelled",
      };
      setNotifications(p => [{
        id: Date.now().toString() + Math.random(),
        title: titles[newStatus] || "Order update",
        body: `Order #${orderId} is now ${newStatus.replaceAll("_", " ")}`,
        time: "Just now",
        read: false
      }, ...p]);
      return { ...o, status: newStatus };
    }));
  };

  const sendDriverMessage = (orderId, text) => {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();
    const userMsg = {
      id: "m_" + Date.now(),
      sender: "user",
      text: cleanText,
      time: "Just now",
      timestamp: Date.now(),
    };
    setDriverMessages(prev => ({
      ...prev,
      [orderId]: [...(prev[orderId] || []), userMsg],
    }));

    // Trigger driver typing indicator
    setDriverTyping(prev => ({ ...prev, [orderId]: true }));

    setTimeout(() => {
      setDriverTyping(prev => ({ ...prev, [orderId]: false }));

      const lower = cleanText.toLowerCase();
      let reply = "Thanks for the message! I am on my way with your order.";
      if (lower.includes("where") || lower.includes("location") || lower.includes("far") || lower.includes("reach") || lower.includes("time") || lower.includes("eta")) {
        reply = "I just turned onto your street, about 3–4 minutes away from your location!";
      } else if (lower.includes("gate") || lower.includes("call") || lower.includes("reach")) {
        reply = "Understood! I'll call your number (070 1234 5678) the moment I arrive at the security gate.";
      } else if (lower.includes("outside") || lower.includes("waiting") || lower.includes("stand")) {
        reply = "Great! Spot me on the red motorcycle with the ReFood thermal bag.";
      } else if (lower.includes("security") || lower.includes("leave") || lower.includes("drop")) {
        reply = "Got it! I will leave it safely with the estate security guard and take a photo.";
      } else if (lower.includes("pepper") || lower.includes("spoon") || lower.includes("cutlery") || lower.includes("sauce")) {
        reply = "The restaurant packed cutlery and sauces securely inside your package!";
      } else if (lower.includes("thank") || lower.includes("okay") || lower.includes("ok") || lower.includes("alright")) {
        reply = "You're most welcome! Enjoy your meal!";
      }

      const driverMsg = {
        id: "m_d_" + Date.now(),
        sender: "driver",
        text: reply,
        time: "Just now",
        timestamp: Date.now(),
      };

      setDriverMessages(prev => ({
        ...prev,
        [orderId]: [...(prev[orderId] || []), driverMsg],
      }));
    }, 1200);
  };

  const addListing = (data) => {
    const newListing = {
      id: "listing_" + Date.now(),
      businessId: role === "business" ? businessUser.id : data.businessId || "business_001",
      status: "active",
      ...data,
    };
    setListings(prev => [newListing, ...prev]);
  };
  const updateListing = (id, data) => setListings(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
  const deleteListing = (id) => setListings(prev => prev.filter(l => l.id !== id));

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addReview = (orderId, listingId, rating, comment) => {
    setReviews(prev => [...prev, { id: Date.now().toString(), orderId, listingId, rating, comment, date: new Date().toISOString() }]);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, reviewed: true } : o));
  };

  const value = {
    role, setRole, switchRole,
    currentUser, user: currentUser,
    setCurrentUser, updateCurrentUser,
    businessUser,
    listings, foods: listings,
    businesses, setListings, setBusinesses,
    cart, favorites, orders, addresses, notifications, reviews,
    driverMessages, driverTyping, sendDriverMessage,
    route, currentRoute: route, navigate, goBack, canGoBack,
    toggleFavorite, addToCart, updateCartQty, removeFromCart, clearCart,
    createOrder, advanceOrderStatus, updateOrderStatus,
    addListing, addFood: addListing,
    updateListing, updateFood: updateListing,
    deleteListing, deleteFood: deleteListing,
    markAllNotificationsRead,
    addReview,
    setAddresses, setNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
