'use client'

import { JSX, useEffect } from 'react'
import { useUserStore } from '@/stores/user/user.store'
import { redirect } from 'next/navigation'
import { AppRoute } from '@/common/enums/app-route'

export function withPrivateRoute<T extends JSX.IntrinsicAttributes>(Component: React.ComponentType<T>) {
  const PrivateRoute = (props: T) => {
    const { user } = useUserStore()

    useEffect(() => {
      if (user === null) {
        redirect(AppRoute.SIGN_IN)
      }
    }, [user])
  
    if (user === null) {
      return null;
    }

    return <Component {...props} />
  }

  return PrivateRoute;
}
