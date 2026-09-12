import {
  Leaf, Bell, Search, MapPin, Clock, Heart, Check, ChevronDown, ChevronRight,
  Package, Bike, Home as HomeIcon, LayoutGrid, ClipboardList, Store, User, Star, Utensils,
  ShieldCheck, Truck, Share2, Sparkles, Info, ShoppingCart, CreditCard, Landmark,
  Upload, Pencil, Mail, Phone, Camera, LogOut, Globe, CircleHelp, Headset, Sprout,
  BadgeCheck, ArrowRight, ArrowLeft, Send, MessageSquare, PhoneCall, PhoneOff, X,
  ChefHat, PackageCheck, Eye, Navigation, DollarSign, TrendingUp, Trash2, Plus, Minus,
  ShoppingBag, Briefcase, RefreshCw, AlertCircle
} from "lucide-react";

export const ICON_SIZE = 20;
export const ICON_SM = 16;

export const IconLeaf = ({ size = ICON_SIZE, className = "" }) => (<Leaf size={size} className={className} />);
export const IconBell = ({ size = ICON_SIZE, className = "" }) => (<Bell size={size} className={className} />);
export const IconSearch = ({ size = ICON_SIZE, className = "" }) => (<Search size={size} className={className} />);
export const IconMapPin = ({ size = ICON_SIZE, className = "" }) => (<MapPin size={size} className={className} />);
export const IconClock = ({ size = ICON_SIZE, className = "" }) => (<Clock size={size} className={className} />);
export const IconHeart = ({ filled, size = ICON_SIZE, className = "" }) => (<Heart size={size} className={className} fill={filled ? "currentColor" : "none"} />);
export const IconCheck = ({ size = ICON_SM, className = "" }) => (<Check size={size} className={className} strokeWidth={3} />);
export const IconChevronDown = ({ size = ICON_SIZE, className = "" }) => (<ChevronDown size={size} className={className} />);
export const IconChevronRight = ({ size = ICON_SIZE, className = "" }) => (<ChevronRight size={size} className={className} />);
export const IconPackage = ({ size = ICON_SIZE, className = "" }) => (<Package size={size} className={className} />);
export const IconBike = ({ size = ICON_SIZE, className = "" }) => (<Bike size={size} className={className} />);
export const IconHome = ({ size = ICON_SIZE, className = "" }) => (<HomeIcon size={size} className={className} />);
export const IconGrid = ({ size = ICON_SIZE, className = "" }) => (<LayoutGrid size={size} className={className} />);
export const IconClipboard = ({ size = ICON_SIZE, className = "" }) => (<ClipboardList size={size} className={className} />);
export const IconStore = ({ size = ICON_SIZE, className = "" }) => (<Store size={size} className={className} />);
export const IconUser = ({ size = ICON_SIZE, className = "" }) => (<User size={size} className={className} />);
export const IconStar = ({ size = ICON_SM, className = "" }) => (<Star size={size} className={className} fill="currentColor" strokeWidth={0} />);
export const IconUtensils = ({ size = ICON_SIZE, className = "" }) => (<Utensils size={size} className={className} />);
export const IconShield = ({ size = ICON_SIZE, className = "" }) => (<ShieldCheck size={size} className={className} />);
export const IconShieldCheck = ({ size = ICON_SIZE, className = "" }) => (<ShieldCheck size={size} className={className} />);
export const IconTruck = ({ size = ICON_SIZE, className = "" }) => (<Truck size={size} className={className} />);
export const IconShare = ({ size = ICON_SIZE, className = "" }) => (<Share2 size={size} className={className} />);
export const IconSparkles = ({ size = ICON_SIZE, className = "" }) => (<Sparkles size={size} className={className} />);
export const IconInfo = ({ size = ICON_SIZE, className = "" }) => (<Info size={size} className={className} />);
export const IconCart = ({ size = ICON_SIZE, className = "" }) => (<ShoppingCart size={size} className={className} />);
export const IconCard = ({ size = ICON_SIZE, className = "" }) => (<CreditCard size={size} className={className} />);
export const IconCreditCard = ({ size = ICON_SIZE, className = "" }) => (<CreditCard size={size} className={className} />);
export const IconBank = ({ size = ICON_SIZE, className = "" }) => (<Landmark size={size} className={className} />);
export const IconUpload = ({ size = ICON_SIZE, className = "" }) => (<Upload size={size} className={className} />);
export const IconEdit = ({ size = ICON_SIZE, className = "" }) => (<Pencil size={size} className={className} />);
export const IconMail = ({ size = ICON_SIZE, className = "" }) => (<Mail size={size} className={className} />);
export const IconPhone = ({ size = ICON_SIZE, className = "" }) => (<Phone size={size} className={className} />);
export const IconCamera = ({ size = ICON_SM, className = "" }) => (<Camera size={size} className={className} />);
export const IconLogout = ({ size = ICON_SIZE, className = "" }) => (<LogOut size={size} className={className} />);
export const IconGlobe = ({ size = ICON_SIZE, className = "" }) => (<Globe size={size} className={className} />);
export const IconHelp = ({ size = ICON_SIZE, className = "" }) => (<CircleHelp size={size} className={className} />);
export const IconHeadset = ({ size = ICON_SIZE, className = "" }) => (<Headset size={size} className={className} />);
export const IconSprout = ({ size = ICON_SIZE, className = "" }) => (<Sprout size={size} className={className} />);
export const IconBadgeCheck = ({ size = ICON_SM, className = "" }) => (<BadgeCheck size={size} className={className} />);
export const IconArrowRight = ({ size = ICON_SIZE, className = "" }) => (<ArrowRight size={size} className={className} />);
export const IconArrowLeft = ({ size = ICON_SIZE, className = "" }) => (<ArrowLeft size={size} className={className} />);
export const IconSend = ({ size = ICON_SIZE, className = "" }) => (<Send size={size} className={className} />);
export const IconMessage = ({ size = ICON_SIZE, className = "" }) => (<MessageSquare size={size} className={className} />);
export const IconPhoneCall = ({ size = ICON_SIZE, className = "" }) => (<PhoneCall size={size} className={className} />);
export const IconPhoneOff = ({ size = ICON_SIZE, className = "" }) => (<PhoneOff size={size} className={className} />);
export const IconX = ({ size = ICON_SIZE, className = "" }) => (<X size={size} className={className} />);
export const IconChefHat = ({ size = ICON_SIZE, className = "" }) => (<ChefHat size={size} className={className} />);
export const IconPackageCheck = ({ size = ICON_SIZE, className = "" }) => (<PackageCheck size={size} className={className} />);
export const IconEye = ({ size = ICON_SIZE, className = "" }) => (<Eye size={size} className={className} />);
export const IconNavigation = ({ size = ICON_SIZE, className = "" }) => (<Navigation size={size} className={className} />);
export const IconDollarSign = ({ size = ICON_SIZE, className = "" }) => (<DollarSign size={size} className={className} />);
export const IconTrendingUp = ({ size = ICON_SIZE, className = "" }) => (<TrendingUp size={size} className={className} />);
export const IconTrash2 = ({ size = ICON_SIZE, className = "" }) => (<Trash2 size={size} className={className} />);
export const IconPlus = ({ size = ICON_SIZE, className = "" }) => (<Plus size={size} className={className} />);
export const IconMinus = ({ size = ICON_SIZE, className = "" }) => (<Minus size={size} className={className} />);
export const IconShoppingBag = ({ size = ICON_SIZE, className = "" }) => (<ShoppingBag size={size} className={className} />);
export const IconBriefcase = ({ size = ICON_SIZE, className = "" }) => (<Briefcase size={size} className={className} />);
export const IconRefresh = ({ size = ICON_SIZE, className = "" }) => (<RefreshCw size={size} className={className} />);
export const IconAlert = ({ size = ICON_SIZE, className = "" }) => (<AlertCircle size={size} className={className} />);

// SDG 12 – Responsible Consumption & Production wheel
export const IconSDG = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <rect x="2" y="2" width="44" height="44" rx="6" fill="#BF8B2E" />
    <circle cx="24" cy="24" r="11" fill="none" stroke="#fff" strokeWidth="2.4" />
    <circle cx="24" cy="24" r="4.5" fill="none" stroke="#fff" strokeWidth="2" />
    <path d="M24 13v-4M24 39v-4M13 24H9M39 24h-4M16.3 16.3l-2.8-2.8M34.5 34.5l-2.8-2.8M31.7 16.3l2.8-2.8M13.5 34.5l2.8-2.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <text x="24" y="44" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="sans-serif">12</text>
  </svg>
);
