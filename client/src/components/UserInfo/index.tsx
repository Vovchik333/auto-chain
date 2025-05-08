'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const userData = {
  id: "12345",
  email: "user@example.com",
  username: "exampleuser",
};

export default function ProfileData() {
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: userData,
  });

  const onSubmit = (data: typeof userData) => {
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
              <Label className="mb-2">Email:</Label>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <div>
              <Label className="mb-2">Username:</Label>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-2" htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label className="mb-2" htmlFor="username">Username:</Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
              )}
            </div>
            <div className="flex gap-2">
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
