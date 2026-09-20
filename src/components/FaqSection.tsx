import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/businessData';

export const FaqSection: React.FC = () => {
  // First item open by default for immediate discoverability
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      aria-labelledby="faq-title"
    >
      <div className="text-center mb-12">
        <h2
          id="faq-title"
          className="text-[#06192f] text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-tight mb-4"
        >
          Preguntas frecuentes
        </h2>
        <p className="text-[#5e7082] text-[18px] leading-relaxed">
          Respuestas claras sobre nuestros servicios, materiales y formas de atención.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              id={`faq-item-${faq.id}`}
              className="vidrio-panel overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                id={`faq-button-${faq.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C80]"
              >
                <span className="text-[17.5px] sm:text-[19px] font-medium text-[#06192f] pr-2">
                  {faq.question}
                </span>
                <span
                  className={`w-9 h-9 rounded-full bg-white/70 border border-white/60 flex items-center justify-center flex-shrink-0 text-[#06192f] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#0E8C80] text-white border-[#0E8C80]' : ''
                  }`}
                >
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${faq.id}`}
                  className="px-5 pb-6 sm:px-6 sm:pb-6 text-[#5e7082] text-[16.5px] sm:text-[17px] leading-relaxed border-t border-white/40 pt-4"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
