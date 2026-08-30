import { createContext, useContext, useEffect, useState } from "react";
import { businesses as initialBusinesses, initialListings, initialAddresses, initialNotifications } from "../data/demoData";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const STORAGE_KEY = "refood_state_v1";

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) try { return JSON.parse(s).role || "customer"; } catch { return "customer"; }
    return "customer";
  });
  const [currentUser] = useState({ name: "Mercy S.", email: "mercy@example.com", phone: "070 1234 5678", avatar: "Mercy S.", location: "Abuja, Nigeria" });
  const [businessUser] = useState({ id: "business_001", name: "Mama B Kitchen", owner: "Mama B", email: "mama@kitchen.ng" });

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
    if (s) try { return JSON.parse(s).orders || []; } catch { return []; }
    return [];
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

  // navigation
  const [route, setRoute] = useState({ name: "welcome", params: {} });

  const navigate = (name, params = {}) => setRoute({ name, params });

  useEffect(() => {
    const data = { role, listings, businesses, cart, favorites, orders, addresses, notifications, reviews };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [role, listings, businesses, cart, favorites, orders, addresses, notifications, reviews]);

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
      return { listingId: c.listingId, qty: c.qty, price: l.surplusPrice, businessId: l.businessId, name: l.name, image: l.image };
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
      status: "confirmed", // confirmed -> preparing -> on_the_way -> delivered -> completed
      createdAt: now.toISOString(),
      estimatedWindow: fulfillment === "delivery" ? "12:30 PM - 1:00 PM" : "6:00 PM - 8:00 PM",
      businessId: items[0].businessId,
    };
    // deduct quantity
    setListings(prev => prev.map(l => {
      const cartItem = cart.find(c => c.listingId === l.id);
      if (cartItem) {
        const newQty = l.quantity - cartItem.qty;
        return { ...l, quantity: newQty, status: newQty <= 0 ? "sold_out" : l.status };
      }
      return l;
    }));
    setOrders(prev => [order, ...prev]);
    clearCart();
    // notification
    const business = businesses.find(b => b.id === items[0].businessId);
    setNotifications(prev => [{ id: Date.now().toString(), title: "Order confirmed!", body: `Your order ${orderId} from ${business?.name} is confirmed.`, time: "Just now", read: false }, ...prev]);
    return order;
  };

  const advanceOrderStatus = (orderId) => {
    const flowDelivery = ["confirmed", "preparing", "on_the_way", "delivered", "completed"];
    const flowPickup = ["confirmed", "preparing", "ready_for_pickup", "completed"];
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const flow = o.fulfillment === "delivery" ? flowDelivery : flowPickup;
      const idx = flow.indexOf(o.status);
      if (idx === -1 || idx === flow.length - 1) return o;
      const next = flow[idx + 1];
      // add notification
      setTimeout(() => {
        const titles = {
          preparing: "Your food is being prepared 👨‍🍳",
          on_the_way: "Your rider is on the way! 🛵",
          delivered: "Order delivered! Enjoy your meal",
          ready_for_pickup: "Ready for pickup!",
          completed: "Order completed - leave a review ⭐",
        };
        setNotifications(p => [{ id: Date.now().toString() + Math.random(), title: titles[next] || "Order update", body: `Order ${orderId} is now ${next.replaceAll("_", " ")}`, time: "Just now", read: false }, ...p]);
      }, 0);
      return { ...o, status: next };
    }));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
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

  const addReview = (orderId, listingId, rating, comment) => {
    setReviews(prev => [...prev, { id: Date.now().toString(), orderId, listingId, rating, comment, date: new Date().toISOString() }]);
    // optionally update business rating
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, reviewed: true } : o));
  };

  const value = {
    role, setRole, currentUser, businessUser,
    listings, businesses, setListings, setBusinesses,
    cart, favorites, orders, addresses, notifications, reviews,
    route, navigate,
    toggleFavorite, addToCart, updateCartQty, removeFromCart, clearCart,
    createOrder, advanceOrderStatus, updateOrderStatus,
    addListing, updateListing, deleteListing,
    addReview,
    setAddresses, setNotifications,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
