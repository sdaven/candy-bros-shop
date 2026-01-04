import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/storefront/ProductCard";

export default async function Home() {
  const result = await getProducts();
  const products = result.success ? result.data : [];
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-600 mb-6">
            Welcome to Candy Bros
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Premium candy delivered by hand to your doorstep.
            Sweet treats for every occasion!
          </p>
          <Link href="/products">
            <Button size="lg" className="text-lg px-8">
              Shop Now 🍬
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Treats</h2>
            <p className="text-muted-foreground">
              Check out our most popular candies
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available yet. Check back soon!
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-bold text-lg">Hand Delivered</h3>
              <p className="text-sm text-muted-foreground">
                Personal delivery service right to your door
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl mb-4">🍭</div>
              <h3 className="font-bold text-lg">Premium Selection</h3>
              <p className="text-sm text-muted-foreground">
                Curated collection of the best candies
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="font-bold text-lg">Perfect Gifts</h3>
              <p className="text-sm text-muted-foreground">
                Great for parties, events, and special occasions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
