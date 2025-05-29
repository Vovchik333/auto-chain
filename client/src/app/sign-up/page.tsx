'use client'

import { SignUpForm } from "@/app/sign-up/SignUpForm";
import { withPublicRoute } from "@/hoc/with-public-route.hoc";

function SignUp() {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-background p-6 md:p-10 theme-transition">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}

export default withPublicRoute(SignUp);