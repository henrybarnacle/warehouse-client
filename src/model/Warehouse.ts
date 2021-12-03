export type Warehouse = {
    warehouseId: string,
    warehouseName: string,
    warehouseDescription: string,
    warehouseAddress: Address
}

type Address = {
    buildingName: string,
    streetLine1: string,
    streetLine2: string,
    city: string, 
    stateProvince: string,
    zipPostalCode: string,
    country: string
}