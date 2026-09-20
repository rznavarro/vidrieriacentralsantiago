import React from 'react';
import { IMAGES } from '../assets/images';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_DATA } from '../data/businessData';

export const HowWeWork: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Cuéntanos qué necesitas',
      desc: 'Escríbenos por WhatsApp. Si puedes, envía una foto y las medidas de tu espacio.',
    },
    {
      num: '2',
      title: 'Te cotizamos',
      desc: 'Revisamos los requerimientos y te entregamos una propuesta clara para tu proyecto.',
    },
    {
      num: '3',
      title: 'Fabricamos e instalamos',
      desc: 'Elaboramos con precisión en nuestro taller y montamos en terreno, con garantía en cada trabajo.',
    },
  ];

  return (
    <section
      id="como-trabajamos"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="como-trabajamos-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2
          id="como-trabajamos-title"
          className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-4"
        >
          Cotizar es simple
        </h2>
        <p className="text-[#5e7082] text-[18px] leading-relaxed">
          Un proceso directo, sin trámites innecesarios y atendido por personas
          con más de 60 años de experiencia en el rubro.
        </p>
      </div>

      {/* 3 Pasos en Tarjetas de Vidrio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
        {steps.map((step) => (
          <div
            key={step.num}
            id={`step-card-${step.num}`}
            className="vidrio-panel p-8 relative flex flex-col justify-between"
          >
            <div>
              {/* Número estilizado */}
              <div className="w-12 h-12 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center text-[22px] font-bold text-[#0E8C80] shadow-xs mb-6 select-none">
                {step.num}
              </div>

              <h3 className="text-[22px] font-medium text-[#06192f] tracking-tight mb-3">
                {step.title}
              </h3>

              <p className="text-[#5e7082] text-[16.5px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Imágenes de Apoyo (Taller e Instaladores) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-lg group aspect-[4/3]">
          <img
            src={IMAGES.maestroCortando}
            alt="Maestro vidriero cortando un cristal a medida en el taller"
            loading="lazy"
            width="800"
            height="600"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#06192f]/70 via-[#06192f]/30 to-transparent text-white text-[14px]">
            <span className="font-medium">Corte y preparación de cristales en taller propio</span>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-lg group aspect-[4/3]">
          <img
            src={IMAGES.instaladoresAltura}
            alt="Instaladores colocando un cristal grande en un edificio"
            loading="lazy"
            width="800"
            height="600"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#06192f]/70 via-[#06192f]/30 to-transparent text-white text-[14px]">
            <span className="font-medium">Instalación técnica en terreno con equipamiento de seguridad</span>
          </div>
        </div>
      </div>

      {/* Call to action de sección */}
      <div className="mt-12 text-center">
        <a
          id="how-we-work-whatsapp-cta"
          href={`https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=Hola%2C%20quiero%20cotizar%20un%20proyecto`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-acento px-7 py-3.5 rounded-full text-[16px] font-medium inline-flex items-center gap-2.5 shadow-xs"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span>Escríbenos directamente por WhatsApp</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
