"use client";

import { register } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function SignUpForm() {
  const [state, dispatch] = useFormState(register, undefined);

  return (
    <form action={dispatch}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Enter your email"
      />
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
      <button type="submit">Sign Up</button>
      {state === "Invalid Credentials" && <div>Invalid Credentials</div>}
    </form>
  );
}
