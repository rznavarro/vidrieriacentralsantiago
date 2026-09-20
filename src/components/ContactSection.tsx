import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Paperclip,
  CheckCircle2,
  X,
  FileImage,
} from 'lucide-react';
import { BUSINESS_DATA, SERVICES } from '../data/businessData';
import { IMAGES } from '../assets/images';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('vidrio-templado');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === service);
  const serviceLabel = selectedServiceObj ? selectedServiceObj.title : 'Servicio';

  // Format WhatsApp message with user data
  const formattedWhatsAppText = encodeURIComponent(
    `Hola, mi nombre es ${name || 'un cliente'}.
Teléfono: ${phone || 'no indicado'}
${email ? `Correo: ${email}\n` : ''}Servicio de interés: ${serviceLabel}
${message ? `Mensaje: ${message}\n` : ''}${fileName ? `(Tengo un archivo adjunto: ${fileName})\n` : ''}Quisiera cotizar un proyecto.`
  );

  const whatsappDirectHref = `https://wa.me/${BUSINESS_DATA.whatsappNumberDigits}?text=${formattedWhatsAppText}`;

  return (
    <section
      id="contacto"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="contacto-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2
          id="contacto-title"
          className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-4"
        >
          Hablemos de tu proyecto
        </h2>
        <p className="text-[#5e7082] text-[18px] leading-relaxed">
          Cotiza por nuestro formulario o contáctanos por WhatsApp y teléfono.
          Respondemos con agilidad y orientación profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Formulario de Contacto Funcional */}
        <div className="lg:col-span-6">
          <div className="vidrio-panel p-6 sm:p-8">
            {submitted ? (
              <div
                id="contact-form-success"
                className="py-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#0E8C80]/15 text-[#0E8C80] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-[24px] font-medium text-[#06192f] mb-3">
                  Gracias por escribirnos
                </h3>
                <p className="text-[#5e7082] text-[17px] mb-6 max-w-md">
                  Te responderemos a la brevedad con la asesoría técnica y cotización para tu proyecto.
                </p>

                {/* Alternativa inmediata por WhatsApp con los datos del form */}
                <div className="p-4 rounded-2xl bg-white/60 border border-white/70 w-full mb-6 text-left">
                  <p className="text-[14px] text-[#5e7082] mb-3 font-medium">
                    ¿Deseas una respuesta aún más rápida? Puedes enviar tu consulta ahora mismo por WhatsApp:
                  </p>
                  <a
                    id="contact-success-whatsapp-btn"
                    href={whatsappDirectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-acento w-full py-3 px-4 rounded-xl text-[15px] font-medium flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Enviar estos datos por WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                    setFileName(null);
                  }}
                  className="text-[14px] text-[#5e7082] hover:text-[#06192f] underline underline-offset-4 cursor-pointer"
                >
                  Enviar otra cotización
                </button>
              </div>
            ) : (
              <form id="cotizacion-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[14.5px] font-medium text-[#06192f] mb-1.5"
                    >
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre y apellido"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80] text-[#06192f] text-[15px] placeholder-[#5e7082]/60"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[14.5px] font-medium text-[#06192f] mb-1.5"
                    >
                      Teléfono / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80] text-[#06192f] text-[15px] placeholder-[#5e7082]/60"
                    />
                  </div>
                </div>

                {/* Correo electrónico */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[14.5px] font-medium text-[#06192f] mb-1.5"
                  >
                    Correo electrónico <span className="text-[13px] text-[#5e7082] font-normal">(opcional)</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.cl"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80] text-[#06192f] text-[15px] placeholder-[#5e7082]/60"
                  />
                </div>

                {/* Servicio de Interés */}
                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-[14.5px] font-medium text-[#06192f] mb-1.5"
                  >
                    Servicio de interés
                  </label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80] text-[#06192f] text-[15px]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[14.5px] font-medium text-[#06192f] mb-1.5"
                  >
                    Mensaje o medidas estimadas <span className="text-[13px] text-[#5e7082] font-normal">(opcional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Indica medidas aproximadas, tipo de lugar o detalle del cristal que necesitas."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E8C80] text-[#06192f] text-[15px] placeholder-[#5e7082]/60 resize-y"
                  />
                </div>

                {/* Adjuntar foto o plano */}
                <div>
                  <label className="block text-[14.5px] font-medium text-[#06192f] mb-1.5">
                    Adjuntar foto o plano <span className="text-[13px] text-[#5e7082] font-normal">(opcional)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="contact-file-upload"
                      className="btn-vidrio px-4 py-2 rounded-xl text-[14px] font-medium inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4 text-[#0E8C80]" aria-hidden="true" />
                      <span>{fileName ? 'Cambiar archivo' : 'Examinar archivo'}</span>
                    </label>
                    <input
                      type="file"
                      id="contact-file-upload"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                    />

                    {fileName && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-lg text-[13.5px] text-[#06192f] border border-white/60 max-w-xs truncate">
                        <FileImage className="w-4 h-4 text-[#0E8C80] flex-shrink-0" />
                        <span className="truncate">{fileName}</span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-[#5e7082] hover:text-red-500 cursor-pointer ml-1"
                          aria-label="Quitar archivo adjunto"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón de Envío */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="btn-acento w-full py-3.5 px-6 rounded-full text-[16px] font-medium inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Enviar cotización</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reseñas rápidas en contacto: Jeanette Martinez y Edgar */}
            <div className="mt-8 pt-6 border-t border-white/50">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-[#5e7082] mb-3">
                Opiniones directas de clientes:
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[14px] font-medium text-[#06192f]">Jeanette Martinez</span>
                    <span className="text-[12px] text-[#5e7082]">hace 11 meses · 5 ★</span>
                  </div>
                  <p className="text-[14px] text-[#33475c] italic">
                    “Muy buen servicio, rápido cumplen con la fecha, precio acorde al mercado. Muy recomendable.”
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[14px] font-medium text-[#06192f]">Edgar</span>
                    <span className="text-[12px] text-[#5e7082]">hace 2 meses · 5 ★</span>
                  </div>
                  <p className="text-[14px] text-[#33475c] italic">
                    “Todo perfecto. Cumplieron con los plazos de entrega solicitados. Excelente predisponían de todo el equipo. Recomendado”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Datos del Negocio & Foto Local & Mapa */}
        <div className="lg:col-span-6 space-y-6">
          {/* Tarjeta de Datos Reales */}
          <div className="vidrio-panel p-6 sm:p-8 space-y-5">
            <h3 className="text-[22px] font-medium text-[#06192f] tracking-tight pb-3 border-b border-white/40">
              Datos de contacto
            </h3>

            {/* Dirección */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-[#0E8C80] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[13px] text-[#5e7082] uppercase tracking-wider block font-medium">
                  Dirección
                </span>
                <a
                  href={BUSINESS_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[16px] text-[#06192f] hover:text-[#0E8C80] font-medium transition-colors"
                >
                  {BUSINESS_DATA.address}, {BUSINESS_DATA.commune}, Chile
                </a>
              </div>
            </div>

            {/* Teléfonos */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-[#0E8C80] flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[13px] text-[#5e7082] uppercase tracking-wider block font-medium">
                  Teléfonos
                </span>
                <div>
                  <a
                    id="contact-link-mobile"
                    href={`tel:${BUSINESS_DATA.mobilePhone.replace(/\s+/g, '')}`}
                    className="text-[16px] text-[#06192f] hover:text-[#0E8C80] font-medium transition-colors block"
                  >
                    Móvil / WhatsApp: {BUSINESS_DATA.mobilePhone}
                  </a>
                  <a
                    id="contact-link-landline"
                    href={`tel:${BUSINESS_DATA.landlinePhone.replace(/\s+/g, '')}`}
                    className="text-[15px] text-[#5e7082] hover:text-[#06192f] transition-colors block"
                  >
                    Fijo: {BUSINESS_DATA.landlinePhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-[#0E8C80] flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[13px] text-[#5e7082] uppercase tracking-wider block font-medium">
                  Correo electrónico
                </span>
                <a
                  id="contact-link-email"
                  href={`mailto:${BUSINESS_DATA.email}`}
                  className="text-[16px] text-[#06192f] hover:text-[#0E8C80] font-medium transition-colors break-all"
                >
                  {BUSINESS_DATA.email}
                </a>
              </div>
            </div>

            {/* Horario */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-[#0E8C80] flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[13px] text-[#5e7082] uppercase tracking-wider block font-medium">
                  Horario de atención
                </span>
                <p className="text-[16px] text-[#06192f] font-medium">
                  {BUSINESS_DATA.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Foto del Local & Mapa interactivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foto del local */}
            <div className="rounded-2xl overflow-hidden border border-white/60 shadow-sm aspect-[4/3] relative group">
              <img
                src={IMAGES.fachadaLocal}
                alt="Fachada de Vidriería Central Santiago en Avenida Santa Rosa 648, Santiago Centro"
                loading="lazy"
                width="600"
                height="450"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
              />
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-[#06192f]/80 to-transparent text-white text-[12px] text-center font-medium">
                Santa Rosa 648, Santiago Centro
              </div>
            </div>

            {/* Mapa Embebido interactivo */}
            <div className="rounded-2xl overflow-hidden border border-white/60 shadow-sm aspect-[4/3] bg-white relative">
              <iframe
                title="Ubicación de Vidriería Central Santiago en Google Maps"
                src="https://maps.google.com/maps?q=Santa+Rosa+648,+Santiago,+Regi%C3%B3n+Metropolitana,+Chile&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen={false}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
