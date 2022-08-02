import { OrderItem } from "./order.item";

interface Order {
  id: string;
  OrderId: string;
  orderNo: string;
  orderItems: OrderItem[];
  total: string;
}

enum GetOrderParams {
  cart = 'forCart',
  none = 'none'
}

enum UpdateOrderParams {
  customerEmail = "customerEmail",
  place = "place"
}

export { Order, GetOrderParams, UpdateOrderParams };
