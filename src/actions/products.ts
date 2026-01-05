"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.string().min(0, "Price must be positive"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  stockQuantity: z.number().int().min(0, "Stock must be non-negative"),
  category: z.string().optional(),
  weight: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;

export async function getProducts() {
  try {
    const allProducts = await db.query.products.findMany({
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
    return { success: true, data: allProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data: product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.slug, slug),
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data: product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function createProduct(formData: ProductFormData) {
  try {
    const validated = productSchema.parse(formData);

    const [newProduct] = await db
      .insert(products)
      .values({
        ...validated,
        updatedAt: new Date(),
      })
      .returning();

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, data: newProduct };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: ProductFormData) {
  try {
    const validated = productSchema.parse(formData);

    const [updatedProduct] = await db
      .update(products)
      .set({
        ...validated,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    if (!updatedProduct) {
      return { success: false, error: "Product not found" };
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);

    return { success: true, data: updatedProduct };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.delete(products).where(eq(products.id, id));

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
