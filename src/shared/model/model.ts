export type product = {
    id: number
    category: number
    title: string
    price: number
    images: string[]
}

export type category = {
    id: number
    title: string
}

export type productCard = {
    id: number
    category: number
    title: string
    images: string[]
    sku: string
    manufacturer: string
    color: string
    material: string
    reason: string
    season: string
    heelSize: string
    price: number
    oldPrice: number
    sizes: {
        size: string
        available: boolean
    }[]
}

export type itemOfCart = {
    product: productCard
    size: string
    count: number
}

export type order = {
    phone: string
    address: string
    items: itemOfCart[]
}