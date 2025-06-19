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
import { formSchema } from "./schemas"
import { useTranslations } from 'next-intl';
import type { FormValues } from "./schemas"

export function SignInForm() {
  const t = useTranslations('auth');
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
    <Card className="bg-background text-foreground border-border shadow-lg theme-transition">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-2xl font-semibold text-foreground theme-transition">
          {t('welcomeBack')}
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground theme-transition">
          {t('signInDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2 theme-transition">
                <Mail className="w-4 h-4 text-primary theme-transition" />
                {t('email')}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  {...register("email")}
                  className={cn(
                    "bg-secondary/50 text-foreground placeholder-muted-foreground border-border focus:ring-primary focus:border-primary rounded-md theme-transition",
                    errors.email && "border-destructive focus:border-destructive focus:ring-destructive"
                  )}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-2 flex items-center gap-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground flex items-center gap-2 theme-transition">
                  <Lock className="w-4 h-4 text-primary theme-transition" />
                  {t('password')}
                </Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline underline-offset-4 transition-colors"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={cn(
                    "bg-secondary/50 text-foreground placeholder-muted-foreground border-border focus:ring-primary focus:border-primary rounded-md theme-transition",
                    errors.password && "border-destructive focus:border-destructive focus:ring-destructive"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-destructive mt-2 flex items-center gap-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <PrimaryButton 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('signingIn')}
              </span>
            ) : (
              t('signIn')
            )}
          </PrimaryButton>

          <div className="text-center text-sm text-muted-foreground theme-transition">
            {t('dontHaveAccount')}{" "}
            <Link 
              href={AppRoute.SIGN_UP} 
              className="text-primary hover:underline underline-offset-4 transition-colors"
            >
              {t('signUp')}
            </Link>
          </div>
        </form>
      </CardContent>
      {error && <ErrorModal error={error} onClose={resetError}/>}
    </Card>
  )
}
