'use client'

import { SignUpForm } from "@/components/SignUpForm";
import { withPublicRoute } from "@/hoc/with-public-route.hoc";

function SignUp() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}

export default withPublicRoute(SignUp);