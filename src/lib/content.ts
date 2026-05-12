export const SITE_CONFIG = {
  name: "Montse Cespedosa",
  company: "MC Group",
  title: "Experta en Hipotecas",
  description:
    "27 años de experiencia bancaria al servicio de tu hipoteca. Expertos en conseguir las mejores condiciones con los bancos.",
  phone: "+34 625 65 16 95",
  email: "info@montsecespedosa.com",
  hours: "L-V: 9:00–14:00 y 16:00–18:00",
  registry: "Intermediario de Crédito Inmobiliario Nº D786",
  social: {
    instagram: "https://www.instagram.com/montse_cespedosa/",
    linkedin: "https://www.linkedin.com/in/montse-cespedosa/",
    youtube: "https://www.youtube.com/@MontseCespedosa",
    tiktok: "https://www.tiktok.com/@montse_cespedosa",
    telegram: "https://t.me/montsecespedosa",
  },
};

export const NAV_LINKS = [
  { label: "Consultoría", href: "#consultoria" },
  {
    label: "Hipotecas",
    href: "#servicios",
    children: [
      { label: "No residentes", href: "#no-residentes" },
      { label: "Cambio de banco", href: "#cambio-banco" },
      { label: "90-100% financiación", href: "#alta-financiacion" },
      { label: "Gestión integral", href: "#gestion-integral" },
      { label: "Autopromotor", href: "#autopromotor" },
    ],
  },
  { label: "Curso", href: "#formacion" },
  { label: "Contacto", href: "#contacto" },
];

export const HERO = {
  headline: "Expertos en",
  headlineAccent: "hipotecas",
  tagline:
    "La banca NO siempre gana, si tienes exbanqueros en tu equipo",
  description:
    "27 años de experiencia bancaria para que consigas la mejor hipoteca, sin pagar de más y sin letra pequeña.",
  cta: {
    primary: { label: "Agenda una consultoría", href: "#consultoria" },
    secondary: { label: "Explícanos tu caso", href: "#contacto" },
  },
  badge: "Top Voice en Finanzas · LinkedIn",
};

export const WHY_US_ITEMS = [
  {
    id: "exbankers",
    icon: "bank",
    title: "Exbanqueros de tu lado",
    description:
      "27 años dentro de la banca. Sabemos exactamente cómo negocian, qué esconden en el contrato y cómo conseguir las mejores condiciones.",
  },
  {
    id: "access",
    icon: "key",
    title: "Acceso directo con cuotas privadas",
    description:
      "Tenemos cuotas especiales con los principales bancos españoles que no están disponibles para el público general.",
  },
  {
    id: "review",
    icon: "shield",
    title: "Revisión completa de cláusulas",
    description:
      "Analizamos todos los seguros obligatorios, vinculaciones y cláusulas abusivas antes de que firmes nada.",
  },
  {
    id: "support",
    icon: "message",
    title: "Soporte directo por WhatsApp",
    description:
      "Acceso a nuestro grupo privado de WhatsApp con actualizaciones del mercado y respuesta directa a tus dudas.",
  },
];

