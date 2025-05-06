'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";

function Profile() {
  return (
    <h1 className="">
      Profile
    </h1>
  );
}

export default withPrivateRoute(Profile);
