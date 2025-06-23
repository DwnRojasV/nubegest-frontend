export interface Product {
  barCode?: string;
  brand: string;
  category: string;
  description: string;
  isActive?: boolean;
  minimumStock?: number;
  name: string;
  productId: string;
  purchasePrice?: number;
  salePrice?: number;
  unitOfMeasure?: string;
  userId: string;
  quantity?: number
}
