'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";

function Security() {
  return (
    <h1 className="">
      Security
    </h1>
  );
}

export default withPrivateRoute(Security);
