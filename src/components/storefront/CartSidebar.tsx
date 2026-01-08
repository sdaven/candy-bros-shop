"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function CartSidebar() {
  const { items, total } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-24 w-64 bg-white border-2 border-purple-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center gap-2 mb-3">
        <ShoppingCart className="h-5 w-5 text-purple-600" />
        <span className="font-semibold text-purple-600">Your Cart</span>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Subtotal:</span>
          <span className="text-lg font-bold text-purple-600">
            ${total.toFixed(2)}
          </span>
        </div>

        <Link href="/cart">
          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
            Go to Cart
          </Button>
        </Link>
      </div>
    </div>
  );
}
