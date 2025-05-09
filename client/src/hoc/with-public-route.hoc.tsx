'use client'

import { JSX, useEffect } from 'react'
import { useUserStore } from '@/stores/user/user.store'
import { redirect } from 'next/navigation'
import { AppRoute } from '@/common/enums/app-route'

export function withPublicRoute<T extends JSX.IntrinsicAttributes>(Component: React.ComponentType<T>) {
  const PublicRoute = (props: T) => {
    const { user } = useUserStore()

    useEffect(() => {
      if (user !== null) {
        redirect(AppRoute.ROOT)
      }
    }, [user])
  
    return <Component {...props} />
  }

  return PublicRoute;
}
