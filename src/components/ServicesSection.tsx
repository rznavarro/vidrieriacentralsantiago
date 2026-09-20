import React from 'react';
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES, BUSINESS_DATA } from '../data/businessData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section
      id="servicios"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="servicios-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2
          id="servicios-title"
          className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-4"
        >
          Lo que hacemos
        </h2>
        <p className="text-[#5e7082] text-[18px] leading-relaxed">
          Especialistas en fabricación e instalación a medida con más de 60 años
          de oficio en Santiago Centro y garantía en cada trabajo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {SERVICES.map((service, index) => {
          const encodedMsg = encodeURIComponent(service.whatsappMessage);
          const whatsappUrl = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=${encodedMsg}`;

          return (
            <article
              key={service.id}
              id={`service-card-${service.id}`}
              className="vidrio-panel vidrio-card-hover flex flex-col justify-between overflow-hidden p-6 sm:p-8"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >
              <div>
                {/* Imagen del Servicio */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6 bg-white/30 border border-white/50">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    width="800"
                    height="500"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-104"
                  />
                </div>

                {/* Título */}
                <h3 className="text-[24px] sm:text-[26px] font-medium text-[#06192f] tracking-tight mb-3">
                  {service.title}
                </h3>

                {/* Beneficio en lenguaje simple */}
                <p className="text-[#5e7082] text-[17px] leading-relaxed mb-6 font-normal">
                  {service.shortBenefit}
                </p>

                {/* Puntos destacados */}
                <ul className="space-y-2 mb-6" aria-label={`Características de ${service.title}`}>
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-[15px] text-[#06192f]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#0E8C80] mt-1 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Reseña de Google real asociada a la tarjeta */}
                {service.id === 'ventanas-termopanel' && (
                  <div className="mb-6 p-3 rounded-2xl bg-white/50 border border-white/70 text-[13.5px] text-[#33475c]">
                    <div className="flex items-center justify-between font-medium text-[#06192f] mb-1">
                      <span>Erna Andaur (Google)</span>
                      <span className="text-[#F5A623]">★★★★★</span>
                    </div>
                    <p className="italic">
                      “Muy buen servicio: buena gestión en la coordinación gracias a la Sra. Elizabeth, amabilidad, puntualidad, y trabajo de muy buena calidad...”
                    </p>
                  </div>
                )}

                {service.id === 'reparacion-y-mantencion' && (
                  <div className="mb-6 p-3 rounded-2xl bg-white/50 border border-white/70 text-[13.5px] text-[#33475c]">
                    <div className="flex items-center justify-between font-medium text-[#06192f] mb-1">
                      <span>Dep. Torre San Isidro (Google)</span>
                      <span className="text-[#F5A623]">★★★★★</span>
                    </div>
                    <p className="italic">
                      “Exitosa la instalación del vidrio en mi ventanal quedó firme,bien sellado y funcional... Lo mejor en tiempo récord resolvieron mi problema...”
                    </p>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/40">
                <a
                  id={`btn-cotizar-${service.id}`}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-acento px-5 py-3 rounded-full text-[15px] font-medium inline-flex items-center justify-center gap-2 flex-1 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Cotizar este servicio</span>
                </a>

                {onSelectService && (
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="btn-vidrio px-4 py-3 rounded-full text-[14.5px] font-medium inline-flex items-center justify-center gap-1.5 text-[#06192f] cursor-pointer"
                  >
                    <span>Detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
