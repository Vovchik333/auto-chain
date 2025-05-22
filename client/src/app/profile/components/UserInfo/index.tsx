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

const InputWrapper = ({ children, icon: Icon, label, error, success }: { 
  children: React.ReactNode; 
  icon: React.ElementType; 
  label: string;
  error?: string;
  success?: boolean;
}) => (
  <div className="space-y-2">
    <Label className="text-[#A3A3A3] flex items-center gap-2">
      <Icon className={`w-4 h-4 ${success ? 'text-green-400' : 'text-[#00FFC6]'}`} />
      {label}
    </Label>
    {children}
    {error && (
      <div 
        className="flex items-center gap-2 text-red-400 text-sm mt-1"
      >
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )}
    {success && (
      <div 
        className="flex items-center gap-2 text-green-400 text-sm mt-1"
      >
        <CheckCircle2 className="w-4 h-4" />
        Saved successfully
      </div>
    )}
  </div>
);

export default function ProfileData() {
  const [editing, setEditing] = useState(false);
  const [successFields, setSuccessFields] = useState<Record<string, boolean>>({});
  const { user, updateProfile, isLoading } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
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
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00FFC6]" />
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
      toast.success("Profile updated successfully");
      setTimeout(() => setSuccessFields({}), 3000);
      setEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-[#1A1F27] text-[#F0F0F0] border border-[#2A2F38]">
        <CardHeader>
          <CardTitle className="text-[#F0F0F0] text-xl">Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          {!editing ? (
            <div 
              className="space-y-6"
            >
              <div className="grid gap-4 p-4 bg-[#2A2F38] rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00FFC6]" />
                  <div>
                    <p className="text-sm text-[#A3A3A3]">Email</p>
                    <p className="text-[#F0F0F0]">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#00FFC6]" />
                  <div>
                    <p className="text-sm text-[#A3A3A3]">Username</p>
                    <p className="text-[#F0F0F0]">{user.username}</p>
                  </div>
                </div>
              </div>
              <PrimaryButton
                onClick={() => setEditing(true)}
                className="w-full sm:w-auto"
              >
                Edit Profile
              </PrimaryButton>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <InputWrapper 
                  icon={Mail} 
                  label="Email" 
                  error={errors.email?.message}
                  success={successFields.email}
                >
                  <Input
                    type="email"
                    className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6]"
                    {...register("email")}
                  />
                </InputWrapper>

                <InputWrapper 
                  icon={User} 
                  label="Username" 
                  error={errors.username?.message}
                  success={successFields.username}
                >
                  <Input
                    className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6]"
                    {...register("username")}
                  />
                </InputWrapper>
              </div>

              <div className="pt-4 border-t border-[#2A2F38] space-y-4">
                <InputWrapper 
                  icon={Lock} 
                  label="Change Password" 
                  error={errors.currentPassword?.message || errors.newPassword?.message || errors.confirmPassword?.message}
                  success={successFields.password}
                >
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Current password"
                      className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6] placeholder-[#A3A3A3]"
                      {...register("currentPassword")}
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6] placeholder-[#A3A3A3]"
                      {...register("newPassword")}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6] placeholder-[#A3A3A3]"
                      {...register("confirmPassword")}
                    />
                  </div>
                </InputWrapper>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <PrimaryButton
                  type="submit"
                  disabled={!isDirty || isLoading}
                  className="flex-1 relative"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => {
                    reset();
                    setEditing(false);
                  }}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none"
                  type="button"
                >
                  Cancel
                </SecondaryButton>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}