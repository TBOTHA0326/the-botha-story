"use client";

import { FormEvent, useState } from "react";
import { hasSupabaseConfig, supabase } from "@/lib/supabaseClient";

type Status = "idle" | "submitting" | "success" | "error";

export default function RsvpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    if (!cleanFirstName || !cleanLastName) {
      setStatus("error");
      setMessage("Please enter both your name and surname.");
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setStatus("error");
      setMessage("We could not save your RSVP. Please try again or contact us directly.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const { error } = await supabase.from("rsvps").insert({
      first_name: cleanFirstName,
      last_name: cleanLastName
    });

    if (error) {
      setStatus("error");
      setMessage("We could not save your RSVP. Please try again.");
      return;
    }

    setStatus("success");
    setMessage("Thank you. Your RSVP has been saved.");
    setFirstName("");
    setLastName("");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="first-name" className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/52">
          Name
        </label>
        <input
          id="first-name"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="h-14 rounded-none border-0 border-b border-white/18 bg-transparent px-0 font-serif text-3xl text-white outline-none transition-colors duration-500 ease-silk placeholder:text-white/20 focus:border-camel"
          placeholder="Name"
          autoComplete="given-name"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="last-name" className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/52">
          Surname
        </label>
        <input
          id="last-name"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="h-14 rounded-none border-0 border-b border-white/18 bg-transparent px-0 font-serif text-3xl text-white outline-none transition-colors duration-500 ease-silk placeholder:text-white/20 focus:border-camel"
          placeholder="Surname"
          autoComplete="family-name"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex w-max items-center rounded-full bg-camel px-8 py-4 font-sans text-[11px] uppercase tracking-[0.28em] text-black transition-transform duration-700 ease-silk active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Saving" : "Send RSVP"}
      </button>

      {message ? (
        <p className={`font-sans text-sm leading-7 ${status === "success" ? "text-camel" : "text-white/70"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
