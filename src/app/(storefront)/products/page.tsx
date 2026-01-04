import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/storefront/ProductCard";

export default async function ProductsPage() {
  const result = await getProducts();
  const products = result.success ? result.data.filter(p => p.isActive) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Candy Collection</h1>
        <p className="text-muted-foreground text-lg">
          Browse our selection of premium candies
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
