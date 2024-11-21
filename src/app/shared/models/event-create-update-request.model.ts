export interface EventCreateUpdateRequest {
    id?: number,
    name: string,
    capacity: number,
    description: string,
    imagePath: string,
    categoryId: number,
    locationId: number,
    priceId: number
}