import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Info, Code, Calendar, Users, Mail, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with updated icons
  const navItems = [
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Focus Areas', href: '/focus-areas', icon: <Code className="w-4 h-4" /> },
    { name: 'Events', href: '/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Team', href: '/team', icon: <Users className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <motion.nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20 py-2' 
          : 'bg-gradient-to-r from-white/80 via-white/70 to-white/80 backdrop-blur-md py-3 sm:py-4'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-full">
          {/* Logo - responsive sizing */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img 
                src="https://i.imgur.com/Z9AjSJE.png" 
                alt="Logo" 
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-isclub-teal/20 to-isclub-cyan/20 rounded-full blur-md"></div>
            </motion.div>
            <div className="flex items-center">
              <span className="font-mono text-isclub-teal font-bold text-lg sm:text-xl lg:text-2xl">IS</span>
              <span className="font-mono font-medium text-lg sm:text-xl lg:text-2xl text-isclub-dark">Club</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="group flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 text-sm lg:text-base font-medium text-isclub-gray hover:text-isclub-teal transition-all duration-300 rounded-lg hover:bg-isclub-teal/5 relative overflow-hidden"
                >
                  <motion.span
                    className="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-isclub-teal/10 to-isclub-cyan/10 group-hover:from-isclub-teal/20 group-hover:to-isclub-cyan/20 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="relative hidden xl:inline">
                    {item.name}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-isclub-teal to-isclub-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-isclub-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            
            <motion.button
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-isclub-teal/10 to-isclub-cyan/10 hover:from-isclub-teal/20 hover:to-isclub-cyan/20 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-isclub-gray" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-isclub-gray" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - responsive layout with Register option */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-xl overflow-hidden"
          >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-3 sm:p-4 text-base font-medium text-isclub-gray hover:text-isclub-teal transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-isclub-teal/5 hover:to-isclub-cyan/5 group"
                  >
                    <motion.span
                      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-isclub-teal/10 to-isclub-cyan/10 group-hover:from-isclub-teal/20 group-hover:to-isclub-cyan/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
