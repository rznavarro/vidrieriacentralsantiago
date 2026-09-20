import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  HelpCircle,
} from 'lucide-react';
import { ServiceItem } from '../types';
import { BUSINESS_DATA, FAQS, SERVICES } from '../data/businessData';

interface ServiceDetailViewProps {
  service: ServiceItem;
  onBackToHome: () => void;
  onSelectOtherService: (service: ServiceItem) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  onBackToHome,
  onSelectOtherService,
}) => {
  // Update document title and canonical tags dynamically
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${service.title} en Santiago Centro | Vidriería Central Santiago`;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
    };
  }, [service]);

  // Quick form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Find related FAQ
  const getRelatedFaq = () => {
    switch (service.id) {
      case 'vidrio-templado':
        return FAQS.find((f) => f.id === 4) || FAQS[3];
      case 'ventanas-termopanel':
        return FAQS.find((f) => f.id === 5) || FAQS[4];
      case 'ventanas-de-aluminio':
        return FAQS.find((f) => f.id === 6) || FAQS[5];
      case 'reparacion-y-mantencion':
        return FAQS.find((f) => f.id === 7) || FAQS[6];
      default:
        return FAQS[2];
    }
  };

  const relatedFaq = getRelatedFaq();
  const whatsappUrl = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=${encodeURIComponent(
    service.whatsappMessage
  )}`;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setFormSent(true);
  };

  const quickWhatsappDirect = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=${encodeURIComponent(
    `Hola, mi nombre es ${name}. Teléfono: ${phone}. Servicio: ${service.title}. ${notes ? `Detalles: ${notes}` : ''}`
  )}`;

  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  return (
    <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Breadcrumbs */}
      <nav
        aria-label="Migas de pan"
        className="flex items-center gap-2 text-[14px] text-[#5e7082] mb-8 overflow-x-auto whitespace-nowrap py-1"
      >
        <button
          type="button"
          onClick={onBackToHome}
          className="hover:text-[#06192f] transition-colors cursor-pointer"
        >
          Inicio
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          type="button"
          onClick={onBackToHome}
          className="hover:text-[#06192f] transition-colors cursor-pointer"
        >
          Servicios
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#06192f] font-medium" aria-current="page">
          {service.title}
        </span>
      </nav>

      {/* Botón Volver */}
      <button
        type="button"
        onClick={onBackToHome}
        className="btn-vidrio px-4 py-2 rounded-full text-[14px] font-medium inline-flex items-center gap-2 mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la portada</span>
      </button>

      {/* Titular Grande en Peso Liviano (400) */}
      <div className="mb-10">
        <h1 className="text-[#06192f] text-[36px] sm:text-[48px] lg:text-[54px] font-normal tracking-tight leading-tight mb-4">
          {service.title}
        </h1>
        <p className="text-[#5e7082] text-[19px] sm:text-[21px] font-light leading-relaxed max-w-3xl">
          {service.shortBenefit}
        </p>
      </div>

      {/* Imagen Principal del Servicio */}
      <div className="rounded-3xl overflow-hidden border border-white/60 shadow-lg aspect-[16/9] mb-12 bg-white/40">
        <img
          src={service.image}
          alt={service.imageAlt}
          width="1200"
          height="675"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Explicación Detallada */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-[26px] font-medium text-[#06192f] tracking-tight">
            ¿Qué es y para qué sirve?
          </h2>
          <p className="text-[#5e7082] text-[17.5px] leading-relaxed">
            {service.description}
          </p>

          <div className="vidrio-panel p-6 sm:p-7 mt-8">
            <h3 className="text-[19px] font-medium text-[#06192f] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0E8C80]" />
              <span>Resumen en 3 puntos clave</span>
            </h3>
            <ul className="space-y-3">
              {service.summaryBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[16px] text-[#06192f]/90">
                  <CheckCircle2 className="w-5 h-5 text-[#0E8C80] mt-0.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pregunta Frecuente Relacionada */}
          {relatedFaq && (
            <div className="vidrio-panel p-6 mt-8">
              <div className="flex items-center gap-2 text-[#0E8C80] text-[14px] font-medium mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>Pregunta frecuente de este servicio</span>
              </div>
              <h4 className="text-[18px] font-medium text-[#06192f] mb-2">
                {relatedFaq.question}
              </h4>
              <p className="text-[#5e7082] text-[16px] leading-relaxed">
                {relatedFaq.answer}
              </p>
            </div>
          )}

          {/* Reseña Real de Google asignada a este servicio */}
          {service.id === 'ventanas-termopanel' && (
            <div className="vidrio-panel p-6 mt-8 border-l-4 border-l-[#0E8C80]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0E8C80] text-white text-xs font-semibold flex items-center justify-center">
                    E
                  </div>
                  <div>
                    <span className="text-[15px] font-medium text-[#06192f] block">Erna Andaur</span>
                    <span className="text-[12px] text-[#5e7082]">hace 10 meses · 5 de 5 estrellas en Google</span>
                  </div>
                </div>
                <div className="text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded">5,0 ★</div>
              </div>
              <blockquote className="text-[#33475c] italic text-[15.5px] leading-relaxed mb-3">
                “Muy buen servicio: buena gestión en la coordinación gracias a la Sra. Elizabeth, amabilidad, puntualidad, y trabajo de muy buena calidad. Espero prontamente contar de nuevo con su servicio. La recomiendo 100%.”
              </blockquote>
              <div className="rounded-xl p-3 bg-white/50 border-l-2 border-[#0E8C80] text-[13.5px] text-[#33475c]">
                <strong className="text-[#06192f] block font-medium mb-0.5">Respuesta de Vidriería Central Santiago (hace 10 meses):</strong>
                Gracias Sra. Erna por sus excelentes comentarios...estamos en contacto para fabricar e instalar las siguientes ventanas termopanel.
              </div>
            </div>
          )}

          {service.id === 'reparacion-y-mantencion' && (
            <div className="vidrio-panel p-6 mt-8 border-l-4 border-l-[#0E8C80]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0E8C80] text-white text-xs font-semibold flex items-center justify-center">
                    D
                  </div>
                  <div>
                    <span className="text-[15px] font-medium text-[#06192f] block">Departamentos Torre San Isidro</span>
                    <span className="text-[12px] text-[#5e7082]">hace 2 meses · 5 de 5 estrellas en Google</span>
                  </div>
                </div>
                <div className="text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded">5,0 ★</div>
              </div>
              <blockquote className="text-[#33475c] italic text-[15.5px] leading-relaxed">
                “Exitosa la instalación del vidrio en mi ventanal quedó firme,bien sellado y funcional... Abre, cierra y traba con normalidad, Lo mejor en tiempo récord resolvieron mi problema muy profesionales en Vidriería central Santiago, los recomiendo al 100%”
              </blockquote>
            </div>
          )}

          {/* CTA Principal de WhatsApp */}
          <div className="pt-4">
            <a
              id="service-detail-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-acento px-7 py-4 rounded-full text-[16.5px] font-medium inline-flex items-center gap-3 shadow-md"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Cotizar {service.title} por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Formulario de Cotización Rápido */}
        <div className="lg:col-span-5">
          <div className="vidrio-panel p-6 sm:p-7 sticky top-24">
            <h3 className="text-[20px] font-medium text-[#06192f] tracking-tight mb-2">
              Cotización rápida
            </h3>
            <p className="text-[#5e7082] text-[14px] mb-5">
              Envía tus datos y te asesoraremos para tu proyecto de {service.title.toLowerCase()}.
            </p>

            {formSent ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#0E8C80]/20 text-[#0E8C80] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <p className="text-[#06192f] font-medium text-[16px]">
                  ¡Solicitud recibida con éxito!
                </p>
                <p className="text-[#5e7082] text-[14px]">
                  Te contactaremos a la brevedad. También puedes agilizar tu respuesta por WhatsApp:
                </p>
                <a
                  href={quickWhatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-acento w-full py-2.5 px-4 rounded-xl text-[14.5px] font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar ahora por WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[13.5px] font-medium text-[#06192f] mb-1">
                    Tu nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre y apellido"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 border border-white/60 text-[14.5px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80]"
                  />
                </div>

                <div>
                  <label className="block text-[13.5px] font-medium text-[#06192f] mb-1">
                    Teléfono / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+56 9 ..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 border border-white/60 text-[14.5px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80]"
                  />
                </div>

                <div>
                  <label className="block text-[13.5px] font-medium text-[#06192f] mb-1">
                    Medidas o notas <span className="text-[12px] text-[#5e7082]">(opcional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: ventana living 1.50 x 2.00 m"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 border border-white/60 text-[14.5px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-acento w-full py-3 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar solicitud</span>
                </button>

                <div className="pt-2 text-center">
                  <span className="text-[12.5px] text-[#5e7082] flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0E8C80]" />
                    <span>Lunes a viernes de 10:00 a 18:30 hrs</span>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Otros Servicios Disponibles */}
      <div className="pt-10 border-t border-white/40">
        <h3 className="text-[22px] font-medium text-[#06192f] mb-6">
          Otros servicios disponibles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {otherServices.map((other) => (
            <button
              key={other.id}
              type="button"
              onClick={() => onSelectOtherService(other)}
              className="vidrio-panel p-5 text-left group hover:border-white/90 transition-all cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-white/40">
                <img
                  src={other.image}
                  alt={other.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>
              <h4 className="text-[17px] font-medium text-[#06192f] group-hover:text-[#0E8C80] transition-colors mb-1">
                {other.title}
              </h4>
              <p className="text-[13.5px] text-[#5e7082] line-clamp-2">
                {other.shortBenefit}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};
