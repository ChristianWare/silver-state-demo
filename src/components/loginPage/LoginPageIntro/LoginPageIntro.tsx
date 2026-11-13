// /login: the sign-in form, with what an account is for beside it.

import AuthPage from "@/components/auth/AuthPage/AuthPage";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

const STEPS = [
  {
    title: "Every ride in one place",
    copy: "Upcoming and past trips, and where each request stands.",
  },
  {
    title: "Payments and receipts",
    copy: "Pay by link when dispatch approves a trip, and keep every receipt.",
  },
  {
    title: "Book faster",
    copy: "Your details are saved, so the next ride takes less time.",
  },
];

export default function LoginPageIntro() {
  return (
    <AuthPage
      eyebrow='Log in'
      heading={
        <>
          Welcome
          <br />
          back
        </>
      }
      intro='Log in to see your rides, pay by link and book your next one.'
      panelTitle='Your account'
      steps={STEPS}
      panelNote='Booked without an account? Your confirmation email has a link to track your ride.'
    >
      <LoginForm />
    </AuthPage>
  );
}
