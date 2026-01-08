"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  stockQuantity: number;
}

export function ProductCard({ product }: { product: Product }) {
  const { items, addItem, removeItem, updateQuantity } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl || undefined,
    });
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl">🍬</div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description || "Delicious candy treat"}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {product.stockQuantity > 0 ? (
            <span className="text-xs text-green-600">In Stock</span>
          ) : (
            <span className="text-xs text-red-600">Out of Stock</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center p-4 pt-0">
        {quantity > 0 ? (
          <div className="flex items-center justify-between w-full border-2 border-yellow-400 rounded-md bg-yellow-50">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-10 w-10 hover:bg-yellow-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleIncrement}
              className="h-10 w-10 hover:bg-yellow-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="w-full"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
