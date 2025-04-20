const ApiPath = {
    API: '/api',
    ROOT: '/',
    ID: '/:id',
    USERS: '/users',
    AUTH: '/auth',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    USER: '/user',
    CHECK_USER_ADDRESS: '/check-user-address',
} as const;

export { ApiPath };
