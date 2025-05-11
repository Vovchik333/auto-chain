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
    <Card>
      <CardHeader>
        <CardTitle>Information About You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!editing ? (
          <div className="space-y-4">
            <div>
              <Label>Email:</Label>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <div>
              <Label>Username:</Label>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
            </div>

            <div className="pt-2 border-t">
              <Label>Change Password (optional)</Label>
              <div className="space-y-2 mt-2">
                <Input
                  type="password"
                  placeholder="Current password"
                  {...register("currentPassword")}
                />
                <Input
                  type="password"
                  placeholder="New password"
                  {...register("newPassword")}
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                />
                {watch("newPassword") && watch("confirmPassword") && watch("newPassword") !== watch("confirmPassword") && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
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