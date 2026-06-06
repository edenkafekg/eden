"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { SITE } from "@/lib/constants";
import {
  ADULT_FOOD_OPTIONS,
  CHILD_COUNT_OPTIONS,
  CHILD_FOOD_OPTIONS,
  EXTRA_OPTIONS,
  PARENT_DRINK_OPTIONS,
  VISITED_OPTIONS,
} from "@/lib/birthday-form-options";

type FormState = "idle" | "submitting" | "success" | "error";

export function BirthdayBookingForm() {
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
      brojDece: data.get("brojDece"),
      brojOdraslih: data.get("brojOdraslih"),
      hranaDeca: data.getAll("hranaDeca"),
      hranaOdrasli: data.get("hranaOdrasli"),
      piceRoditelji: data.getAll("piceRoditelji"),
      ostalo: data.getAll("ostalo"),
      datum: data.get("datum"),
      rodjendan: data.get("rodjendan"),
      vecBili: data.get("vecBili"),
      poruka: data.get("poruka"),
    };

    try {
      await new Promise((r) => setTimeout(r, 800));
      console.info("Upit za letnju ponudu rođendana:", payload);
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
        <h3 className="mt-4 text-xl font-bold text-eden-headline">Hvala na upitu!</h3>
        <p className="mt-2">
          Primili smo vaš upit za letnju ponudu. Pripremićemo predlog po vašoj meri i kontaktiraćemo
          vas u najkraćem roku.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm font-semibold text-eden-accent underline"
        >
          Pošalji novi upit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-eden-cream-dark bg-white p-6 shadow-sm sm:p-8"
    >
      <fieldset className="space-y-8">
        <FormSection title="Vaši podaci">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ime i prezime *" name="ime" required placeholder="Vaše ime" />
            <Field label="Telefon *" name="telefon" type="tel" required placeholder="061 xxx xxxx" />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="vas@email.com"
              className="sm:col-span-2"
            />
          </div>
        </FormSection>

        <FormSection title="Broj gostiju">
          <RadioGroup
            legend="Koliko dece očekujete na rođendanu? *"
            name="brojDece"
            required
            options={CHILD_COUNT_OPTIONS}
          />
          <Field
            label="Koliko odraslih očekujete na rođendanu? *"
            name="brojOdraslih"
            type="number"
            min={0}
            required
            placeholder="npr. 10"
            className="mt-5"
          />
        </FormSection>

        <FormSection title="Hrana">
          <CheckboxGroup
            legend="Hrana za decu"
            name="hranaDeca"
            options={CHILD_FOOD_OPTIONS}
          />
          <div className="mt-6">
            <RadioGroup
              legend="Hrana za odrasle (izaberite jedno od ponuđenih) *"
              name="hranaOdrasli"
              required
              options={ADULT_FOOD_OPTIONS}
            />
          </div>
        </FormSection>

        <FormSection title="Piće za roditelje">
          <CheckboxGroup
            legend={
              <>
                Piće za roditelje (izaberite sve opcije za koje ste zainteresovani).{" "}
                <Link
                  href={SITE.cafeMenuPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-eden-accent underline hover:text-eden-headline"
                >
                  Pogledajte meni kafića (PDF)
                </Link>
              </>
            }
            name="piceRoditelji"
            options={PARENT_DRINK_OPTIONS}
          />
        </FormSection>

        <FormSection title="Dodatne usluge">
          <CheckboxGroup
            legend="Ostalo (izaberite sve što vas zanima)"
            name="ostalo"
            options={EXTRA_OPTIONS}
          />
        </FormSection>

        <FormSection title="Detalji proslave">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Datum rođendana *" name="datum" type="date" required />
            <Field
              label="Koji rođendan slavimo? *"
              name="rodjendan"
              required
              placeholder="npr. 5. rođendan"
            />
          </div>
          <div className="mt-6">
            <RadioGroup
              legend="Da li ste već bili u Edenu? *"
              name="vecBili"
              required
              options={VISITED_OPTIONS}
              inline
            />
          </div>
          <div className="mt-6">
            <label htmlFor="poruka" className="block text-sm font-semibold text-eden-headline">
              Dodatne napomene
            </label>
            <textarea
              id="poruka"
              name="poruka"
              rows={4}
              placeholder="Alergije, tema proslave, posebni zahtevi..."
              className="mt-1.5 w-full resize-y rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3 text-eden-headline placeholder:text-eden-paragraph/60 focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
            />
          </div>
        </FormSection>
      </fieldset>

      {state === "error" && (
        <p className="mt-4 text-sm text-eden-accent" role="alert">
          Došlo je do greške. Pozovite nas na {SITE.phone} ili pišite na {SITE.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-8 w-full rounded-full bg-eden-accent py-3.5 font-semibold text-white transition hover:bg-eden-headline disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {state === "submitting" ? "Šaljem..." : "Pošalji upit za ponudu"}
      </button>

      <p className="mt-4 text-xs text-eden-paragraph">
        Slanjem forme pristajete da vas kontaktiramo sa predlogom ponude. Rezervacija postaje važeća
        nakon naše potvrde.
      </p>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-eden-cream-dark bg-eden-bg/50 p-5 sm:p-6">
      <h3 className="text-lg font-bold text-eden-headline">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
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
        className="mt-1.5 w-full rounded-xl border border-eden-cream-dark bg-white px-4 py-3 text-eden-headline placeholder:text-eden-paragraph/60 focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
      />
    </div>
  );
}

function RadioGroup({
  legend,
  name,
  options,
  required,
  inline,
}: {
  legend: ReactNode;
  name: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  inline?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-eden-headline">{legend}</legend>
      <div className={`mt-3 ${inline ? "flex flex-wrap gap-3" : "grid gap-2 sm:grid-cols-2"}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border border-eden-cream-dark bg-white px-4 py-3 transition hover:border-eden-accent/40 has-[:checked]:border-eden-accent has-[:checked]:bg-eden-accent/5 ${
              inline ? "min-w-[120px]" : ""
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required={required}
              className="h-4 w-4 accent-eden-accent"
            />
            <span className="text-sm font-medium text-eden-headline">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: ReactNode;
  name: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-eden-headline">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-eden-cream-dark bg-white px-4 py-3 transition hover:border-eden-accent/40 has-[:checked]:border-eden-accent has-[:checked]:bg-eden-accent/5"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              className="h-4 w-4 rounded accent-eden-accent"
            />
            <span className="text-sm font-medium text-eden-headline">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
