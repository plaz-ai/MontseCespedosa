"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useModal } from "@/context/ModalContext";
import { SERVICES, SITE_CONFIG } from "@/lib/content";

gsap.registerPlugin(useGSAP);

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  servicio: string;
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  domicilio: string;
  provincia: string;
  localidad: string;
  codigoPostal: string;
  comoNosConociste: string;
  motivacion: string;
  consentimiento1: boolean;
  consentimiento2: boolean;
  consentimiento3: boolean;
};

const INITIAL_FORM: FormData = {
  servicio: "",
  nombre: "",
  dni: "",
  telefono: "",
  email: "",
  domicilio: "",
  provincia: "",
  localidad: "",
  codigoPostal: "",
  comoNosConociste: "",
  motivacion: "",
  consentimiento1: false,
  consentimiento2: false,
  consentimiento3: false,
};

const PROVINCIAS = [
  "Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz",
  "Barcelona","Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad Real",
  "Córdoba","Cuenca","Girona","Granada","Guadalajara","Guipúzcoa","Huelva",
  "Huesca","Illes Balears","Jaén","La Coruña","La Rioja","Las Palmas","León",
  "Lleida","Lugo","Madrid","Málaga","Murcia","Navarra","Ourense","Palencia",
  "Pontevedra","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria",
  "Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza",
];

const CANALES = ["TikTok","Instagram","YouTube","LinkedIn","Un amigo / conocido","Google","Otros"];

const STEPS = [
  { label: "Servicio",   short: "1" },
  { label: "Tus datos",  short: "2" },
  { label: "Dirección",  short: "3" },
  { label: "Confirmar",  short: "4" },
];

