export interface InventoryEntry {
  userId?: string;
  entryId?: string;
  productId: string;
  quantity: number;
  type: string;
  unitCost: number;
  observation: string;
  timestamp: Date;
}
