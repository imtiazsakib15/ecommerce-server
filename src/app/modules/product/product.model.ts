import { Schema, model } from 'mongoose';
import { IInventory, IProduct, IVariant } from './product.interface';

const variantSchema = new Schema<IVariant>(
  {
    type: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
  },
  {
    _id: false,
  },
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: {
      type: Number,
      require: true,
    },
    inStock: {
      type: Boolean,
      require: true,
    },
  },
  {
    _id: false,
  },
);

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  tags: [String],
  variants: [variantSchema],
  inventory: {
    type: inventorySchema,
    require: true,
  },
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
