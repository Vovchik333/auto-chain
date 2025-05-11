'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import ProfileData from "@/app/profile/components/UserInfo";

function ProfilePage() {
  return (
    <div className="w-full bg-[#1A1F27] p-4 rounded-xl border border-[#2A2F38]">
      <h2 className="text-2xl font-semibold text-[#F0F0F0] mb-4">
        Profile
      </h2>
      <ProfileData />
    </div>
  )
}

export default withPrivateRoute(ProfilePage);
