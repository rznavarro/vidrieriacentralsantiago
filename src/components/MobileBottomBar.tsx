import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_DATA } from '../data/businessData';

export const MobileBottomBar: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=Hola%2C%20quiero%20cotizar%20un%20proyecto`;

  return (
    <div
      id="mobile-persistent-bottom-bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/85 backdrop-blur-lg border-t border-white/60 shadow-[0_-4px_20px_rgba(6,25,47,0.08)] flex items-center gap-2"
    >
      <a
        id="mobile-bottom-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-acento flex-1 py-3 px-4 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 shadow-xs"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span>Cotizar por WhatsApp</span>
      </a>

      <a
        id="mobile-bottom-call-btn"
        href={`tel:${BUSINESS_DATA.mobilePhone.replace(/\s+/g, '')}`}
        className="btn-vidrio p-3 rounded-full flex items-center justify-center text-[#06192f] flex-shrink-0"
        aria-label="Llamar a Vidriería Central Santiago"
      >
        <Phone className="w-5 h-5 text-[#0E8C80]" aria-hidden="true" />
      </a>
    </div>
  );
};
