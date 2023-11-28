"use client";

import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function SignInForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        required
        placeholder="Enter your name"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Enter your password"
        minLength={6}
      />
      <button type="submit">Sign In</button>
      {state === "Invalid Credentials" && <div>Invalid Credentials</div>}
      {state === "CredentialsSignin" && <div>Wrong login or password</div>}
    </form>
  );
}
