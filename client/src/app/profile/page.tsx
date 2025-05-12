'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import ProfileData from "@/app/profile/components/UserInfo";
import { ProfileHeader } from "./components/ProfileHeader";

function ProfilePage() {
  return (
    <>
      <ProfileHeader />
      <ProfileData />
    </>
  )
}

export default withPrivateRoute(ProfilePage);
