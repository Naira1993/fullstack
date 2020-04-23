export interface Watch {
    title: string,
    model: string,
    price: number | string | Blob,
    like: any[],
    image?: File,
    user_email?: string,
    id?: string, 
    createdAt?: Date,
    updatedAt?: Date
}

export interface Cart {
    id?: string,
    user_id: string,
    price: number,
    items: Array<any>,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Order {
    id?: string,
    user_id: string,
    price: number,
    cart: any[],
    createdAt?: Date,
    updatedAt?: Date
}

export interface Comment {
    id?: string,
    user_email: string,
    watch_id: string,
    text: string,
    like?: string[],
    dislike?: string[],
    createdAt?: Date,
    updatedAt?: Date
}

