"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, FileText, MessageSquare } from "lucide-react";

type Mode = "info" | "offer";

interface ContactFormProps {
  mode: Mode;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  designation: string;
  message: string;
}

const INITIAL: FormState = {
  fullName: "",
  email: "",
  phone: "",
  college: "",
  designation: "",
  message: "",
};

const COPY: Record<Mode, {
  eyebrow: string;
  title: string;
  subtitle: string;
  submit: string;
  successTitle: string;
  successBody: string;
  Icon: typeof FileText;
}> = {
  info: {
    eyebrow: "Institutional Partnerships",
    title: "Request more information.",
    subtitle:
      "Tell us a little about your institution. A member of our team will respond within two business days.",
    submit: "Send message",
    successTitle: "Message received.",
    successBody:
      "A confirmation has been sent to your email. We'll be in touch shortly.",
    Icon: MessageSquare,
  },
  offer: {
    eyebrow: "Partnership Offer Request",
    title: "Read the partnership offer.",
    subtitle:
      "Share a few details about your institution. We'll send a verified download link to your email.",
    submit: "Send my download link",
    successTitle: "Check your inbox.",
    successBody:
      "We've sent the partnership offer to your email as a one-click download link. Verify the email and the file is yours.",
    Icon: FileText,
  },
};

export const ContactForm = ({ mode }: ContactFormProps) => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const c = COPY[mode];

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.email.trim() || !form.college.trim() || !form.designation.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/college-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Something went wrong");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex-1 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/image-654.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.85) 50%, rgba(2,6,23,0.6) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 pt-16 pb-24 lg:pt-24 lg:pb-32">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <Link
              href="/colleges"
              className="flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to overview
            </Link>

            <div className="mt-16 mb-8 flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <c.Icon className="w-3.5 h-3.5 text-brand-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-300">
                {c.eyebrow}
              </span>
            </div>

            <h1 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white mb-6">
              {c.title}
            </h1>
            <p className="text-base lg:text-lg text-slate-300 leading-relaxed max-w-md">
              {c.subtitle}
            </p>

            {mode === "offer" && (
              <div className="mt-12 p-5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-2">
                  How it works
                </div>
                <ol className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="font-mono text-brand-accent">01</span>
                    <span>Submit your institutional details below.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-brand-accent">02</span>
                    <span>We email a verified download link to your address.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-brand-accent">03</span>
                    <span>Open the link to download the partnership offer.</span>
                  </li>
                </ol>
              </div>
            )}
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="relative bg-white text-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl">
              {done ? (
                <SuccessState
                  title={c.successTitle}
                  body={c.successBody}
                  email={form.email}
                  mode={mode}
                />
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Full name"
                      required
                      value={form.fullName}
                      onChange={update("fullName")}
                      placeholder="Dr. Anjali Mehta"
                    />
                    <Field
                      label="Designation"
                      required
                      value={form.designation}
                      onChange={update("designation")}
                      placeholder="Vice Chancellor"
                    />
                  </div>
                  <Field
                    label="Institution / college"
                    required
                    value={form.college}
                    onChange={update("college")}
                    placeholder="St. Edward's University"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Work email"
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="vc@stedwards.edu"
                    />
                    <Field
                      label="Phone"
                      optional
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 98xxx xxxxx"
                    />
                  </div>
                  <TextareaField
                    label={mode === "offer" ? "Anything we should know" : "Your message"}
                    optional={mode === "offer"}
                    required={mode === "info"}
                    value={form.message}
                    onChange={update("message")}
                    placeholder={
                      mode === "offer"
                        ? "Specific areas of interest, NAAC tier, current CRM, etc."
                        : "What would you like to learn more about?"
                    }
                  />

                  {error && (
                    <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                      By submitting, you agree to receive partnership communications. We won&apos;t share your details with third parties.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center gap-2 bg-slate-950 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-brand-DEFAULT transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          {c.submit}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  required,
  optional,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <label className="block">
    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 mb-2 inline-block">
      {label}
      {required && <span className="text-brand-DEFAULT ml-1">*</span>}
      {optional && <span className="text-slate-400 ml-1 normal-case tracking-normal text-[11px]">(optional)</span>}
    </span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-DEFAULT focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/10 transition-all"
    />
  </label>
);

const TextareaField = ({
  label,
  required,
  optional,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) => (
  <label className="block">
    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 mb-2 inline-block">
      {label}
      {required && <span className="text-brand-DEFAULT ml-1">*</span>}
      {optional && <span className="text-slate-400 ml-1 normal-case tracking-normal text-[11px]">(optional)</span>}
    </span>
    <textarea
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows={4}
      className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-DEFAULT focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/10 transition-all resize-none"
    />
  </label>
);

const SuccessState = ({
  title,
  body,
  email,
  mode,
}: {
  title: string;
  body: string;
  email: string;
  mode: Mode;
}) => (
  <div className="text-center py-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
    </div>
    <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">
      {title}
    </h2>
    <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto mb-2">
      {body}
    </p>
    <p className="text-sm text-slate-500 mb-8">
      Sent to <span className="font-mono text-slate-700">{email}</span>
    </p>
    {mode === "offer" && (
      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed mb-8">
        If you don&apos;t see the email within a few minutes, check your spam folder or contact{" "}
        <a
          href="mailto:institutions@coinsforcollege.org"
          className="text-brand-DEFAULT hover:underline"
        >
          institutions@coinsforcollege.org
        </a>
        .
      </p>
    )}
    <Link
      href="/colleges"
      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Return to overview
    </Link>
  </div>
);
