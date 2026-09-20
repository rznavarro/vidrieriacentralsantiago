import React from 'react';
import { ShieldCheck, Clock, Star, Users } from 'lucide-react';
import { BUSINESS_DATA } from '../data/businessData';

export const AboutUs: React.FC = () => {
  return (
    <section
      id="nosotros"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="nosotros-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vidrio-panel text-[#0E8C80] text-[14px] font-medium mb-4">
            <Clock className="w-4 h-4" />
            <span>Tradición en Santiago Centro</span>
          </div>

          <h2
            id="nosotros-title"
            className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-6"
          >
            Más de 60 años de oficio
          </h2>

          <div className="space-y-4 text-[#5e7082] text-[17.5px] leading-relaxed">
            <p>
              Ubicados en pleno Santiago Centro, en Avda. Santa Rosa 648,{' '}
              <strong className="text-[#06192f] font-medium">Vidriería Central Santiago</strong>{' '}
              ha acompañado a generaciones de familias, comunidades de vecinos,
              arquitectos y comerciantes en la solución integral de sus proyectos de cristales y ventanas.
            </p>
            <p>
              Creemos firmemente en el valor de la atención personalizada y el trato directo.
              Como destacan reiteradamente nuestros clientes en sus opiniones, la{' '}
              <strong className="text-[#06192f] font-medium">Sra. Elizabeth coordina cada proyecto con dedicación</strong>,
              orientando con precisión en medidas, especificaciones de seguridad y alternativas según
              el requerimiento de cada espacio.
            </p>
            <p>
              Cada corte, pulido, biselado e instalación en terreno es realizado por maestros vidrieros
              con amplio dominio del oficio, respaldado siempre por nuestro compromiso de garantía en
              cada uno de nuestros trabajos.
            </p>
          </div>
        </div>

        {/* Right Column: 3 Sellos en Tarjetas de Vidrio */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Sello 1: +60 años */}
          <div
            id="badge-anos"
            className="vidrio-panel p-6 sm:p-7 flex items-center gap-5 vidrio-card-hover"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center text-[#0E8C80] flex-shrink-0 shadow-xs">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] font-bold text-[#06192f] leading-none tracking-tight">
                +{BUSINESS_DATA.experienceYears} años
              </div>
              <div className="text-[15px] text-[#5e7082] mt-1">
                de experiencia y oficio en vidriería
              </div>
            </div>
          </div>

          {/* Sello 2: Garantía */}
          <div
            id="badge-garantia"
            className="vidrio-panel p-6 sm:p-7 flex items-center gap-5 vidrio-card-hover"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center text-[#0E8C80] flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] font-bold text-[#06192f] leading-none tracking-tight">
                Garantía
              </div>
              <div className="text-[15px] text-[#5e7082] mt-1">
                en cada uno de nuestros trabajos
              </div>
            </div>
          </div>

          {/* Sello 3: Google Reviews */}
          <a
            id="badge-google"
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vidrio-panel p-6 sm:p-7 flex items-center gap-5 vidrio-card-hover cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center text-amber-500 flex-shrink-0 shadow-xs">
              <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] font-bold text-[#06192f] leading-none tracking-tight flex items-center gap-2">
                <span>4,4 ★</span>
                <span className="text-[14px] font-normal text-[#0E8C80] group-hover:underline">
                  Ver reseñas
                </span>
              </div>
              <div className="text-[15px] text-[#5e7082] mt-1">
                {BUSINESS_DATA.googleReviewsCount} reseñas en Google
              </div>
            </div>
          </a>

          {/* Reconocimiento Atención Personalizada */}
          <div className="p-4 rounded-2xl bg-white/40 border border-white/40 flex items-center gap-3 text-[14px] text-[#06192f]/85">
            <Users className="w-5 h-5 text-[#0E8C80] flex-shrink-0" />
            <span>Coordinación directa de proyectos por la Sra. Elizabeth</span>
          </div>
        </div>
      </div>
    </section>
  );
};
