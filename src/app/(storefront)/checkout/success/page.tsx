import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>

        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase! Your candy will be hand-delivered soon.
        </p>

        <div className="bg-muted/50 p-6 rounded-lg mb-8">
          <h2 className="font-semibold mb-2">What happens next?</h2>
          <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
            <li>✉️ You'll receive an order confirmation email</li>
            <li>📦 We'll prepare your candy order</li>
            <li>🚚 Hand delivery will be scheduled</li>
            <li>🍬 Enjoy your sweet treats!</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
