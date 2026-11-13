// /register: the sign-up form, with what an account is for beside it.

import Link from "next/link";
import AuthPage from "@/components/auth/AuthPage/AuthPage";
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";

const STEPS = [
  {
    title: "Follow every request",
    copy: "See where each trip stands, from review to the ride itself.",
  },
  {
    title: "Pay by link",
    copy: "Pay when dispatch approves your trip, and keep every receipt.",
  },
  {
    title: "Book faster",
    copy: "Your details are saved, so the next ride takes less time.",
  },
];

export default function RegisterPageIntro() {
  return (
    <AuthPage
      eyebrow='Create account'
      heading={
        <>
          Create an
          <br />
          account
        </>
      }
      intro='It’s free and takes a minute. We’ll email you a link to confirm your address.'
      panelTitle='Why an account'
      steps={STEPS}
      panelNote={
        <>
          Booking for a company?{" "}
          <Link href='/corporate-accounts'>See corporate accounts</Link>.
        </>
      }
    >
      <RegisterForm />
    </AuthPage>
  );
}
