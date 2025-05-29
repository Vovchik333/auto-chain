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
import { zodResolver } from "@hookform/resolvers/zod"
import { PrimaryButton } from "@/components/PrimaryButton"
import { ErrorModal } from "@/components/Erorr/ErrorModal"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2, User } from "lucide-react"
import { formSchema, FormValues } from "./schemas"
import { useTranslations } from 'next-intl';

export function SignUpForm() {
  const t = useTranslations('auth');
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
    <div 
      className={"flex flex-col gap-6 w-full max-w-sm mx-auto"} 
    >
      <Card className="bg-[#1A1F27] text-[#F0F0F0] border border-[#2A2F38]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#F0F0F0]">{t('createAccount')}</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            {t('createAccountDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#F0F0F0] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00FFC6]" />
                  {t('username')}
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    {...register("username")}
                    placeholder={t('usernamePlaceholder')}
                    className={cn(
                      "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#2A2F38] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded-lg pl-4",
                      errors.username && "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                    disabled={isLoading}
                  />
                  {errors.username && (
                    <p 
                      className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                    >
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#F0F0F0] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00FFC6]" />
                  {t('email')}
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder={t('emailPlaceholder')}
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
                <Label htmlFor="password" className="text-[#F0F0F0] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00FFC6]" />
                  {t('password')}
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
                    {errors.password && (
                      <p 
                        className="text-sm text-red-500 mt-1.5 flex items-center gap-1.5"
                      >
                        {errors.password.message}
                      </p>
                    )}
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div 
                    className="mt-3 space-y-2"
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
                        • {t('passwordStrength.minLength')}
                      </div>
                      <div className={cn("text-[#A3A3A3]", passwordStrength.uppercase && "text-green-400")}>
                        • {t('passwordStrength.uppercase')}
                      </div>
                      <div className={cn("text-[#A3A3A3]", passwordStrength.lowercase && "text-green-400")}>
                        • {t('passwordStrength.lowercase')}
                      </div>
                      <div className={cn("text-[#A3A3A3]", passwordStrength.number && "text-green-400")}>
                        • {t('passwordStrength.number')}
                      </div>
                      <div className={cn("text-[#A3A3A3]", passwordStrength.special && "text-green-400")}>
                        • {t('passwordStrength.special')}
                      </div>
                    </div>
                  </div>
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
                    {t('signingUp')}
                  </span>
                ) : (
                  t('signUp')
                )}
              </PrimaryButton>
            </div>

            <div className="text-center text-sm text-[#A3A3A3]">
              {t('alreadyHaveAccount')}{" "}
              <Link 
                href={AppRoute.SIGN_IN} 
                className="text-[#00FFC6] hover:underline underline-offset-4 transition-colors"
              >
                {t('signIn')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      {error && <ErrorModal error={error} onClose={resetError}/>}
    </div>
  );
}