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
    IMPORT_FROM_ETHERSCAN: '/import-from-etherscan',
    IMPORT_FROM_CSV: '/import-from-csv',
    EXPORT_TO_CSV: '/export-to-csv',
    TRANSACTIONS: '/transactions',
    DIVERSIFICATION: '/diversification'
} as const;

export { ApiPath };
