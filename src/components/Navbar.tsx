import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_DATA } from '../data/businessData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Trabajos', id: 'trabajos' },
    { label: 'Opiniones', id: 'opiniones' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const whatsappHref = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=Hola%2C%20quiero%20cotizar%20un%20proyecto`;

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 py-3 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? 'pt-2 pb-2' : 'pt-4 pb-3'
      }`}
      style={{
        animation: 'navFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('inicio')}
          className="text-left flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C80] rounded-lg p-1"
          aria-label="Ir al inicio - Vidriería Central Santiago"
        >
          <Logo />
        </button>

        {/* Center Glass Menu (Desktop) */}
        <nav
          id="desktop-nav-menu"
          className="hidden md:flex items-center gap-1 px-4 py-1.5 vidrio-panel shadow-xs"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-[15px] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C80] ${
                  isActive
                    ? 'text-[#06192f] font-medium bg-white/70 shadow-xs'
                    : 'text-[#5e7082] hover:text-[#06192f] hover:bg-white/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <a
            id="nav-whatsapp-cta-desktop"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-acento px-5 py-2.5 rounded-full text-[15px] font-medium inline-flex items-center gap-2 select-none shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C80]"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Cotizar por WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="p-2.5 rounded-2xl vidrio-panel text-[#06192f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C80] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Vidrio Panel) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden mt-3 max-w-lg mx-auto vidrio-panel p-5 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-[16px] text-[#06192f] font-medium py-2.5 px-4 rounded-xl hover:bg-white/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C80]"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/40 mt-1">
              <a
                id="mobile-drawer-whatsapp-cta"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-acento py-3 px-4 rounded-xl text-[16px] font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
