'use client'

import { SignInForm } from "@/app/sign-in/components/SignInForm";
import { withPublicRoute } from "@/hoc/with-public-route.hoc";

function SignIn() {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-background p-6 md:p-10 theme-transition">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  )
}

export default withPublicRoute(SignIn);
