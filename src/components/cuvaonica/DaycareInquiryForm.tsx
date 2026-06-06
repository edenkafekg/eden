"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/constants";

type FormState = "idle" | "submitting" | "success" | "error";

const MEAL_OPTIONS = [
  { value: "da", label: "Da" },
  { value: "ne", label: "Ne" },
  { value: "dogovor", label: "Želim da se dogovorimo" },
] as const;

export function DaycareInquiryForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      ime: data.get("ime"),
      telefon: data.get("telefon"),
      email: data.get("email"),
      uzrast: data.get("uzrast"),
      brojDece: data.get("brojDece"),
      danaNedeljno: data.get("danaNedeljno"),
      satiDnevno: data.get("satiDnevno"),
      dani: data.get("dani"),
      obroci: data.get("obroci"),
      napomena: data.get("napomena"),
    };

    try {
      await new Promise((r) => setTimeout(r, 800));
      console.info("Upit za čuvaonicu:", payload);
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-eden-green-light/30 bg-eden-bg p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-eden-headline text-3xl text-white">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-eden-headline">Hvala vam!</h3>
        <p className="mt-2 leading-relaxed">
          Primili smo vaš upit i javićemo vam se uskoro sa dodatnim informacijama i predlogom ponude.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm font-semibold text-eden-accent underline"
        >
          Pošaljite novi upit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-eden-cream-dark bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ime i prezime roditelja *" name="ime" required placeholder="Vaše ime" />
        <Field label="Broj telefona *" name="telefon" type="tel" required placeholder="061 xxx xxxx" />
        <Field
          label="Email adresa"
          name="email"
          type="email"
          placeholder="vas@email.com"
          className="sm:col-span-2"
        />
        <Field label="Uzrast deteta *" name="uzrast" required placeholder="npr. 3 godine" />
        <Field label="Broj dece *" name="brojDece" type="number" min={1} required placeholder="npr. 1" />
        <Field
          label="Koliko dana nedeljno vam je potrebna čuvaonica? *"
          name="danaNedeljno"
          required
          placeholder="npr. 2–3 dana"
        />
        <Field
          label="Koliko sati dnevno? *"
          name="satiDnevno"
          required
          placeholder="npr. 3–4 sata"
        />
        <Field
          label="Koji dani vam najviše odgovaraju? *"
          name="dani"
          required
          placeholder="npr. ponedeljak, sreda, petak"
          className="sm:col-span-2"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-eden-headline">
          Da li želite obroke u okviru ponude? *
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {MEAL_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-eden-cream-dark bg-eden-bg px-4 py-2.5 transition hover:border-eden-accent/40 has-[:checked]:border-eden-accent has-[:checked]:bg-eden-accent/5"
            >
              <input
                type="radio"
                name="obroci"
                value={option.value}
                required
                className="accent-eden-accent"
              />
              <span className="text-sm font-medium text-eden-headline">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="napomena" className="block text-sm font-semibold text-eden-headline">
          Dodatna napomena
        </label>
        <textarea
          id="napomena"
          name="napomena"
          rows={4}
          placeholder="Opišite raspored, posebne potrebe ili pitanja..."
          className="mt-1.5 w-full resize-y rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3 text-eden-headline placeholder:text-eden-paragraph/60 focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
        />
      </div>

      {state === "error" && (
        <p className="mt-4 text-sm text-eden-accent" role="alert">
          Došlo je do greške. Pozovite nas na {SITE.phone} ili pišite na {SITE.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 w-full rounded-full bg-eden-accent py-3.5 font-semibold text-white transition hover:bg-eden-headline disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {state === "submitting" ? "Šaljem..." : "Pošaljite upit"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-eden-headline">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        className="mt-1.5 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3 text-eden-headline placeholder:text-eden-paragraph/60 focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
      />
    </div>
  );
}
