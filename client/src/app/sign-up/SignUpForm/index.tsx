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
import { useUserStore } from "@/stores/user/user.store"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { PrimaryButton } from "@/components/PrimaryButton"
import { ErrorModal } from "@/components/Erorr/ErrorModal"
import { useState } from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Loader2, Github, User } from "lucide-react"
import { SecondaryButton } from "@/components/SecondaryButton"

const formSchema = z.object({
  username: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

type FormValues = z.infer<typeof formSchema>

export function SignUpForm({
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const { signUp, error, resetError, isLoading } = useUserStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const password = watch("password", "")
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }
  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  const onSubmit = async (data: FormValues) => {
    await signUp(data);
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)} 
        {...props}
      >
        <Card className="bg-[#1A1F27] text-[#F0F0F0] border border-[#2A2F38]">
          <CardHeader>
            <CardTitle className="text-2xl text-[#F0F0F0]">Create Account</CardTitle>
            <CardDescription className="text-[#A3A3A3]">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#F0F0F0] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00FFC6]" />
                    Username
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      {...register("username")}
                      placeholder="johndoe"
                      className={cn(
                        "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#2A2F38] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded-lg pl-4",
                        errors.username && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                      disabled={isLoading}
                    />
                    <AnimatePresence mode="wait">
                      {errors.username && (
                        <motion.p 
                          className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {errors.username.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#F0F0F0] flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#00FFC6]" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="m@example.com"
                      className={cn(
                        "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#2A2F38] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded-lg pl-4",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                      disabled={isLoading}
                    />
                    <AnimatePresence mode="wait">
                      {errors.email && (
                        <motion.p 
                          className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#F0F0F0] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#00FFC6]" />
                    Password
                  </Label>
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
                    <AnimatePresence mode="wait">
                      {errors.password && (
                        <motion.p 
                          className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password strength indicator */}
                  {password && (
                    <motion.div 
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              "h-1 w-full rounded-full transition-colors",
                              level <= strengthScore
                                ? strengthScore === 1
                                  ? "bg-red-500"
                                  : strengthScore === 2
                                  ? "bg-orange-500"
                                  : strengthScore === 3
                                  ? "bg-yellow-500"
                                  : strengthScore === 4
                                  ? "bg-green-400"
                                  : "bg-green-500"
                                : "bg-[#2A2F38]"
                            )}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={cn("text-[#A3A3A3]", passwordStrength.length && "text-green-400")}>
                          • At least 8 characters
                        </div>
                        <div className={cn("text-[#A3A3A3]", passwordStrength.uppercase && "text-green-400")}>
                          • One uppercase letter
                        </div>
                        <div className={cn("text-[#A3A3A3]", passwordStrength.lowercase && "text-green-400")}>
                          • One lowercase letter
                        </div>
                        <div className={cn("text-[#A3A3A3]", passwordStrength.number && "text-green-400")}>
                          • One number
                        </div>
                        <div className={cn("text-[#A3A3A3]", passwordStrength.special && "text-green-400")}>
                          • One special character
                        </div>
                      </div>
                    </motion.div>
                  )}
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
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </PrimaryButton>
              </div>

              <div className="text-center text-sm text-[#A3A3A3]">
                Already have an account?{" "}
                <Link 
                  href={AppRoute.SIGN_IN} 
                  className="text-[#00FFC6] hover:underline underline-offset-4 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ErrorModal error={error} onClose={resetError}/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}