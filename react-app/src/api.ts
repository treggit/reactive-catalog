export type User = {
    id: number,
    login: string,
    preferredCurrency: string
}

export type Product = {
    id: number,
    name: string,
    description: string | null,
    costValue: number,
    costCurrency: string
    seller: User
}

export type ProductCost = {
    value: number,
    currency: string
}