'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/user/user.store";
import { SecondaryButton } from "@/components/SecondaryButton";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Mail, User, Lock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProfileFormData, profileSchema } from "./schemas";
import { useTranslations } from 'next-intl';

const InputWrapper = ({ children, icon: Icon, label, error, success }: { 
  children: React.ReactNode; 
  icon: React.ElementType; 
  label: string;
  error?: string;
  success?: boolean;
}) => {
  const t = useTranslations('profile');
  return (
    <div className="space-y-2.5">
      <Label className="flex items-center gap-2.5 text-foreground theme-transition">
        <Icon className={`w-4 h-4 ${success ? 'text-green-400' : 'text-primary'} theme-transition`} />
        {label}
      </Label>
      {children}
      {error && (
        <div className="flex items-center gap-2.5 text-destructive text-sm mt-1.5 theme-transition">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2.5 text-green-400 text-sm mt-1.5 theme-transition">
          <CheckCircle2 className="w-4 h-4" />
          {t('savedSuccessfully')}
        </div>
      )}
    </div>
  );
};

export default function ProfileData() {
  const t = useTranslations('profile');
  const [editing, setEditing] = useState(false);
  const [successFields, setSuccessFields] = useState<Record<string, boolean>>({});
  const { user, updateProfile, isLoading } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
  });

  if (!user) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary theme-transition" />
    </div>
  );

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      setSuccessFields({
        email: data.email !== user.email,
        username: data.username !== user.username,
        password: Boolean(data.newPassword),
      });
      toast.success(t('updateSuccess'));
      setTimeout(() => setSuccessFields({}), 3000);
      setEditing(false);
    } catch (error) {
      toast.error(t('updateError'));
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="mx-auto mt-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="px-6 pt-6">
          <CardTitle>{t('accountInformation')}</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {!editing ? (
            <div className="space-y-6">
              <div className="grid gap-4 p-6 bg-secondary/50 rounded-2xl border border-border theme-transition">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary theme-transition" />
                  <div>
                    <p className="text-sm text-muted-foreground theme-transition">{t('email')}</p>
                    <p className="text-foreground theme-transition">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary theme-transition" />
                  <div>
                    <p className="text-sm text-muted-foreground theme-transition">{t('username')}</p>
                    <p className="text-foreground theme-transition">{user.username}</p>
                  </div>
                </div>
              </div>
              <PrimaryButton
                onClick={() => setEditing(true)}
                className="w-full sm:w-auto"
              >
                {t('editProfile')}
              </PrimaryButton>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              <div className="space-y-6">
                <InputWrapper 
                  icon={Mail} 
                  label={t('email')}
                  error={errors.email?.message}
                  success={successFields.email}
                >
                  <Input
                    type="email"
                    className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl theme-transition"
                    {...register("email")}
                  />
                </InputWrapper>

                <InputWrapper 
                  icon={User} 
                  label={t('username')}
                  error={errors.username?.message}
                  success={successFields.username}
                >
                  <Input
                    className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl theme-transition"
                    {...register("username")}
                  />
                </InputWrapper>
              </div>

              <div className="pt-6 border-t border-border space-y-6 theme-transition">
                <InputWrapper 
                  icon={Lock} 
                  label={t('changePassword')}
                  error={errors.currentPassword?.message || errors.newPassword?.message || errors.confirmPassword?.message}
                  success={successFields.password}
                >
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder={t('currentPasswordPlaceholder')}
                      className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
                      {...register("currentPassword")}
                    />
                    <Input
                      type="password"
                      placeholder={t('newPasswordPlaceholder')}
                      className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
                      {...register("newPassword")}
                    />
                    <Input
                      type="password"
                      placeholder={t('confirmPasswordPlaceholder')}
                      className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
                      {...register("confirmPassword")}
                    />
                  </div>
                </InputWrapper>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <PrimaryButton
                  type="submit"
                  disabled={!isDirty || isLoading}
                  className="flex-1 relative"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('saving')}
                    </span>
                  ) : (
                    t('saveChanges')
                  )}
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => {
                    setEditing(false);
                    reset();
                  }}
                  className="flex-1"
                >
                  {t('cancel')}
                </SecondaryButton>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}