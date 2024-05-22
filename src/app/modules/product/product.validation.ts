import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().trim().min(1, { message: 'Variant type is required' }),
  value: z.string().trim().min(1, { message: 'Variant value is required' }),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, { message: 'Quantity must be 0 or greater' }),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Product name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Product name is required' }),
  price: z.number().min(0, { message: 'Price must be 0 or greater' }),
  category: z.string().trim().min(1, { message: 'Category is required' }),
  tags: z
    .array(
      z.string().trim().min(1, { message: 'Tag must be a non-empty string' }),
    )
    .nonempty({ message: "Tags array can't be empty" }),
  variants: z
    .array(variantValidationSchema)
    .nonempty({ message: "Variants can't be empty" }),
  inventory: inventoryValidationSchema.required(),
});

export default productValidationSchema;
