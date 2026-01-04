import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <XCircle className="h-20 w-20 text-amber-600 mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-4">Checkout Cancelled</h1>

        <p className="text-lg text-muted-foreground mb-8">
          No worries! Your cart items are still saved.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/cart">
            <Button size="lg">Return to Cart</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
