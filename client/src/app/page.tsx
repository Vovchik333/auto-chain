'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";

function Home() {
  return (
    <h1 className="font-bold underline">

    </h1>
  );
}

export default withPrivateRoute(Home);
