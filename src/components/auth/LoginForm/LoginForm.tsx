"use client";

// The sign-in form on /login. After signing in, the rider goes to `next`
// when it's a path on this site (the track page sends them back to their
// ride), otherwise to their account. An address that isn't confirmed yet
// gets a new confirmation link instead, and stays on the page.

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import FormField from "../FormField/FormField";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import { login } from "../../../../actions/auth/login";
import styles from "../AuthPage/AuthForm.module.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const next = searchParams.get("next");
  const safeNext = next && next.startsWith("/") ? next : null;
  const nextQuery = safeNext ? `?next=${encodeURIComponent(safeNext)}` : "";

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This email is already used with another way of signing in."
      : "";

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data, safeNext).then((res) => {
        if (res?.error) {
          setError(res.error);
          return;
        }

        // Not confirmed yet: a new link went out. Stay here.
        if (res?.success) {
          setSuccess(
            "Your email isn't confirmed yet. We've sent you a new link: open it, then log in.",
          );
          return;
        }

        router.replace(safeNext ?? "/dashboard");
        router.refresh();
      });
    });
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete='off'
        noValidate
      >
        {/* Honeypot inputs */}
        <input
          className={styles.honeypot}
          type='text'
          name='fake-username'
          autoComplete='username'
          tabIndex={-1}
          aria-hidden='true'
        />
        <input
          className={styles.honeypot}
          type='password'
          name='fake-password'
          autoComplete='new-password'
          tabIndex={-1}
          aria-hidden='true'
        />

        <FormField
          id='email'
          register={register}
          errors={errors}
          label='Email'
          disabled={isPending}
          type='email'
          autoComplete='off'
        />

        <div className={styles.passwordGroup}>
          <FormField
            id='password'
            register={register}
            errors={errors}
            type='password'
            label='Password'
            disabled={isPending}
            eye
            autoComplete='new-password'
          />
          <Link href='/forgot-password' className={styles.forgot}>
            Forgot password?
          </Link>
        </div>

        {(error || urlError) && (
          <p
            className={`${styles.message} ${styles.messageError}`}
            role='alert'
          >
            {error || urlError}
          </p>
        )}
        {success && (
          <p
            className={`${styles.message} ${styles.messageSuccess}`}
            role='status'
          >
            {success}
          </p>
        )}

        <button type='submit' className={styles.submit} disabled={isPending}>
          {isPending ? "Logging in…" : "Log in"}
          <span className={styles.box} aria-hidden='true'>
            <Arrow className={styles.arrow} />
          </span>
        </button>
      </form>

      <p className={styles.switch}>
        New here?{" "}
        <Link href={`/register${nextQuery}`} className={styles.link}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
