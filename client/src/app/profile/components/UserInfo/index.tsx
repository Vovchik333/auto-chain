'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/user/user.store";

type ProfileFormData = {
  email: string;
  username: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default function ProfileData() {
  const [editing, setEditing] = useState(false);
  const { user } = useUserStore();

  if (!user) return <p>Loading...</p>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      email: user.email,
      username: user.username,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    console.log("Updated data:", data);

    setEditing(false);
  };

  const email = watch("email");
  const username = watch("username");

  return (
    <Card className="bg-[#1A1F27] text-[#F0F0F0] border border-[#2A2F38]">
      <CardHeader>
        <CardTitle className="text-[#F0F0F0]">Information About You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!editing ? (
          <div className="space-y-4">
            <div>
              <Label className="text-[#A3A3A3]">Email:</Label>
              <p className="text-sm text-[#A3A3A3]">{email}</p>
            </div>
            <div>
              <Label className="text-[#A3A3A3]">Username:</Label>
              <p className="text-sm text-[#A3A3A3]">{username}</p>
            </div>
            <Button
              onClick={() => setEditing(true)}
              className="bg-[#2A2F38] text-[#00FFC6] hover:bg-[#00FFC6] hover:text-[#1A1F27] transition-colors"
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#A3A3A3]">Email:</Label>
              <Input
                id="email"
                type="email"
                className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6]"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="username" className="text-[#A3A3A3]">Username:</Label>
              <Input
                id="username"
                className="bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6]"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div className="pt-2 border-t border-[#2A2F38]">
              <Label className="text-[#A3A3A3]">Change Password (optional)</Label>
              <div className="space-y-2 mt-2">
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
                {watch("newPassword") &&
                  watch("confirmPassword") &&
                  watch("newPassword") !== watch("confirmPassword") && (
                    <p className="text-sm text-red-400">Passwords do not match</p>
                  )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="bg-[#00FFC6] text-[#1A1F27] hover:bg-[#33FFD4] transition-colors font-medium"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-[#2A2F38] text-[#F0F0F0] border-none hover:bg-[#3A3F48] hover:text-[#00FFC6] transition-colors"
                onClick={() => {
                  reset();
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}