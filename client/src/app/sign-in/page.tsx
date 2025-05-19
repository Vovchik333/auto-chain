'use client'

import { SignInForm } from "@/app/sign-in/components/SignInForm";
import { withPublicRoute } from "@/hoc/with-public-route.hoc";

function SignIn() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  )
}

export default withPublicRoute(SignIn);
