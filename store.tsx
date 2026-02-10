
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteState, SiteSettings, Destination, BlogPost, Service } from './types';

const INITIAL_SETTINGS: SiteSettings = {
  siteName: "TourWithMe",
  primaryColor: "indigo-600",
  heroTitle: "Explore the World with TourWithMe",
  heroSubtitle: "Your gateway to unforgettable international adventures and luxury travel experiences.",
  heroImage: "https://picsum.photos/id/1015/1920/1080",
  aboutContent: "Founded in 2010, TourWithMe has become a global leader in providing bespoke travel experiences. Our mission is to bridge cultures through immersive and sustainable tourism.",
  contactEmail: "hello@tourwithme.com",
  contactPhone: "+1 (800) 123-4567",
  contactAddress: "123 Travel Avenue, Wanderlust City, WL 54321"
};

const INITIAL_DESTINATIONS: Destination[] = [
  { id: '1', name: 'Santorini, Greece', region: 'Europe', description: 'Breathtaking sunsets and iconic white-washed buildings.', price: 1200, image: 'https://picsum.photos/id/1016/800/600', featured: true },
  { id: '2', name: 'Kyoto, Japan', region: 'Asia', description: 'Serene temples, traditional tea houses, and stunning cherry blossoms.', price: 1500, image: 'https://picsum.photos/id/1018/800/600', featured: true },
  { id: '3', name: 'Bali, Indonesia', region: 'Asia', description: 'Tropical paradise with lush jungles and vibrant culture.', price: 900, image: 'https://picsum.photos/id/1019/800/600', featured: true },
  { id: '4', name: 'Amalfi Coast, Italy', region: 'Europe', description: 'Dramatic cliffs and turquoise waters in the heart of the Mediterranean.', price: 1800, image: 'https://picsum.photos/id/1020/800/600', featured: false },
];

const INITIAL_BLOGS: BlogPost[] = [
  { id: '1', title: 'Top 10 Hidden Gems in Europe', excerpt: 'Discover the lesser-known spots that will make your European trip unforgettable.', content: 'Full article content here...', author: 'Sarah Jenkins', date: '2024-05-20', image: 'https://picsum.photos/id/1021/800/600', category: 'Travel Tips', published: true },
  { id: '2', title: 'How to Pack Like a Pro for a Safari', excerpt: 'Everything you need to know about preparing for your African adventure.', content: 'Full article content here...', author: 'Marcus Thorne', date: '2024-06-12', image: 'https://picsum.photos/id/1022/800/600', category: 'Guides', published: true },
];

const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Tour Packages', description: 'Curated group and private tours worldwide.', icon: 'globe' },
  { id: '2', title: 'Flight Bookings', description: 'Competitive rates for domestic and international flights.', icon: 'plane' },
  { id: '3', title: 'Luxury Hotels', description: 'Exclusive deals at 5-star resorts and boutique hotels.', icon: 'home' },
  { id: '4', title: 'Visa Assistance', description: 'End-to-end support for your travel documentation.', icon: 'file' },
];

interface ContextProps {
  state: SiteState;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  login: () => void;
  logout: () => void;
}

const SiteContext = createContext<ContextProps | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('site_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('site_destinations');
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('site_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('is_admin') === 'true');

  useEffect(() => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    localStorage.setItem('site_destinations', JSON.stringify(destinations));
    localStorage.setItem('site_blogs', JSON.stringify(blogPosts));
    localStorage.setItem('is_admin', isAdmin.toString());
  }, [settings, destinations, blogPosts, isAdmin]);

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const login = () => setIsAdmin(true);
  const logout = () => setIsAdmin(false);

  return (
    <SiteContext.Provider value={{
      state: { settings, destinations, blogPosts, services, isAdmin },
      updateSettings,
      setDestinations,
      setBlogPosts,
      login,
      logout
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within a SiteProvider");
  return context;
};
