import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SERVICES, SITE } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Quote — Inter-Cleaning Services GTA" },
      {
        name: "description",
        content:
          "Request a free, no-obligation cleaning quote. We respond within 24 hours across the Greater Toronto Area.",
      },
      { property: "og:title", content: "Get a Free Quote — Inter-Cleaning" },
      { property: "og:description", content: "Free, no-obligation quote within 24 hours." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

const FREQUENCIES = ["One-time", "Weekly", "Bi-weekly", "Monthly"] as const;
const PROPERTY_TYPES = ["Apartment / Condo", "House", "Office", "Other"] as const;

function QuotePage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    service: SERVICES[0].slug,
    propertyType: PROPERTY_TYPES[0] as string,
    bedrooms: "2",
    bathrooms: "1",
    frequency: "Weekly" as string,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      toast.success("Quote request received! We'll be in touch within 24 hours.");
      setSent(true);
    }, 500);
  };

  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta to-orange opacity-95" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow mb-4 block">
            Free Quote
          </span>
          <h1 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tight leading-tight">
            Tell us about your space.
          </h1>
          <p className="text-white/85 text-lg mt-6 max-w-xl mx-auto">
            Three quick steps. Tailored estimate within 24 hours. No obligation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {sent ? (
            <div className="bg-white p-12 rounded-3xl ring-1 ring-charcoal/5 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-brand mx-auto mb-6 grid place-items-center">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4">Thank you, {data.firstName || "friend"}!</h2>
              <p className="text-charcoal/70 mb-8 max-w-md mx-auto">
                We received your request and will get back to you within 24 hours with a tailored
                quote. In the meantime, feel free to reach out at{" "}
                <a className="text-magenta font-bold" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white p-8 md:p-12 rounded-3xl ring-1 ring-charcoal/5">
              <Stepper step={step} />

              {step === 1 && (
                <div className="space-y-8 mt-10">
                  <h2 className="font-heading text-2xl font-bold">What do you need cleaned?</h2>
                  <Choices
                    label="Service"
                    value={data.service}
                    onChange={(v) => update("service", v)}
                    options={SERVICES.map((s) => ({ value: s.slug, label: s.name }))}
                  />
                  <Choices
                    label="Property type"
                    value={data.propertyType}
                    onChange={(v) => update("propertyType", v)}
                    options={PROPERTY_TYPES.map((p) => ({ value: p, label: p }))}
                  />
                  <Choices
                    label="Frequency"
                    value={data.frequency}
                    onChange={(v) => update("frequency", v)}
                    options={FREQUENCIES.map((f) => ({ value: f, label: f }))}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 mt-10">
                  <h2 className="font-heading text-2xl font-bold">Tell us about the space</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Bedrooms"
                      type="number"
                      min={0}
                      value={data.bedrooms}
                      onChange={(v) => update("bedrooms", v)}
                    />
                    <FormInput
                      label="Bathrooms"
                      type="number"
                      min={0}
                      value={data.bathrooms}
                      onChange={(v) => update("bathrooms", v)}
                    />
                  </div>
                  <FormInput
                    label="Address (city is enough)"
                    value={data.address}
                    onChange={(v) => update("address", v)}
                  />
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 block mb-2">
                      Anything we should know?
                    </label>
                    <textarea
                      value={data.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={4}
                      placeholder="Pets, fragile surfaces, access instructions..."
                      className="w-full rounded-2xl border border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 mt-10">
                  <h2 className="font-heading text-2xl font-bold">Your contact details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="First name"
                      required
                      value={data.firstName}
                      onChange={(v) => update("firstName", v)}
                    />
                    <FormInput
                      label="Last name"
                      required
                      value={data.lastName}
                      onChange={(v) => update("lastName", v)}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Email"
                      type="email"
                      required
                      value={data.email}
                      onChange={(v) => update("email", v)}
                    />
                    <FormInput
                      label="Phone"
                      type="tel"
                      required
                      value={data.phone}
                      onChange={(v) => update("phone", v)}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-12">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 text-charcoal/60 font-bold text-sm uppercase tracking-wider hover:text-magenta"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <span />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="bg-gradient-brand text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-brand text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
                  >
                    Send Request
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-3 flex-1">
          <div
            className={`w-8 h-8 rounded-full grid place-items-center text-xs font-bold transition-colors ${
              n <= step ? "bg-gradient-brand text-white" : "bg-zinc-100 text-charcoal/40"
            }`}
          >
            {n}
          </div>
          {n < 3 && (
            <div
              className={`h-px flex-1 ${n < step ? "bg-gradient-brand" : "bg-zinc-100"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Choices({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange(o.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold ring-1 transition-all ${
                active
                  ? "bg-gradient-brand text-white ring-transparent"
                  : "bg-white text-charcoal/70 ring-charcoal/10 hover:ring-magenta/40 hover:text-magenta"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  required,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 block mb-2">
        {label} {required && <span className="text-magenta">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        className="w-full rounded-full border border-charcoal/10 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
      />
    </div>
  );
}
