import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone, Star } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { BUSINESS_DATA } from '../data/businessData';

interface HeroProps {
  onQuoteClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [counter, setCounter] = useState(0);
  const [animationReady, setAnimationReady] = useState(false);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const cardFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safety timeout: ensure everything is visible after 5000ms even if animation fails
    const safetyTimer = setTimeout(() => {
      setAnimationReady(true);
    }, 5000);

    // Number count-up animation for +60
    let startTimestamp: number | null = null;
    const duration = 1400; // ms
    const target = BUSINESS_DATA.experienceYears;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounter(Math.floor(eased * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounter(target);
      }
    };
    const animFrame = window.requestAnimationFrame(step);

    // Web Animations API for precise execution
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        // Line 1 reveal
        line1Ref.current?.animate(
          [
            { clipPath: 'inset(0 -0.12em 100% -0.12em)', transform: 'translateY(0.9em)' },
            { clipPath: 'inset(-0.34em -0.12em -0.34em -0.12em)', transform: 'translateY(0)' }
          ],
          {
            duration: 950,
            delay: 100,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          }
        );

        // Line 2 reveal (110ms offset)
        line2Ref.current?.animate(
          [
            { clipPath: 'inset(0 -0.12em 100% -0.12em)', transform: 'translateY(0.9em)' },
            { clipPath: 'inset(-0.34em -0.12em -0.34em -0.12em)', transform: 'translateY(0)' }
          ],
          {
            duration: 950,
            delay: 210,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          }
        );

        // Hero image animation
        heroImgRef.current?.animate(
          [
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          {
            duration: 1050,
            delay: 480,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          }
        );

        // Background word "VIDRIO" animation
        bgWordRef.current?.animate(
          [
            { opacity: 0 },
            { opacity: 1 }
          ],
          {
            duration: 900,
            delay: 620,
            easing: 'ease-out',
            fill: 'forwards'
          }
        );

        // Floating card entrance
        cardFloatRef.current?.animate(
          [
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          {
            duration: 800,
            delay: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          }
        );
      }
    } catch {
      // Fallback
    }

    setAnimationReady(true);

    return () => {
      clearTimeout(safetyTimer);
      window.cancelAnimationFrame(animFrame);
    };
  }, []);

  const whatsappHeroHref = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=Hola%2C%20quiero%20cotizar%20un%20proyecto`;

  return (
    <section
      id="inicio"
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Portada de Vidriería Central Santiago"
    >
      {/* Palabra "VIDRIO" gigante en el fondo */}
      <div
        ref={bgWordRef}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 text-center uppercase"
        style={{
          fontSize: 'clamp(90px, 16vw, 220px)',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.43)',
          letterSpacing: '-9px',
          lineHeight: 0.9,
          maxWidth: '100vw',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        VIDRIO
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* H1 Titular con revelado línea a línea */}
            <h1
              id="hero-main-title"
              className="text-[#06192f] text-left mb-6"
              style={{
                fontSize: 'clamp(38px, 5.4vw, 76px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              <span className="block overflow-hidden pb-1">
                <span
                  ref={line1Ref}
                  className={`inline-block will-change-transform ${
                    animationReady ? '' : 'opacity-100'
                  }`}
                >
                  Vidrios y ventanas
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  ref={line2Ref}
                  className={`inline-block will-change-transform ${
                    animationReady ? '' : 'opacity-100'
                  }`}
                >
                  a medida en Santiago Centro
                </span>
              </span>
            </h1>

            {/* Subtítulo */}
            <p
              id="hero-subtitle"
              className="text-[#5e7082] text-[18px] sm:text-[20px] leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Fabricamos e instalamos vidrio templado, termopanel y ventanas de
              aluminio. Más de 60 años de servicio y garantía en cada trabajo.
            </p>

            {/* Dos Botones */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                id="hero-cta-whatsapp"
                href={whatsappHeroHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-acento px-7 py-3.5 rounded-full text-[16px] sm:text-[17px] font-medium inline-flex items-center justify-center gap-2.5 shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Cotizar por WhatsApp</span>
              </a>

              <a
                id="hero-cta-call"
                href={`tel:${BUSINESS_DATA.mobilePhone.replace(/\s+/g, '')}`}
                className="btn-vidrio px-6 py-3.5 rounded-full text-[16px] sm:text-[17px] font-medium inline-flex items-center justify-center gap-2.5 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 text-[#0E8C80]" aria-hidden="true" />
                <span>Llamar ahora</span>
              </a>
            </div>

            {/* Indicador de confianza sutil */}
            <div className="mt-8 pt-6 border-t border-white/40 flex items-center gap-4 text-[14.5px] text-[#5e7082]">
              <div className="flex items-center gap-1 text-[#0E8C80]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-[#06192f]">4,4</span>
              </div>
              <span className="text-white/60">•</span>
              <span>60 reseñas en Google</span>
              <span className="text-white/60">•</span>
              <span className="font-medium text-[#06192f]">Garantía en cada trabajo</span>
            </div>
          </div>

          {/* Right Column: Hero Image & Floating Glass Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div
              ref={heroImgRef}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-white/40"
            >
              <img
                id="hero-main-img"
                src={IMAGES.heroVentanal}
                alt="Ventanal de aluminio negro en un living luminoso con vista al jardín"
                width="1200"
                height="800"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[4/3] object-cover block transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06192f]/20 to-transparent pointer-events-none" />
            </div>

            {/* Tarjeta de Vidrio Flotante */}
            <div
              ref={cardFloatRef}
              id="hero-floating-card"
              className="vidrio-panel p-5 sm:p-6 mt-4 lg:mt-0 lg:absolute lg:-bottom-8 lg:-left-12 max-w-sm w-full z-20 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Sello Google */}
                <a
                  href={BUSINESS_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col group cursor-pointer"
                  aria-label="Ver 60 reseñas en Google Maps con 4,4 estrellas"
                >
                  <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-[17px] font-semibold text-[#06192f]">4,4 ★</span>
                  </div>
                  <span className="text-[13px] text-[#5e7082] group-hover:text-[#0E8C80] transition-colors underline decoration-dotted underline-offset-2">
                    60 reseñas en Google
                  </span>
                </a>

                <div className="w-[1px] h-10 bg-white/60" aria-hidden="true" />

                {/* Contador +60 años */}
                <div className="flex flex-col text-right">
                  <div className="text-[28px] sm:text-[32px] font-bold text-[#06192f] leading-none tracking-tight">
                    +{counter}
                  </div>
                  <span className="text-[13px] text-[#5e7082] mt-0.5">
                    años de servicio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
