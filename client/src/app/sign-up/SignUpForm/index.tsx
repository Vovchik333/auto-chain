'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { useUserStore } from "@/stores/user/user.store"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { PrimaryButton } from "@/components/PrimaryButton"
import { ErrorModal } from "@/components/Erorr/ErrorModal"

const formSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormValues = z.infer<typeof formSchema>

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { signUp, error, resetError } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    signUp(data);
  }

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="bg-[#2A2F38] text-[#F0F0F0]">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F0F0F0]">Sign Up</CardTitle>
            <CardDescription className="text-[#A3A3A3]">
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-[#F0F0F0]">Username</Label>
                <Input
                  id="name"
                  {...register("username")}
                  placeholder="John Doe"
                  className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
                />
                {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#F0F0F0]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="mail@example.com"
                  className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-[#F0F0F0]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <PrimaryButton type="submit">
                Sign Up
              </PrimaryButton>
              <div className="mt-4 text-center text-sm text-[#A3A3A3]">
                Already have an account?{" "}
                <Link href={AppRoute.SIGN_IN} className="underline underline-offset-4 text-[#00FFC6]">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {error && (
        <ErrorModal error={error} onClose={resetError}/>
      )}
    </>
  )
}