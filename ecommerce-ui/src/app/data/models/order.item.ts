export interface OrderItem {
  id?: string;
  orderId: string;
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
