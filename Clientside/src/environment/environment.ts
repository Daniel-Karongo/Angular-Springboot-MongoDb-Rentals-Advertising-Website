export const environments = {
    production: true,
    propertiesApiBaseUrl: 'http://localhost:9002/properties',
    propertiesResourcesEndpoints: {
        getAllRentals: '',
        getRental: '/property/{rentalId}',
        saveRental: '/property',
        searchRentals: '/properties/{text}',
    },
    ownersApiBaseUrl: 'http://localhost:9002/owners',
    ownersResourcesEndpoints: {
        getAllPropertyOwners: '',
        getPropertyOwner: '/owner/{id}',
        savePropertyOwner: '/owner',
        getAllOwnersProperties: '/properties/{ownerId}'
    }
};