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
import { PrimaryButton } from "@/components/PrimaryButton"
import { useUserStore } from "@/stores/user/user.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ErrorModal } from "@/components/Erorr/ErrorModal"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { signIn, error, resetError } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    signIn(data);
  }

  return (
    <>
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#2A2F38] text-[#F0F0F0]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#F0F0F0]">Sign In</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#F0F0F0]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={cn(
                    "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded",
                    errors.email && "border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[#F0F0F0]">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#00FFC6]"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={cn(
                    "bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded",
                    errors.password && "border-red-500"
                  )}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <PrimaryButton type="submit">
                Sign In
              </PrimaryButton>
            </div>

            <div className="mt-4 text-center text-sm text-[#A3A3A3]">
              Don&apos;t have an account?{" "}
              <Link href={AppRoute.SIGN_UP} className="underline underline-offset-4 text-[#00FFC6]">
                Sign up
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
