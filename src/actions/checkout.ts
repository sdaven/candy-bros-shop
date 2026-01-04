"use server";

import { db } from "@/lib/db";
import { orders, orderItems, customers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  deliveryAddress: z.string().min(10, "Please provide a complete address"),
  deliveryInstructions: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        productName: z.string(),
        productPrice: z.number(),
        quantity: z.number().min(1),
      })
    )
    .min(1, "Cart is empty"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export async function createCheckoutSession(formData: CheckoutFormData) {
  try {
    // Validate input
    const validated = checkoutSchema.parse(formData);

    // Calculate totals
    const subtotal = validated.items.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );

    // Create or find customer
    let customer = await db.query.customers.findFirst({
      where: eq(customers.email, validated.email),
    });

    if (!customer) {
      [customer] = await db
        .insert(customers)
        .values({
          email: validated.email,
          name: validated.name,
          phone: validated.phone,
        })
        .returning();
    }

    // Create pending order
    const orderNumber = `CB-${Date.now()}`;
    const [order] = await db
      .insert(orders)
      .values({
        customerId: customer.id,
        orderNumber,
        deliveryAddress: validated.deliveryAddress,
        deliveryInstructions: validated.deliveryInstructions,
        subtotal: subtotal.toFixed(2),
        total: subtotal.toFixed(2),
        status: "pending",
      })
      .returning();

    // Create order items
    for (const item of validated.items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice.toFixed(2),
        quantity: item.quantity,
        subtotal: (item.productPrice * item.quantity).toFixed(2),
      });
    }

    // Create Stripe line items
    const lineItems = validated.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
        },
        unit_amount: Math.round(item.productPrice * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
      customer_email: validated.email,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    // Update order with Stripe session ID
    await db
      .update(orders)
      .set({ stripeSessionId: session.id })
      .where(eq(orders.id, order.id));

    return { success: true, url: session.url };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Checkout error:", error);
    return { success: false, error: "Failed to create checkout session" };
  }
}
