const ApiPath = {
    API: '/api',
    ROOT: '/',
    ID: '/:id',
    USERS: '/users',
    AUTH: '/auth',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    USER: '/user',
    TRANSACTIONS: '/transactions',
    ASSETS: '/assets',
    PORTFOLIOS: '/portfolios',
    COINS: '/coins'
} as const;

export { ApiPath };
