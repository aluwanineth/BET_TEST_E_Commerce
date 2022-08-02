export interface Data {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  description: string;
  price: number;
}

export interface ProductsResponse {
  pageNumber: number;
  pageSize: number;
  succeeded: boolean;
  message: string;
  errors?: any;
  data: Data[];
}