// ─── Field helpers ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-body font-semibold text-mc-text-muted uppercase tracking-widest mb-1.5">
        {label} {required && <span className="text-mc-orange">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text placeholder:text-mc-gray-400 focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all";

const selectCls =
  "w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all appearance-none cursor-pointer";

// ─── Main component ───────────────────────────────────────────────────────────

export function ConsultoriaModal() {
  const { isOpen, closeModal } = useModal();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // GSAP open/close animation
  useEffect(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (isOpen) {
      gsap.set(backdropRef.current, { display: "flex" });
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(panelRef.current, { opacity: 0, y: 16, scale: 0.97, duration: 0.2, ease: "power2.in" });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (backdropRef.current) backdropRef.current.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  // Animate step transitions
  const stepContentRef = useRef<HTMLDivElement>(null);
  const animateStep = () => {
    if (!stepContentRef.current) return;
    gsap.fromTo(
      stepContentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
  };

  const handleClose = () => {
    closeModal();
    // Reset after animation
    setTimeout(() => {
      setStep(0);
      setForm(INITIAL_FORM);
      setSubmitted(false);
    }, 300);
  };

  const update = (key: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const nextStep = () => {
    setStep((s) => s + 1);
    setTimeout(animateStep, 10);
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    setTimeout(animateStep, 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // ── Step canProceed guards ──
  const canProceed = [
    !!form.servicio,
    !!(form.nombre && form.dni && form.telefono && form.email),
    !!(form.domicilio && form.provincia && form.localidad && form.codigoPostal),
    !!(form.consentimiento1 && form.consentimiento3),
  ];

  return (
    <div
      ref={backdropRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[100] items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === backdropRef.current && handleClose()}
    >
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-mc-gray-200 flex-shrink-0">
          <div>
            <h2 className="font-display text-2xl font-semibold text-mc-text">
              Agenda tu consultoría
            </h2>
            <p className="font-body text-xs text-mc-text-muted mt-0.5">
              40 minutos · <span className="text-mc-orange font-semibold">95€</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-mc-gray-100 hover:bg-mc-gray-200 flex items-center justify-center text-mc-text-muted hover:text-mc-text transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="px-6 pt-4 pb-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-bold flex-shrink-0 transition-all duration-300 ${
                    i < step ? "bg-mc-orange text-white" :
                    i === step ? "bg-mc-orange text-white ring-4 ring-mc-orange/20" :
                    "bg-mc-gray-100 text-mc-gray-400"
                  }`}>
                    {i < step ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : s.short}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 rounded transition-all duration-300 ${i < step ? "bg-mc-orange" : "bg-mc-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {STEPS.map((s, i) => (
                <span key={s.label} className={`text-[10px] font-body ${i === step ? "text-mc-orange font-semibold" : "text-mc-gray-400"}`}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {submitted ? (
            <SuccessView onClose={handleClose} />
          ) : (
            <form onSubmit={handleSubmit}>
              <div ref={stepContentRef}>
                {step === 0 && <Step1 form={form} update={update} />}
                {step === 1 && <Step2 form={form} update={update} />}
                {step === 2 && <Step3 form={form} update={update} />}
                {step === 3 && <Step4 form={form} update={update} onSubmit={handleSubmit} />}
              </div>
            </form>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-mc-gray-200 bg-white flex-shrink-0">
            <button
              type="button"
              onClick={step === 0 ? handleClose : prevStep}
              className="flex items-center gap-1.5 text-sm font-body text-mc-text-muted hover:text-mc-text transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {step === 0 ? "Cancelar" : "Anterior"}
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed[step]}
                className="flex items-center gap-1.5 bg-mc-orange text-white font-body font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-mc-orange-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Continuar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                form="consultoria-form"
                disabled={!canProceed[3]}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-mc-orange text-white font-body font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-mc-orange-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Enviar solicitud
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ form, update }: { form: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      {/* Info card */}
      <div className="bg-mc-orange/8 border border-mc-orange/20 rounded-2xl p-4 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-xl bg-mc-orange flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-mc-text">Consultoría personalizada</p>
          <p className="font-body text-xs text-mc-text-muted mt-0.5">
            40 minutos con Montse o su equipo para analizar tu caso en detalle.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-mc-orange">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              95,00€
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-body text-mc-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              40 minutos
            </span>
          </div>
        </div>
      </div>

      <Field label="¿Para qué servicio?" required>
        <div className="relative">
          <select
            value={form.servicio}
            onChange={(e) => update("servicio", e.target.value)}
            className={selectCls}
            required
          >
            <option value="">Selecciona un servicio...</option>
            <option value="consultoria">Consultoría hipotecaria general</option>
            <option value="no-residentes">Hipoteca para no residentes</option>
            <option value="cambio-banco">Cambio de banco (subrogación)</option>
            <option value="alta-financiacion">Hipoteca 90–100% financiación</option>
            <option value="gestion-integral">Gestión integral de hipoteca</option>
            <option value="autopromotor">Hipoteca autopromotor</option>
            <option value="otro">Otro / no estoy seguro</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-mc-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </Field>

      <p className="text-[11px] font-body text-mc-gray-400 leading-relaxed">
        El pago de los 95€ se realizará una vez confirmada la disponibilidad de agenda.
        Recibirás los detalles por email.
      </p>
    </div>
  );
}

function Step2({ form, update }: { form: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-body text-mc-text-muted">
        Estos datos son necesarios para identificarte y poder contactarte antes de la sesión.
      </p>
      <Field label="Nombre completo" required>
        <input
          type="text"
          value={form.nombre}
          onChange={(e) => update("nombre", e.target.value)}
          placeholder="Nombre y apellidos"
          required
          className={inputCls}
        />
      </Field>
      <Field label="DNI / NIE" required>
        <input
          type="text"
          value={form.dni}
          onChange={(e) => update("dni", e.target.value)}
          placeholder="12345678A"
          required
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Teléfono" required>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder="+34 600 000 000"
            required
            className={inputCls}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="tu@email.com"
            required
            className={inputCls}
          />
        </Field>
      </div>
    </div>
  );
}

function Step3({ form, update }: { form: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-body text-mc-text-muted">
        Datos necesarios para el expediente hipotecario.
      </p>
      <Field label="Domicilio" required>
        <input
          type="text"
          value={form.domicilio}
          onChange={(e) => update("domicilio", e.target.value)}
          placeholder="Calle, número, piso..."
          required
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Provincia" required>
          <div className="relative">
            <select
              value={form.provincia}
              onChange={(e) => update("provincia", e.target.value)}
              className={selectCls}
              required
            >
              <option value="">Provincia...</option>
              {PROVINCIAS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-mc-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </Field>
        <Field label="Localidad" required>
          <input
            type="text"
            value={form.localidad}
            onChange={(e) => update("localidad", e.target.value)}
            placeholder="Ciudad o municipio"
            required
            className={inputCls}
          />
        </Field>
      </div>
      <Field label="Código Postal" required>
        <input
          type="text"
          value={form.codigoPostal}
          onChange={(e) => update("codigoPostal", e.target.value)}
          placeholder="28001"
          maxLength={5}
          required
          className={`${inputCls} max-w-[140px]`}
        />
      </Field>
      <Field label="¿Cómo nos conociste?">
        <div className="flex flex-wrap gap-2">
          {CANALES.map((canal) => (
            <button
              key={canal}
              type="button"
              onClick={() => update("comoNosConociste", canal)}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-medium border transition-all ${
                form.comoNosConociste === canal
                  ? "bg-mc-orange border-mc-orange text-white"
                  : "bg-white border-mc-gray-200 text-mc-text-muted hover:border-mc-orange/50"
              }`}
            >
              {canal}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Cuéntanos tu caso">
        <textarea
          value={form.motivacion}
          onChange={(e) => update("motivacion", e.target.value)}
          rows={3}
          placeholder="Tipo de propiedad, precio, situación laboral, consulta específica..."
          className={`${inputCls} resize-none`}
        />
      </Field>
    </div>
  );
}

function Step4({
  form,
  update,
  onSubmit,
}: {
  form: FormData;
  update: (k: keyof FormData, v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="bg-mc-cream rounded-2xl p-4 space-y-2">
        <p className="text-xs font-body font-semibold text-mc-text-muted uppercase tracking-widest mb-3">
          Resumen de tu solicitud
        </p>
        {[
          { label: "Servicio", value: form.servicio },
          { label: "Nombre", value: form.nombre },
          { label: "Email", value: form.email },
          { label: "Teléfono", value: form.telefono },
          { label: "Localidad", value: `${form.localidad}, ${form.provincia}` },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <span className="text-xs font-body text-mc-text-muted flex-shrink-0">{label}</span>
            <span className="text-xs font-body font-medium text-mc-text text-right">{value || "—"}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-mc-gray-200 flex items-center justify-between">
          <span className="text-sm font-body font-semibold text-mc-text">Total</span>
          <span className="text-lg font-display font-bold text-mc-orange">95,00€</span>
        </div>
      </div>

      {/* Consents */}
      <div className="space-y-3">
        <p className="text-xs font-body font-semibold text-mc-text-muted uppercase tracking-widest">
          Autorizaciones
        </p>
        {[
          {
            key: "consentimiento1" as const,
            required: true,
            text: "Autorizo el tratamiento de mis datos personales para la prestación del servicio de intermediación de crédito inmobiliario por parte de MC Group.",
          },
          {
            key: "consentimiento2" as const,
            required: false,
            text: "Acepto que mis datos sean compartidos con entidades financieras con el fin de obtener ofertas hipotecarias personalizadas.",
          },
          {
            key: "consentimiento3" as const,
            required: true,
            text: "He leído y acepto los términos y condiciones y la política de privacidad de MC Group.",
          },
        ].map(({ key, required, text }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => update(key, !form[key])}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                form[key]
                  ? "bg-mc-orange border-mc-orange"
                  : "border-mc-gray-200 group-hover:border-mc-orange/50"
              }`}
            >
              {form[key] && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xs font-body text-mc-text-muted leading-relaxed">
              {text}{" "}
              {required && <span className="text-mc-orange">*</span>}
            </span>
          </label>
        ))}
      </div>

      <p className="text-[11px] font-body text-mc-gray-400 leading-relaxed">
        {SITE_CONFIG.registry}. Información regulada bajo la Ley 5/2019 de Crédito Inmobiliario.
      </p>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-8 gap-5">
      <div className="w-16 h-16 rounded-full bg-mc-orange/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-mc-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold text-mc-text mb-2">
          ¡Solicitud enviada!
        </h3>
        <p className="font-body text-sm text-mc-text-muted leading-relaxed max-w-xs">
          Te contactaremos en menos de 24 horas hábiles para confirmar la disponibilidad
          y enviarte los detalles del pago.
        </p>
      </div>
      <div className="w-full bg-mc-cream rounded-2xl p-4 text-left">
        <p className="text-xs font-body font-semibold text-mc-text-muted uppercase tracking-widest mb-2">
          Próximos pasos
        </p>
        {[
          "Revisamos tu solicitud (máx. 24h)",
          "Te enviamos email de confirmación con enlace de pago",
          "Confirmas el pago de 95€",
          "Sesión de 40 min con Montse o su equipo",
        ].map((step, i) => (
          <div key={step} className="flex items-start gap-3 py-1.5">
            <span className="w-5 h-5 rounded-full bg-mc-orange/10 text-mc-orange text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-xs font-body text-mc-text">{step}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="bg-mc-orange text-white font-body font-semibold text-sm px-8 py-3 rounded-full hover:bg-mc-orange-dark transition-all"
      >
        Cerrar
      </button>
    </div>
  );
}
