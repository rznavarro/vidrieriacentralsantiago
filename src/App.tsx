import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfter } from './components/BeforeAfter';
import { HowWeWork } from './components/HowWeWork';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutUs } from './components/AboutUs';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailView } from './components/ServiceDetailView';
import { MobileBottomBar } from './components/MobileBottomBar';
import { SERVICES } from './data/businessData';
import { ServiceItem } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeNavSection, setActiveNavSection] = useState<string>('inicio');

  // Handle URL pathname routing for /vidrio-templado/, /ventanas-termopanel/, etc.
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (!path) {
        setSelectedService(null);
        return;
      }

      const match = SERVICES.find((s) => s.slug === path);
      if (match) {
        setSelectedService(match);
      } else if (path === 'contacto') {
        setSelectedService(null);
        setTimeout(() => {
          document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setSelectedService(null);
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // IntersectionObserver for scroll reveal on main sections
  useEffect(() => {
    if (selectedService) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      // Don't apply initial hidden classes to Hero so it renders without delay
      if (sec.id !== 'inicio') {
        sec.classList.add('transition-all', 'duration-600', 'ease-out', 'opacity-0', 'translate-y-5');
        observer.observe(sec);
      }
    });

    return () => observer.disconnect();
  }, [selectedService]);

  // Track active section for navbar indicator
  useEffect(() => {
    if (selectedService) return;

    const handleScrollSpy = () => {
      const sections = ['inicio', 'servicios', 'trabajos', 'opiniones', 'nosotros', 'contacto'];
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNavSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [selectedService]);

  // Navigation handler
  const handleNavigate = (sectionId: string) => {
    if (selectedService) {
      setSelectedService(null);
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Open specific service page
  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    window.history.pushState({}, '', `/${service.slug}/`);
  };

  const handleSelectServiceBySlug = (slug: string) => {
    const s = SERVICES.find((item) => item.slug === slug);
    if (s) {
      handleSelectService(s);
    }
  };

  const handleBackToHome = () => {
    setSelectedService(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col text-[#06192f] bg-transparent">
      {/* Sutil capa de grano para aspecto de vidrio arquitectónico */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Header Sticky con Glassmorphism */}
      <Navbar onNavigate={handleNavigate} activeSection={activeNavSection} />

      {/* Main Content: Either Service Subpage or Complete 10-Section Home */}
      <div className="flex-1">
        {selectedService ? (
          <ServiceDetailView
            service={selectedService}
            onBackToHome={handleBackToHome}
            onSelectOtherService={handleSelectService}
          />
        ) : (
          <main>
            {/* 3.2 Portada (Hero) */}
            <Hero />

            {/* 3.3 Servicios */}
            <ServicesSection onSelectService={handleSelectService} />

            {/* 3.4 Antes y Después (Comparador interactivo) */}
            <BeforeAfter />

            {/* 3.5 Cómo trabajamos */}
            <HowWeWork />

            {/* 3.6 Opiniones de Google Maps */}
            <ReviewsSection />

            {/* 3.7 Nosotros */}
            <AboutUs />

            {/* 3.8 Preguntas Frecuentes (Acordeón accesible) */}
            <FaqSection />

            {/* 3.9 Contacto */}
            <ContactSection />
          </main>
        )}
      </div>

      {/* 3.10 Pie de Página */}
      <Footer
        onNavigate={handleNavigate}
        onSelectService={handleSelectServiceBySlug}
      />

      {/* Botón WhatsApp persistente en móvil */}
      <MobileBottomBar />
    </div>
  );
}
