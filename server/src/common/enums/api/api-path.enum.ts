const ApiPath = {
    API: '/api',
    ROOT: '/',
    ID: '/:id',
    USERS: '/users',
    AUTH: '/auth',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    USER: '/user',
    WALLETS: '/wallets',
    FRAUD_REPORTS: '/fraud-reports',
    AUTH_CODE: '/auth-code',
    DIVERSIFICATION: '/diversification'
} as const;

export { ApiPath };
