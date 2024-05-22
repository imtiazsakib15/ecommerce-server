export interface IVariant {
  type: string;
  value: string;
}

export interface IInventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Array<string>;
  variants: Array<IVariant>;
  inventory: IInventory;
}
