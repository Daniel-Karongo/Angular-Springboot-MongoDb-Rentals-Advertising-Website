export const environments = {
    production: true,
    propertiesApiBaseUrl: 'http://localhost:9002/properties',
    propertiesResourcesEndpoints: {
        getAllRentals: '',
        getRental: '/property/',
        saveRental: '/property',
        searchRentals: '/properties/',
    },
    ownersApiBaseUrl: 'http://localhost:9002/owners',
    ownersResourcesEndpoints: {
        getAllPropertyOwners: '',
        getPropertyOwner: '/owner/',
        savePropertyOwner: '/owner',
        getAllOwnersProperties: '/properties/'
    },
    apiGatewayBaseUrl: 'http://localhost:9002',
    apiGatewayResourcesEndpoints: {
        registerUser: '/user/register',
        login: '/login',
        loginViaPostman: '/api/login',
        getUser: '/user'
    }
};