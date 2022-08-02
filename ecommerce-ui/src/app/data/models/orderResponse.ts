export interface Data {
    orderId: number;
    productId: number;
    name: string;
    imageUrl: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderItemResponse {
    succeeded: boolean;
    message?: any;
    errors?: any;
    data: Data;
}



