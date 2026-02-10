
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { SiteProvider, useSite } from './store';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import ServicesPage from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

// Components
const Navbar = () => {
  const { state } = useSite();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-indigo-900">
              {state.settings.siteName}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${location.pathname === link.path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-200 text-sm uppercase tracking-wider`}
              >
                {link.name}
              </Link>
            ))}
            {state.isAdmin ? (
               <Link to="/admin" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">Dashboard</Link>
            ) : (
               <Link to="/admin" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-b border-gray-50 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-indigo-600 bg-indigo-50"
              >
                {state.isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { state } = useSite();
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold tracking-tight">{state.settings.siteName}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bringing the wonders of the world closer to you. Exceptional travel experiences crafted with passion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-widest text-xs text-indigo-400">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-widest text-xs text-indigo-400">Contact Us</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>{state.settings.contactAddress}</li>
              <li>{state.settings.contactPhone}</li>
              <li>{state.settings.contactEmail}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-widest text-xs text-indigo-400">Newsletter</h4>
            <p className="text-slate-400 text-xs mb-4">Subscribe for travel updates and exclusive offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 {state.settings.siteName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSite();
  if (!state.isAdmin) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

const App = () => {
  return (
    <SiteProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/destinations" element={<Layout><Destinations /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          } />
        </Routes>
      </HashRouter>
    </SiteProvider>
  );
};

export default App;
