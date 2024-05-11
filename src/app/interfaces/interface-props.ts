export interface Product {
    id: number;
    name: string;
    brand: string;
    quantity: number;
    description: string;
    photo: string;
    price: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsResponse {
    products: Product[];
    count: number;
}

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    photo: string;
}