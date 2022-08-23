export interface User {
    id: number,
    name: string,
    email: string,
    address: string,
    class: string,
    phoneNumber: string,
    image?: Blob,
    isActive: boolean
}
