'use client'

import { SignUpForm } from "@/app/sign-up/SignUpForm";
import { withPublicRoute } from "@/hoc/with-public-route.hoc";

function SignUp() {
  return (
    <div className="flex w-full items-center justify-center bg-background px-4 py-10 md:p-0 theme-transition">
      <div className="w-full max-w-[400px] mx-auto">
        <SignUpForm />
      </div>
    </div>
  )
}

export default withPublicRoute(SignUp);