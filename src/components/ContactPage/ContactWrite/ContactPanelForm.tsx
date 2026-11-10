"use client";

// The contact page form. Posts to /api/contact, which emails the office,
// with the same fields as the shared ContactForm (first and last name,
// email, phone, subject as "serviceNeeded", message, and the honeypot).

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import styles from "./ContactWrite.module.css";

type Values = {
  website: string; // honeypot, must stay empty
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  message: string;
};

const SUBJECTS = [
  "A ride I've booked",
  "A new booking or quote",
  "Corporate account",
  "Wedding or group",
  "Lost property",
  "Something else",
];

export default function ContactPanelForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>();

  const onSubmit: SubmitHandler<Values> = async (values) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const err = (k: keyof Values) =>
    errors[k] ? (
      <span className={styles.error} role='alert'>
        Required
      </span>
    ) : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.honeypot} aria-hidden='true'>
        <input tabIndex={-1} autoComplete='off' {...register("website")} />
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>First name *</span>
          <input
            className={styles.input}
            autoComplete='given-name'
            aria-invalid={!!errors.firstName}
            {...register("firstName", { required: true })}
          />
          {err("firstName")}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Last name *</span>
          <input
            className={styles.input}
            autoComplete='family-name'
            aria-invalid={!!errors.lastName}
            {...register("lastName", { required: true })}
          />
          {err("lastName")}
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Email *</span>
          <input
            type='email'
            className={styles.input}
            autoComplete='email'
            aria-invalid={!!errors.email}
            {...register("email", { required: true })}
          />
          {err("email")}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Phone *</span>
          <input
            type='tel'
            className={styles.input}
            autoComplete='tel'
            aria-invalid={!!errors.phone}
            {...register("phone", { required: true })}
          />
          {err("phone")}
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Subject</span>
        <span className={styles.selectWrap}>
          <select
            className={styles.input}
            defaultValue=''
            {...register("serviceNeeded")}
          >
            <option value='' disabled>
              Choose a subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <svg
            className={styles.chevron}
            viewBox='0 0 24 24'
            width='14'
            height='14'
            aria-hidden='true'
          >
            <path
              d='M6 9l6 6 6-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Message *</span>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          rows={6}
          aria-invalid={!!errors.message}
          {...register("message", { required: true })}
        />
        {err("message")}
      </label>

      <div className={styles.submitRow}>
        <button type='submit' className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send the note"}
          <span className={styles.btnBox} aria-hidden='true'>
            <Arrow className={styles.btnArrow} />
          </span>
        </button>
        <p className={styles.privacy}>
          We use these details only to reply to you. See the{" "}
          <Link href='/privacy'>privacy policy</Link>.
        </p>
      </div>

      {status === "sent" && (
        <p className={styles.sent} role='status'>
          Thanks. We&apos;ll get back to you within one working day.
        </p>
      )}
      {status === "error" && (
        <p className={styles.error} role='alert'>
          Something went wrong. Please call or email us instead.
        </p>
      )}
    </form>
  );
}
