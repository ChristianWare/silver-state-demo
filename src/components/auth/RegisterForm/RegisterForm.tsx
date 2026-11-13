/* eslint-disable react-hooks/incompatible-library */
"use client";

// The sign-up form on /register. The password rules show as you type, and
// the fields turn green once they're right. On success, a link goes to the
// email to confirm it; the rider logs in after that.

import Link from "next/link";
import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  RegisterSchemaType,
  passwordRequirements,
} from "@/schemas/RegisterSchema";
import FormField from "../FormField/FormField";
import PasswordRequirements from "../PasswordRequirements/PasswordRequirements";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import { signUp } from "../../../../actions/auth/register";
import styles from "../AuthPage/AuthForm.module.css";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const nextQuery =
    next && next.startsWith("/") ? `?next=${encodeURIComponent(next)}` : "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange", // Validate on change for real-time feedback
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const isPasswordValid =
    password.length >= passwordRequirements.minLength &&
    passwordRequirements.hasUppercase.test(password) &&
    passwordRequirements.hasNumber.test(password);

  const isConfirmPasswordValid =
    confirmPassword.length > 0 && password === confirmPassword;

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      signUp(data).then((res) => {
        setError(res.error);
        setSuccess(
          res.success
            ? `Almost done. We've sent a link to ${data.email}: open it to confirm your email, then log in.`
            : "",
        );
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
          id='name'
          register={register}
          errors={errors}
          label='Name'
          disabled={isPending}
          autoComplete='off'
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

        <FormField
          id='password'
          register={register}
          errors={errors}
          type='password'
          label='Password'
          disabled={isPending}
          eye
          autoComplete='new-password'
          isValid={isPasswordValid && password.length > 0}
        >
          {password.length > 0 && !errors.password && (
            <PasswordRequirements password={password} />
          )}
        </FormField>

        <FormField
          id='confirmPassword'
          register={register}
          errors={errors}
          type='password'
          label='Confirm password'
          disabled={isPending}
          eye
          autoComplete='new-password'
          isValid={isConfirmPasswordValid}
        />

        {error && (
          <p
            className={`${styles.message} ${styles.messageError}`}
            role='alert'
          >
            {error}
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
          {isPending ? "Creating your account…" : "Create account"}
          <span className={styles.box} aria-hidden='true'>
            <Arrow className={styles.arrow} />
          </span>
        </button>
      </form>

      <p className={styles.switch}>
        Already have an account?{" "}
        <Link href={`/login${nextQuery}`} className={styles.link}>
          Log in
        </Link>
      </p>
    </div>
  );
}