export const SERVICES = [
  {
    id: "consultoria",
    title: "Consultoría Hipotecaria",
    description:
      "Sesión personalizada de 40 minutos para analizar tu caso en detalle. Evaluamos tu perfil financiero y te decimos exactamente qué hipoteca puedes conseguir y en qué condiciones.",
    price: "95€",
    duration: "40 min",
    highlight: true,
    href: "#consultoria",
  },
  {
    id: "no-residentes",
    title: "Hipotecas No Residentes",
    description:
      "Especialistas en hipotecas para compradores extranjeros o españoles no residentes. Gestionamos toda la operación desde cualquier país.",
    price: "Consultar",
    highlight: false,
    href: "#no-residentes",
  },
  {
    id: "cambio-banco",
    title: "Cambio de Banco",
    description:
      "¿Estás pagando de más? Negociamos la subrogación de tu hipoteca actual a un banco con mejores condiciones y te ahorramos miles de euros.",
    price: "Consultar",
    highlight: false,
    href: "#cambio-banco",
  },
  {
    id: "alta-financiacion",
    title: "Hipotecas 90–100%",
    description:
      "Acceso a los bancos que financian más del 90% del valor de la propiedad, para quienes no disponen del ahorro inicial del 20%.",
    price: "4.500€",
    highlight: false,
    href: "#alta-financiacion",
  },
  {
    id: "gestion-integral",
    title: "Gestión Integral",
    description:
      "Nos encargamos de todo el proceso hipotecario, desde el análisis inicial hasta la firma ante notario. Tú solo apareces a firmar.",
    price: "Consultar",
    highlight: false,
    href: "#gestion-integral",
  },
  {
    id: "autopromotor",
    title: "Hipoteca Autopromotor",
    description:
      "Financiación especializada para la construcción de tu propia vivienda. Gestionamos las disposiciones parciales con cada fase de obra.",
    price: "Consultar",
    highlight: false,
    href: "#autopromotor",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Análisis de tu caso",
    description:
      "Estudiamos tu situación financiera, ratio de endeudamiento, historial bancario y objetivos para definir el mejor escenario hipotecario.",
  },
  {
    number: "02",
    title: "Solicitud y negociación",
    description:
      "Enviamos tu expediente a los bancos con los que trabajamos directamente y negociamos en paralelo para conseguir las mejores condiciones.",
  },
  {
    number: "03",
    title: "Tramitación y firma",
    description:
      "Revisamos toda la documentación, cláusulas y seguros. Te acompañamos hasta la firma ante notario con total seguridad.",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Clientes atendidos" },
  { value: 27, suffix: " años", label: "Experiencia bancaria" },
  { value: 12, suffix: "+", label: "Medios de comunicación" },
  { value: 95, suffix: "%", label: "Tasa de éxito" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Laura P.",
    location: "Madrid",
    text: "Por 95€, el servicio justifica cada céntimo. Montse me explicó todo con una claridad que ningún banco me había dado jamás.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos M.",
    location: "Barcelona",
    text: "Gran respaldo tener a alguien como Montse en la negociación. Conseguimos 0,4 puntos menos de interés respecto a lo que nos ofrecía el banco directamente.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofía R.",
    location: "Valencia",
    text: "Caty, del equipo de Montse, es una experta accesible y detallista. Nos guió paso a paso y sin sorpresas desagradables en la firma.",
    rating: 5,
  },
  {
    id: 4,
    name: "Alejandro T.",
    location: "Sevilla",
    text: "Como no residente, pensé que sería imposible conseguir hipoteca en España. El equipo de MC Group lo hizo realidad en menos de dos meses.",
    rating: 5,
  },
  {
    id: 5,
    name: "Marta G.",
    location: "Bilbao",
    text: "El curso hipotecario de Montse debería ser obligatorio antes de hablar con cualquier banco. Ahorra tiempo, dinero y muchos disgustos.",
    rating: 5,
  },
];

export const MEDIA_OUTLETS = [
  "El País",
  "Cadena SER",
  "Telecinco",
  "Antena 3",
  "La Sexta",
  "Expansión",
  "El Mundo",
  "ABC",
  "20 Minutos",
  "Cope",
  "Onda Cero",
  "Idealista",
];

export const TRAINING = {
  title: "Curso de Hipotecas",
  subtitle: "Aprende a negociar como un exbanquero",
  description:
    "El único curso creado por una exdirectora de banco de 17 años que te enseña a entender, comparar y negociar tu hipoteca desde cero. Sin tecnicismos, sin letra pequeña, con ejemplos reales.",
  features: [
    "Qué miran realmente los bancos al analizar tu perfil",
    "Cómo negociar el tipo de interés y las vinculaciones",
    "Análisis de cláusulas abusivas más comunes",
    "Simuladores y plantillas de comparación",
    "Acceso de por vida y actualizaciones incluidas",
  ],
  cta: { label: "Quiero saber más", href: "#formacion" },
};

export const FAQ_ITEMS = [
  {
    question: "¿Cuánto cobráis por gestionar mi hipoteca?",
    answer:
      "Depende del servicio. La consultoría inicial cuesta 95€. Para la gestión integral, nuestros honorarios se acuerdan al inicio según la complejidad de la operación.",
  },
  {
    question: "¿Trabajáis con todos los bancos?",
    answer:
      "Trabajamos con los principales bancos españoles con los que tenemos acuerdos directos y cuotas especiales. No somos intermediarios de plataformas, sino asesores con acceso privilegiado.",
  },
  {
    question: "¿Qué diferencia a MC Group de otras brokers?",
    answer:
      "Montse fue directora de oficina bancaria durante 17 años. Conocemos la banca desde dentro: sus procesos, sus incentivos y sus puntos de negociación. Eso no tiene precio.",
  },
  {
    question: "¿También asesoráis a no residentes?",
    answer:
      "Sí, es uno de nuestros servicios especializados. Gestionamos hipotecas para compradores extranjeros y españoles no residentes con tramitación completamente online.",
  },
];
