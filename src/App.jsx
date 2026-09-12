import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Common & Customer Components
import { CustomerShell } from './components/customer/CustomerShell';
import { BusinessShell } from './components/business/BusinessShell';

// Customer Pages
import { Home } from './pages/customer/Home';
import { Browse } from './pages/customer/Browse';
import { FoodDetail } from './pages/customer/FoodDetail';
import { BusinessProfile } from './pages/customer/BusinessProfile';
import { Favorites } from './pages/customer/Favorites';
import { Cart } from './pages/customer/Cart';
import { Checkout } from './pages/customer/Checkout';
import { OrderSuccess } from './pages/customer/OrderSuccess';
import { Orders } from './pages/customer/Orders';
import { OrderDetail } from './pages/customer/OrderDetail';
import { TrackOrder } from './pages/customer/TrackOrder';
import { Notifications } from './pages/customer/Notifications';
import { Profile } from './pages/customer/Profile';
import { Addresses } from './pages/customer/Addresses';
import { Welcome } from './pages/customer/Welcome';

// Business Pages
import { BusinessLogin } from './pages/business/BusinessLogin';
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BusinessListings } from './pages/business/BusinessListings';
import { BusinessListingForm } from './pages/business/BusinessListingForm';
import { BusinessOrders } from './pages/business/BusinessOrders';
import { BusinessOrderDetail } from './pages/business/BusinessOrderDetail';

/**
 * Business Routing Layer
 * Supports URL path detection (/business/*) and browser pushState navigation
 */
function BusinessRouter() {
  const [bizRoute, setBizRoute] = useState(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/business/listings')) return { page: 'listings', params: {} };
    if (path.includes('/business/orders')) return { page: 'orders', params: {} };
    if (path.includes('/business/new-listing')) return { page: 'new-listing', params: {} };
    if (path.includes('/business/login')) return { page: 'login', params: {} };
    return { page: 'dashboard', params: {} };
  });

  const navigateBusiness = (page, params = {}) => {
    setBizRoute({ page, params });
    const urlMap = {
      dashboard: '/business',
      listings: '/business/listings',
      'new-listing': '/business/new-listing',
      orders: '/business/orders',
      'order-detail': `/business/orders/${params.orderId || params.id || ''}`,
      login: '/business/login',
    };
    const targetUrl = urlMap[page] || '/business';
    window.history.pushState({ bizPage: page, params }, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.bizPage) {
        setBizRoute({ page: e.state.bizPage, params: e.state.params || {} });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (bizRoute.page === 'login') {
    return <BusinessLogin />;
  }

  const renderBizContent = () => {
    const editId = bizRoute.params?.editId || bizRoute.params?.id;
    const orderId = bizRoute.params?.orderId || bizRoute.params?.id;

    switch (bizRoute.page) {
      case 'dashboard':
        return <BusinessDashboard navigateBusiness={navigateBusiness} />;
      case 'listings':
        return <BusinessListings navigateBusiness={navigateBusiness} />;
      case 'new-listing':
      case 'newListing':
        return <BusinessListingForm editId={editId} navigateBusiness={navigateBusiness} />;
      case 'orders':
        return <BusinessOrders navigateBusiness={navigateBusiness} />;
      case 'order-detail':
      case 'orderDetail':
        return <BusinessOrderDetail orderId={orderId} id={orderId} navigateBusiness={navigateBusiness} />;
      default:
        return <BusinessDashboard navigateBusiness={navigateBusiness} />;
    }
  };

  return (
    <BusinessShell activePage={bizRoute.page} navigateBusiness={navigateBusiness}>
      {renderBizContent()}
    </BusinessShell>
  );
}

/**
 * Customer Routing Layer
 */
function CustomerRouter() {
  const { currentRoute, route } = useApp() || {};
  const activeRoute = currentRoute || route || { name: 'home', params: {} };
  const routeName = activeRoute?.name || 'home';
  const params = activeRoute?.params || {};
  const itemId = params.id || params.orderId || params.foodId || params.businessId;

  const renderContent = () => {
    switch (routeName) {
      case 'home':
        return <Home />;
      case 'browse':
        return <Browse />;
      case 'food-detail':
      case 'foodDetail':
        return <FoodDetail id={itemId} foodId={itemId} />;
      case 'business-profile':
      case 'businessProfile':
        return <BusinessProfile id={itemId} businessId={itemId} />;
      case 'favorites':
      case 'favourites':
        return <Favorites />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'order-success':
      case 'orderSuccess':
        return <OrderSuccess id={itemId} orderId={itemId} />;
      case 'orders':
        return <Orders />;
      case 'order-detail':
      case 'orderDetail':
        return <OrderDetail id={itemId} orderId={itemId} />;
      case 'track':
      case 'trackOrder':
      case 'track-order':
        return <TrackOrder id={itemId} orderId={itemId} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'addresses':
        return <Addresses />;
      default:
        return <Home />;
    }
  };

  if (routeName === 'welcome') {
    return <Welcome />;
  }

  return <CustomerShell>{renderContent()}</CustomerShell>;
}

/**
 * Root Router Component
 * Switches seamlessly between Business Mode and Customer Experience
 */
function AppContent() {
  const { role } = useApp() || {};
  const [path, setPath] = useState(() => typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const handlePop = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const isBusiness = role === 'business' || path.startsWith('/business');

  if (isBusiness) {
    return <BusinessRouter />;
  }

  return <CustomerRouter />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
