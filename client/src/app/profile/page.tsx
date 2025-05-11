'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import ProfileData from "@/components/UserInfo";

function ProfilePage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white pb-4">
        Profile
      </h1>
      <ProfileData />
    </div>
  );
}

export default withPrivateRoute(ProfilePage);
