import { IMAGES } from '../assets/images';
import { BusinessInfo, ServiceItem, FaqItem, ReviewItem } from '../types';

export const BUSINESS_DATA: BusinessInfo = {
  name: 'Vidriería Central Santiago',
  address: 'Avda. Santa Rosa 648',
  commune: 'Santiago Centro',
  city: 'Santiago',
  country: 'Chile',
  mobilePhone: '+56 9 5991 4756',
  landlinePhone: '+56 22 222 6516',
  email: 'ventas@vidrieriacentralsantiago.cl',
  hours: 'Lunes a viernes, 10:00 a 18:30 hrs (horario continuado)',
  googleRating: 4.4,
  googleReviewsCount: 60,
  experienceYears: 60,
  googleMapsUrl: 'https://goo.gl/maps/QbtYiA7J33E2',
  whatsappNumberDigits: '56959914756',
};

export const POPULAR_GOOGLE_TOPICS = [
  { label: 'trabajo', count: 16 },
  { label: 'precios', count: 11 },
  { label: 'profesional', count: 5 },
  { label: 'ventanal', count: 4 },
  { label: 'coordinación', count: 3 },
  { label: 'mercado', count: 3 },
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'ALFREDO BAEZA',
    rating: 5,
    relativeTime: 'hace 7 meses',
    comment: 'Excelente empresa, muy buena experiencia, se destaca la amabilidad de su dueña que estuvo presente en toda la ejecución del proyecto, trabajo impecable y limpio y cumplió con los tiempos y lo más importante precios justo y trabajo de calidad. 100% recomendable.',
  },
  {
    id: 'rev-2',
    author: 'Departamentos Torre San Isidro',
    rating: 5,
    relativeTime: 'hace 2 meses',
    comment: 'Exitosa la instalación del vidrio en mi ventanal quedó firme,bien sellado y funcional... Abre, cierra y traba con normalidad, Lo mejor en tiempo récord resolvieron mi problema muy profesionales en Vidriería central Santiago, los recomiendo al 100%',
  },
  {
    id: 'rev-3',
    author: 'Erna Andaur',
    rating: 5,
    relativeTime: 'hace 10 meses',
    comment: 'Muy buen servicio: buena gestión en la coordinación gracias a la Sra. Elizabeth, amabilidad, puntualidad, y trabajo de muy buena calidad. Espero prontamente contar de nuevo con su servicio. La recomiendo 100%.',
    ownerResponse: {
      relativeTime: 'hace 10 meses',
      text: 'Gracias Sra. Erna por sus excelentes comentarios...estamos en contacto para fabricar e instalar las siguientes ventanas termopanel.',
    },
  },
  {
    id: 'rev-4',
    author: 'puelche73',
    rating: 5,
    relativeTime: 'hace 10 meses',
    comment: 'Muy buen servicio, muy buena calidad y variedad de los productos. Muy cordial el trato y mucha preocupación por satisfacer las necesidades del cliente, en especial de parte de la sra. Elizabeth. Muchas gracias',
    ownerResponse: {
      relativeTime: 'hace 10 meses',
      text: 'Muchas Gracias Don Claudio, por sus excelentes comentarios, para nosotros fue un agrado trabajar con una persona tan educada y amable como Ud.',
    },
  },
  {
    id: 'rev-5',
    author: 'Jeanette Martinez',
    rating: 5,
    relativeTime: 'hace 11 meses',
    comment: 'Muy buen servicio, rápido cumplen con la fecha, precio acorde al mercado. Muy recomendable.',
  },
  {
    id: 'rev-6',
    author: 'Edgar',
    rating: 5,
    relativeTime: 'hace 2 meses',
    comment: 'Todo perfecto. Cumplieron con los plazos de entrega solicitados. Excelente predisponían de todo el equipo. Recomendado',
  },
  {
    id: 'rev-7',
    author: 'Anibal Huenchuman',
    rating: 5,
    relativeTime: 'hace 3 meses',
    comment: 'Me costo mucho llegar a una empresa que sea seria para trabajar, excelentes precios, muy buenos trabajos totalmente recomendable 👍',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'vidrio-templado',
    slug: 'vidrio-templado',
    title: 'Vidrio templado',
    shortBenefit: 'Más seguro para tu casa o local: si se rompe, se fragmenta en trozos pequeños y no en filos peligrosos.',
    description: 'Es un vidrio de seguridad procesado térmicamente para aumentar notablemente su resistencia. En caso de rotura, se desintegra en pequeños fragmentos granulares en vez de astillas puntiagudas y cortantes, disminuyendo drásticamente el riesgo de lesiones graves en hogares, oficinas y locales comerciales.',
    image: IMAGES.vidrioTemplado,
    imageAlt: 'Divisiones de vidrio templado en una oficina',
    whatsappMessage: 'Hola, quiero cotizar vidrio templado',
    summaryBullets: [
      'Vidrio de seguridad que ante roturas se fragmenta en trozos pequeños sin bordes filosos.',
      'Fabricación e instalación a medida para divisiones, puertas y mamparas.',
      'Trabajo realizado por equipo con más de 60 años de experiencia y garantía en la instalación.'
    ],
    features: [
      'Vidrio de seguridad procesado para mayor resistencia',
      'Fragmentación en piezas pequeñas no cortantes',
      'Ideal para mamparas de baño, divisiones de oficina y puertas',
      'Instalación garantizada en cada trabajo'
    ]
  },
  {
    id: 'ventanas-termopanel',
    slug: 'ventanas-termopanel',
    title: 'Ventanas termopanel',
    shortBenefit: 'Menos frío en invierno y menos calor en verano. Dos cristales con cámara de aire seco mantienen estable la temperatura interior.',
    description: 'Estructura compuesta por dos cristales herméticamente sellados y separados por una cámara de aire seco. Su función principal es el aislamiento térmico continuo, reduciendo el traspaso de temperatura exterior hacia el interior y mejorando la eficiencia energética en viviendas y departamentos.',
    image: IMAGES.termopanel,
    imageAlt: 'Ventana termopanel de doble cristal con marco blanco',
    whatsappMessage: 'Hola, quiero cotizar ventanas termopanel',
    summaryBullets: [
      'Dos cristales sellados con cámara interna de aire seco para aislamiento térmico eficaz.',
      'Mantiene la temperatura ambiente interior más estable en invierno y verano.',
      'Confección e instalación con garantía en cada uno de nuestros trabajos.'
    ],
    features: [
      'Doble cristal con cámara estanca de aire deshidratado',
      'Aislación térmica efectiva todo el año',
      'Mayor confort interior frente a cambios de temperatura',
      'Garantía en cada uno de los trabajos'
    ]
  },
  {
    id: 'ventanas-de-aluminio',
    slug: 'ventanas-de-aluminio',
    title: 'Ventanas de aluminio',
    shortBenefit: 'Formas y tamaños a tu medida. No se corroen, aíslan del ruido y del frío, y necesitan poca mantención.',
    description: 'Soluciones de perfiles de aluminio fabricadas en diversas formas y dimensiones según el requerimiento de tu espacio. El aluminio ofrece una alta durabilidad inalterable ante la humedad, no se corroe, aporta propiedades ignífugas, es un material 100% reciclable y solo demanda una simple limpieza periódica.',
    image: IMAGES.ventanaAluminio,
    imageAlt: 'Ventanal de aluminio negro instalado en una vivienda',
    whatsappMessage: 'Hola, quiero cotizar ventanas de aluminio',
    summaryBullets: [
      'Amplia diversidad de formas y tamaños fabricados exactamente a medida.',
      'Material resistente al fuego que no se corroe y requiere mínima mantención.',
      'Aporte al aislamiento térmico y acústico con respaldo y garantía en la instalación.'
    ],
    features: [
      'Fabricación a medida en diversidad de formas y tamaños',
      'Alta resistencia a la corrosión y humedad',
      'Aporte al aislamiento térmico y acústico',
      'Material reciclable y con resistencia al fuego'
    ]
  },
  {
    id: 'reparacion-y-mantencion',
    slug: 'reparacion-y-mantencion',
    title: 'Reparación y mantención',
    shortBenefit: 'Cambiamos vidrios, espejos y cristales. Vidrio catedral de colores, laminados, templados, biselados y perforaciones.',
    description: 'Servicio técnico especializado en cambio y reparación de cristales dañados o desgastados, reposición de vidrios en ventanas existentes, montaje de espejos a medida de gran formato, cristales laminados para máxima seguridad, cristales catedral de colores clásicos, así como trabajos de precisión en biselados y perforaciones.',
    image: IMAGES.reparacionEspejo,
    imageAlt: 'Espejo grande con luz LED y cristal de ducha en un baño',
    whatsappMessage: 'Hola, quiero cotizar reparación y mantención',
    summaryBullets: [
      'Cambio y reparación oportuna de vidrios, cristales y espejos dañados.',
      'Trabajo con vidrio catedral de colores, laminados, templados, biselados y perforaciones.',
      'Más de 60 años de trayectoria con garantía en cada uno de nuestros trabajos.'
    ],
    features: [
      'Instalación y cambio de vidrios y espejos',
      'Vidrio catedral de colores y cristales laminados',
      'Cristales templados a medida',
      'Trabajos de biselados y perforaciones especializadas'
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 1,
    question: '¿Dónde están ubicados?',
    answer: 'En Avda. Santa Rosa 648, Santiago Centro, Chile.'
  },
  {
    id: 2,
    question: '¿Cuál es el horario de atención?',
    answer: 'Lunes a viernes de 10:00 a 18:30 horas, en horario continuado.'
  },
  {
    id: 3,
    question: '¿Cómo pido una cotización?',
    answer: 'Escríbenos por WhatsApp al +56 9 5991 4756, llámanos al +56 22 222 6516 o completa el formulario de contacto. Si puedes, envía una foto y las medidas.'
  },
  {
    id: 4,
    question: '¿Qué es el vidrio templado y por qué es más seguro?',
    answer: 'Es un vidrio de seguridad procesado para aumentar su resistencia. Al romperse se fragmenta en trozos pequeños en vez de grandes fragmentos dentados, con menos posibilidades de causar lesiones.'
  },
  {
    id: 5,
    question: '¿Qué gano con una ventana termopanel?',
    answer: 'Está formada por dos cristales separados por una cámara de aire seco. Su función principal es el aislamiento térmico: mantiene la temperatura interior más estable respecto de la exterior.'
  },
  {
    id: 6,
    question: '¿Por qué elegir ventanas de aluminio?',
    answer: 'El aluminio permite mayor diversidad de formas y tamaños, no se corroe, aísla del calor y del ruido, es reciclable y tiene alta resistencia al fuego. Solo requiere mantención de limpieza.'
  },
  {
    id: 7,
    question: '¿Hacen reparaciones y cambios de vidrio?',
    answer: 'Sí. Instalamos espejos y cristales, vidrio catedral de colores, cristales laminados y templados, además de biselados y perforaciones.'
  },
  {
    id: 8,
    question: '¿Los trabajos tienen garantía?',
    answer: 'Sí, ofrecemos garantía en cada uno de nuestros trabajos.'
  }
];

