import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IMAGES } from '../assets/images';
import { Sparkles } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topImgRef = useRef<HTMLImageElement>(null);

  // States
  const [isMobile, setIsMobile] = useState(false);
  const [sliderPos, setSliderPos] = useState(50); // for mobile touch slider
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Coordinates for smooth mouse tracking
  const mouseCoords = useRef({ x: -1000, y: -1000 });
  const currentCoords = useRef({ x: -1000, y: -1000 });
  const isHovered = useRef(false);
  const animFrameId = useRef<number | null>(null);

  // Responsive check
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Desktop smooth circular mask rendering via Canvas and requestAnimationFrame
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const topImg = topImgRef.current;
    const container = containerRef.current;

    if (!canvas || !topImg || !container || isMobile || reducedMotion) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Target coordinates
    const targetX = isHovered.current ? mouseCoords.current.x : -1000;
    const targetY = isHovered.current ? mouseCoords.current.y : -1000;

    // 10% smoothing per frame
    currentCoords.current.x += (targetX - currentCoords.current.x) * 0.1;
    currentCoords.current.y += (targetY - currentCoords.current.y) * 0.1;

    const cx = currentCoords.current.x;
    const cy = currentCoords.current.y;

    ctx.clearRect(0, 0, w, h);

    // If outside, keep blank
    if (cx > -250 && cx < w + 250 && cy > -250 && cy < h + 250) {
      const radius = 185;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.62, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.5)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Apply as CSS mask-image (using canvas data or dynamic CSS mask)
      try {
        const dataUrl = canvas.toDataURL();
        topImg.style.maskImage = `url(${dataUrl})`;
        topImg.style.webkitMaskImage = `url(${dataUrl})`;
      } catch {
        // Fallback to direct CSS radial-gradient for performance if needed
        const cssMask = `radial-gradient(circle ${radius}px at ${cx}px ${cy}px, black 0%, black 62%, rgba(0,0,0,0.5) 80%, transparent 100%)`;
        topImg.style.maskImage = cssMask;
        topImg.style.webkitMaskImage = cssMask;
      }
    } else {
      topImg.style.maskImage = 'none';
      topImg.style.webkitMaskImage = 'none';
      topImg.style.opacity = '0';
    }

    if (isHovered.current) {
      topImg.style.opacity = '1';
    }

    animFrameId.current = requestAnimationFrame(renderFrame);
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!isMobile && !reducedMotion) {
      animFrameId.current = requestAnimationFrame(renderFrame);
    }
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isMobile, reducedMotion, renderFrame]);

  // Pointer move handler with transform scale compensation
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // Compensate if container is scaled with CSS transform
    const scaleX = rect.width > 0 ? container.offsetWidth / rect.width : 1;
    const scaleY = rect.height > 0 ? container.offsetHeight / rect.height : 1;

    const pointerX = (e.clientX - rect.left) * scaleX;
    const pointerY = (e.clientY - rect.top) * scaleY;

    mouseCoords.current = { x: pointerX, y: pointerY };
    isHovered.current = true;
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
  };

  // Mobile drag slider handlers
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile || !isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
    const relativeX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section
      id="trabajos"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="before-after-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vidrio-panel text-[#0E8C80] text-[14px] font-medium mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Renovación garantizada</span>
        </div>
        <h2
          id="before-after-title"
          className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-4"
        >
          Mira la diferencia
        </h2>
        <p className="text-[#5e7082] text-[18px] leading-relaxed">
          {isMobile
            ? 'Arrastra la barra central con el dedo para comparar el estado original y la ventana renovada.'
            : 'Pasa el cursor sobre la imagen para revelar la instalación renovada con vidrio y aluminio moderno.'}
        </p>
      </div>

      {/* Prefer-reduced-motion Layout: Side by Side */}
      {reducedMotion ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/50 shadow-md">
            <span className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#06192f]/80 text-white text-[13px] font-medium tracking-wider">
              ANTES
            </span>
            <img
              src={IMAGES.ventanaAntes}
              alt="Ventana antigua con vidrio roto"
              className="w-full h-auto aspect-[4/3] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/50 shadow-md">
            <span className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#0E8C80] text-white text-[13px] font-medium tracking-wider">
              DESPUÉS
            </span>
            <img
              src={IMAGES.ventanaDespues}
              alt="Misma ventana renovada con marco de aluminio"
              className="w-full h-auto aspect-[4/3] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      ) : (
        /* Interactive Comparator */
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            id="interactive-before-after-container"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onTouchMove={handleTouchMove}
            onPointerDown={() => isMobile && setIsDragging(true)}
            onPointerUp={() => isMobile && setIsDragging(false)}
            className="relative rounded-3xl overflow-hidden border border-white/60 shadow-xl bg-white/40 aspect-[4/3] sm:aspect-[16/10] select-none touch-none cursor-crosshair"
            role="region"
            aria-label="Comparación de una ventana antigua con vidrio roto y la misma ventana renovada con marco de aluminio"
          >
            {/* HTML/CSS Badges for ANTES and DESPUÉS */}
            <div className="absolute top-4 left-4 z-30 pointer-events-none">
              <span
                id="badge-antes"
                className="px-4 py-1.5 rounded-full bg-[#06192f]/75 backdrop-blur-md text-white text-[13px] font-medium tracking-wider shadow-sm border border-white/20 inline-block"
              >
                ANTES
              </span>
            </div>
            <div className="absolute top-4 right-4 z-30 pointer-events-none">
              <span
                id="badge-despues"
                className="px-4 py-1.5 rounded-full bg-[#0E8C80]/90 backdrop-blur-md text-white text-[13px] font-medium tracking-wider shadow-sm border border-white/30 inline-block"
              >
                DESPUÉS
              </span>
            </div>

            {/* Base Image (ANTES) */}
            <img
              id="img-antes-base"
              src={IMAGES.ventanaAntes}
              alt="Ventana antigua con marco de madera desgastada y cristal fracturado"
              className="absolute inset-0 w-full h-full object-cover block"
              referrerPolicy="no-referrer"
            />

            {/* Top Image (DESPUÉS) */}
            {isMobile ? (
              // Mobile implementation: clip-path slider
              <div
                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                className="absolute inset-0 w-full h-full transition-none"
              >
                <img
                  id="img-despues-mobile"
                  src={IMAGES.ventanaDespues}
                  alt="Ventana renovada con perfilería de aluminio negro y cristal transparente nuevo"
                  className="absolute inset-0 w-full h-full object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              // Desktop implementation: Canvas radial gradient mask
              <img
                ref={topImgRef}
                id="img-despues-desktop"
                src={IMAGES.ventanaDespues}
                alt="Ventana renovada con perfilería de aluminio negro y cristal transparente nuevo"
                className="absolute inset-0 w-full h-full object-cover block will-change-[mask-image] pointer-events-none"
                style={{ opacity: 0 }}
                referrerPolicy="no-referrer"
              />
            )}

            {/* Hidden canvas for generating radial mask */}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

            {/* Mobile Vertical Drag Handle */}
            {isMobile && (
              <div
                style={{ left: `${sliderPos}%` }}
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none z-20 flex items-center justify-center -translate-x-1/2"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-md border-2 border-[#0E8C80] flex items-center justify-center text-[#0E8C80] text-xs font-bold select-none">
                  ↔
                </div>
              </div>
            )}

            {/* Hint overlay on Desktop */}
            {!isMobile && (
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
                <span className="text-[12px] px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[#06192f] border border-white/50">
                  Mueve el cursor para revelar
                </span>
              </div>
            )}
          </div>

          {/* Accessible Keyboard Controls for Mobile/Desktop */}
          <div className="mt-3 flex items-center justify-between text-[13px] text-[#5e7082] px-2">
            <span id="reference-note" className="italic">
              Imagen de referencia ilustrativa.
            </span>
            {isMobile && (
              <label className="flex items-center gap-2">
                <span>Posición:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Ajustar divisor antes y después"
                  className="w-24 accent-[#0E8C80]"
                />
              </label>
            )}
          </div>

          {/* Reseña de Google Maps vinculada a trabajos realizados: Anibal Huenchuman */}
          <div className="mt-8 max-w-3xl mx-auto p-5 rounded-2xl bg-white/60 border border-white/70 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0E8C80] text-white text-xs font-semibold flex items-center justify-center">
                  A
                </div>
                <div>
                  <span className="text-[14.5px] font-medium text-[#06192f] block">Anibal Huenchuman</span>
                  <span className="text-[12px] text-[#5e7082]">hace 3 meses · 5 de 5 estrellas en Google</span>
                </div>
              </div>
              <span className="text-[#F5A623] text-sm font-semibold tracking-wider">★★★★★</span>
            </div>
            <blockquote className="text-[#33475c] italic text-[15px] leading-relaxed">
              “Me costo mucho llegar a una empresa que sea seria para trabajar, excelentes precios, muy buenos trabajos totalmente recomendable 👍”
            </blockquote>
          </div>
        </div>
      )}
    </section>
  );
};
