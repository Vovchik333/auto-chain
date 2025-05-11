const AppRoute = {
    ROOT: '/',
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in',
    SIGN_OUT: '/sign-out',
    WALLETS: '/wallets',
    TRANSACTIONS: '/transactions',
    PROFILE: '/profile',
    ANY: '*',
    SUGGESTIONS: '/suggestions'
} as const;

export { AppRoute };