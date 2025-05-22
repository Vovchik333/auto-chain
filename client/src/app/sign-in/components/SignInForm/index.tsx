'use client'

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AppRoute } from "@/common/enums/app-route"
import { PrimaryButton } from "@/components/PrimaryButton"
import { useUserStore } from "@/stores/user/user.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ErrorModal } from "@/components/Erorr/ErrorModal"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { formSchema, FormValues } from "./schemas"

export function SignInForm() {
  const { signIn, error, resetError, isLoading } = useUserStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    await signIn(data);
  }

  return (
    <div 
      className={"flex flex-col gap-6 w-full max-w-sm mx-auto"}
    >
      <Card className="bg-[#1A1F27] text-[#F0F0F0] border border-[#2A2F38]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#F0F0F0]">Welcome Back</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#F0F0F0] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00FFC6]" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    className={cn(
                      "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#2A2F38] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded-lg pl-4",
                      errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p 
                      className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#F0F0F0] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#00FFC6]" />
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-sm text-[#00FFC6] hover:underline underline-offset-4 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={cn(
                      "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#2A2F38] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded-lg pr-10",
                      errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  {errors.password && (
                    <p 
                      className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <PrimaryButton 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </PrimaryButton>
            </div>

            <div className="text-center text-sm text-[#A3A3A3]">
              Don&apos;t have an account?{" "}
              <Link 
                href={AppRoute.SIGN_UP} 
                className="text-[#00FFC6] hover:underline underline-offset-4 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      {error && <ErrorModal error={error} onClose={resetError}/>}
    </div>
  )
}
