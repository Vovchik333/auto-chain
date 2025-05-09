'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useState } from "react";
import { User } from "@/common/types/user/user.type";
import { useUserStore } from "@/stores/user/user.store";
import ProfileData from "@/components/UserInfo";

function ProfilePage() {
  return (
    <div className="max-w-2xl">
      <h1>
        Profile
      </h1>
      <ProfileData />
    </div>
  );
}

export default withPrivateRoute(ProfilePage);
