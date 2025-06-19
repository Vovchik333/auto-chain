'use client'

import { SignInForm } from "@/app/sign-in/components/SignInForm";
import { withPublicRoute } from "@/hoc/with-public-route.hoc";

function SignIn() {
  return (
    <div className="flex w-full items-center justify-center bg-background px-4 py-10 md:p-0 theme-transition">
      <div className="w-full max-w-[400px] mx-auto">
        <SignInForm />
      </div>
    </div>
  )
}

export default withPublicRoute(SignIn);
