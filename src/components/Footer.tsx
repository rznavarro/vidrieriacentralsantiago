import React from 'react';
import { Logo } from './Logo';
import { BUSINESS_DATA, SERVICES } from '../data/businessData';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectService?: (serviceSlug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectService }) => {
  return (
    <footer
      id="site-footer"
      className="mt-16 border-t border-white/50 bg-white/20 backdrop-blur-md pt-12 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 text-[#5e7082]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/40">
        {/* Brand & Summary */}
        <div className="lg:col-span-4 space-y-4">
          <Logo />
          <p className="text-[15px] leading-relaxed pt-2">
            Vidriería tradicional en Santiago Centro con más de 60 años de oficio.
            Fabricación e instalación de vidrio templado, ventanas termopanel y
            ventanas de aluminio con garantía en cada trabajo.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 text-[13px] text-[#06192f] border border-white/60">
            <span className="text-amber-500 font-bold">4,4 ★</span>
            <span>60 reseñas en Google Maps</span>
          </div>
        </div>

        {/* Enlaces Rápidos */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-[15px] font-semibold text-[#06192f] uppercase tracking-wider">
            Navegación
          </h4>
          <ul className="space-y-2 text-[15px]">
            {['inicio', 'servicios', 'trabajos', 'opiniones', 'nosotros', 'contacto'].map((sec) => (
              <li key={sec}>
                <button
                  type="button"
                  onClick={() => onNavigate(sec)}
                  className="hover:text-[#0E8C80] transition-colors cursor-pointer capitalize focus:outline-none"
                >
                  {sec === 'faq' ? 'Preguntas' : sec}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Servicios */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-[15px] font-semibold text-[#06192f] uppercase tracking-wider">
            Servicios
          </h4>
          <ul className="space-y-2 text-[15px]">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelectService ? onSelectService(s.slug) : onNavigate('servicios')}
                  className="text-left hover:text-[#0E8C80] transition-colors cursor-pointer"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Datos Reales */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-[15px] font-semibold text-[#06192f] uppercase tracking-wider">
            Atención
          </h4>
          <ul className="space-y-2.5 text-[14.5px]">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#0E8C80] mt-0.5 flex-shrink-0" />
              <span>{BUSINESS_DATA.address}, {BUSINESS_DATA.commune}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#0E8C80] mt-0.5 flex-shrink-0" />
              <div>
                <a
                  href={`tel:${BUSINESS_DATA.mobilePhone.replace(/\s+/g, '')}`}
                  className="hover:text-[#06192f] block"
                >
                  {BUSINESS_DATA.mobilePhone}
                </a>
                <a
                  href={`tel:${BUSINESS_DATA.landlinePhone.replace(/\s+/g, '')}`}
                  className="hover:text-[#06192f] block text-[13.5px]"
                >
                  {BUSINESS_DATA.landlinePhone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#0E8C80] mt-0.5 flex-shrink-0" />
              <a
                href={`mailto:${BUSINESS_DATA.email}`}
                className="hover:text-[#06192f] break-all"
              >
                {BUSINESS_DATA.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#0E8C80] mt-0.5 flex-shrink-0" />
              <span>{BUSINESS_DATA.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13.5px]">
        <p>
          © 2026 Vidriería Central Santiago. Todos los derechos reservados.
        </p>
        <p className="text-[#06192f] font-medium">
          Más de 60 años de servicio en Santiago Centro.
        </p>
      </div>
    </footer>
  );
};
