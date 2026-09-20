import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEWS, POPULAR_GOOGLE_TOPICS, BUSINESS_DATA } from '../data/businessData';
import { ReviewItem } from '../types';

// Pending reviews documented as requested:
/*
  PENDIENTES DE PUBLICACIÓN (NO PUBLICAR HASTA TENER TEXTO COMPLETO Y VERIFICADO):
  - Patricia Sepulveda (5 ★, hace un año) — texto cortado
  - Evy Mozz (5 ★, hace 2 años) — texto cortado
  - Reseña 5 ★ de hace 7 meses: "Excelente atención, servicio y precios" — falta el nombre del autor
  - Respuestas del propietario a Edgar y a Anibal — cortadas
*/

const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Google"
    role="img"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const StarIcon: React.FC<{ fillPercent?: number; size?: number; className?: string }> = ({
  fillPercent = 100,
  size = 17,
  className = '',
}) => {
  const gradientId = `star-grad-${fillPercent}-${Math.random().toString(36).substring(2, 7)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="100%" y1="0" y2="0">
          <stop offset={`${fillPercent}%`} stopColor="#F5A623" />
          <stop offset={`${fillPercent}%`} stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        stroke="#F5A623"
        strokeWidth="0.5"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};

export const ReviewsSection: React.FC = () => {
  // Main carousel showcases Reviews 1, 2, 3, and 4 as specified
  const primaryReviews: ReviewItem[] = GOOGLE_REVIEWS.slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const whatsappHref = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=Hola%2C%20vi%20las%20opiniones%20en%20Google%20y%20quiero%20cotizar%20un%20proyecto`;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : primaryReviews.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < primaryReviews.length - 1 ? prev + 1 : 0));
  };

  // Keep scroll in sync with mobile swipe
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const width = el.offsetWidth * 0.85;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== activeIndex && newIdx >= 0 && newIdx < primaryReviews.length) {
      setActiveIndex(newIdx);
    }
  };

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <section
      id="opiniones"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="opiniones-heading"
    >
      {/* Título y Subtítulo */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <h2
          id="opiniones-heading"
          className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-3"
        >
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-[#5e7082] text-[18px] sm:text-[20px] font-normal leading-relaxed">
          4,4 ★ basado en 60 opiniones reales en Google.
        </p>
      </div>

      {/* Encabezado en Tarjeta de Vidrio Horizontal */}
      <div
        id="google-rating-card"
        className="vidrio-panel p-6 sm:p-8 mb-12 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Lado izquierdo: 4,4 grande, 5 estrellas (5ta al 40%), texto 60 reseñas */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            <div
              className="text-[#06192f] leading-none tracking-tight select-none"
              style={{ fontSize: '56px', fontWeight: 500 }}
              aria-label="Calificación 4,4 de 5 estrellas"
            >
              4,4
            </div>

            <div className="flex flex-col items-center sm:items-start">
              {/* Cinco estrellas en #F5A623 con la 5ta al 40% */}
              <div
                className="flex items-center gap-1.5 mb-1.5"
                role="img"
                aria-label="Calificación 4,4 de 5 estrellas en Google"
              >
                <StarIcon fillPercent={100} size={22} />
                <StarIcon fillPercent={100} size={22} />
                <StarIcon fillPercent={100} size={22} />
                <StarIcon fillPercent={100} size={22} />
                <StarIcon fillPercent={40} size={22} />
              </div>

              <div className="text-[15.5px] text-[#5e7082] font-medium flex items-center gap-2">
                <GoogleLogo className="w-4 h-4 inline-block" />
                <span>60 reseñas en Google</span>
              </div>
            </div>
          </div>

          {/* Centro: Temas más mencionados por los clientes según Google */}
          <div className="flex-1 w-full lg:max-w-xl">
            <div className="text-[12.5px] uppercase tracking-wider text-[#5e7082] font-semibold mb-2.5 text-center lg:text-left">
              Temas más mencionados:
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {POPULAR_GOOGLE_TOPICS.map((topic) => (
                <span
                  key={topic.label}
                  className="px-3 py-1 rounded-full bg-white/60 border border-white/70 text-[#06192f] text-[13px] font-medium shadow-2xs"
                >
                  {topic.label} <span className="text-[#5e7082]">({topic.count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Lado derecho: Botón Contorneado "Ver todas en Google" */}
          <div className="flex-shrink-0">
            <a
              id="google-view-all-reviews-btn"
              href={BUSINESS_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-vidrio px-5 py-3 rounded-full text-[15px] font-medium inline-flex items-center gap-2 text-[#06192f] hover:text-[#0E8C80] shadow-2xs"
              aria-label="Ver todas las 60 reseñas en el perfil de Google de Vidriería Central Santiago (abre en pestaña nueva)"
            >
              <span>Ver todas en Google</span>
              <ExternalLink className="w-4 h-4 text-[#0E8C80]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Controles de Navegación del Carrusel en Escritorio */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div className="text-[15px] text-[#5e7082]">
          Reseñas verificadas de clientes ({primaryReviews.length} destacadas)
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Ver reseña anterior"
            className="w-[42px] h-[42px] rounded-full btn-vidrio flex items-center justify-center text-[#06192f] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Ver siguiente reseña"
            className="w-[42px] h-[42px] rounded-full btn-vidrio flex items-center justify-center text-[#06192f] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Grid en Escritorio / Tablet & Carrusel Snap en Móvil */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-4 pt-1"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {primaryReviews.map((review, idx) => {
          const initial = review.author.trim().charAt(0).toUpperCase();

          return (
            <article
              key={review.id}
              id={`review-card-${review.id}`}
              aria-label={`Opinión de ${review.author}`}
              className="w-[85vw] max-w-[420px] lg:w-auto lg:max-w-none flex-shrink-0 snap-center transition-all duration-220 hover:-translate-y-1 hover:border-white/85"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,.62), rgba(239,247,253,.46))',
                border: '1px solid rgba(255,255,255,.5)',
                borderRadius: '24px',
                padding: '26px 26px 22px',
                boxShadow:
                  'inset 0 0 22px rgba(255,255,255,.34), 0 8px 28px rgba(65,94,123,.06)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* 1. Arriba a la derecha: Google Logo & Inicial + Nombre */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    {/* 2. Círculo con la inicial de 44px, fondo --acento, letra blanca peso 500 */}
                    <div
                      className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-2xs select-none"
                      style={{
                        backgroundColor: '#0E8C80',
                        fontWeight: 500,
                        fontSize: '18px',
                      }}
                      aria-hidden="true"
                    >
                      {initial}
                    </div>

                    <div>
                      {/* 3. Nombre del autor en 16px, peso 500, color azul marino */}
                      <h3
                        className="text-[#06192f] tracking-tight leading-snug"
                        style={{ fontSize: '16px', fontWeight: 500 }}
                      >
                        {review.author}
                      </h3>

                      {/* 5. Fecha relativa en 13px, color gris */}
                      <time className="text-[13px] text-[#5e7082] block mt-0.5">
                        {review.relativeTime}
                      </time>
                    </div>
                  </div>

                  {/* 1. Logotipo "G" de Google en pequeño (24px) */}
                  <div className="flex-shrink-0 pt-0.5" title="Reseña verificada en Google Maps">
                    <GoogleLogo className="w-6 h-6" />
                  </div>
                </div>

                {/* 4. Las 5 estrellas en #F5A623, tamaño 17px, con aria-label "5 de 5 estrellas" */}
                <div
                  className="flex items-center gap-1 mb-4"
                  role="img"
                  aria-label="5 de 5 estrellas"
                >
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <StarIcon key={sIdx} fillPercent={100} size={17} />
                  ))}
                  <span className="sr-only">5 de 5 estrellas</span>
                </div>

                {/* 6. El texto de la reseña en 16px, line-height 1.55, color #33475c, entre comillas tipográficas */}
                <blockquote
                  className="text-[#33475c] italic mb-4 font-normal"
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.55',
                  }}
                >
                  “{review.comment}”
                </blockquote>
              </div>

              {/* 7. Si existe respuesta del propietario: bloque interior con borde izquierdo de 3px en --acento */}
              {review.ownerResponse && (
                <div
                  className="rounded-xl p-3.5 mt-4"
                  style={{
                    borderLeft: '3px solid #0E8C80',
                    background: 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <div
                    className="text-[#06192f] mb-1 flex items-center justify-between gap-2"
                    style={{ fontSize: '13px', fontWeight: 500 }}
                  >
                    <span>Respuesta de Vidriería Central Santiago</span>
                    <span className="text-[12px] text-[#5e7082] font-normal">
                      {review.ownerResponse.relativeTime}
                    </span>
                  </div>
                  <p
                    className="text-[#33475c] leading-relaxed"
                    style={{ fontSize: '14px' }}
                  >
                    {review.ownerResponse.text}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Indicadores de Punto en Móvil */}
      <div className="flex lg:hidden items-center justify-center gap-2 mt-4 mb-8">
        {primaryReviews.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => scrollToCard(dotIdx)}
            aria-label={`Ir a reseña ${dotIdx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === dotIdx
                ? 'w-6 bg-[#0E8C80]'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Llamado a la Acción al final de la sección */}
      <div className="mt-12 sm:mt-16 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 vidrio-panel p-6 sm:px-8 sm:py-6 shadow-sm">
          <span className="text-[#06192f] text-[17px] sm:text-[18px] font-normal">
            ¿Quieres el mismo resultado?
          </span>
          <a
            id="reviews-bottom-whatsapp-cta"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-acento px-6 py-3 rounded-full text-[15.5px] font-medium inline-flex items-center gap-2 shadow-xs cursor-pointer select-none"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Cotiza por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
