import { db } from "./db";
import { products } from "./db/schema";
import fs from "fs";
import path from "path";

interface ProductData {
  name: string;
  description: string;
  quantityPurchased: number;
  costPerUnit: number;
  pricePerUnit: number;
  notes?: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const productData: ProductData[] = [
  {
    name: "Kinder Joy Harry Potter",
    description: "Kinder Joy Eggs, Harry Potter Funko Collection, Sweet Cream and Chocolatey Wafers",
    quantityPurchased: 15,
    costPerUnit: 1.678,
    pricePerUnit: 4.00,
  },
  {
    name: "Mentos Strawberry",
    description: "Mentos Chewy Mint Candy Roll, Strawberry, Peanut and Tree Nut Free",
    quantityPurchased: 15,
    costPerUnit: 0.96,
    pricePerUnit: 2.00,
  },
  {
    name: "Hershey Kisses",
    description: "Milk Chocolate kisses",
    quantityPurchased: 24,
    costPerUnit: 1.00,
    pricePerUnit: 2.00,
  },
  {
    name: "Ring Pop Variety",
    description: "Ring pop - 2 for $3",
    quantityPurchased: 24,
    costPerUnit: 0.60,
    pricePerUnit: 1.50,
    notes: "2 for 3",
  },
  {
    name: "Blow Pop",
    description: "Gum Filled Lollipop - 2 for $1",
    quantityPurchased: 48,
    costPerUnit: 0.18,
    pricePerUnit: 0.50,
    notes: "2 for 1",
  },
  {
    name: "Hi-Chew Acai",
    description: "Japanese candy, soft, juicy acai flavored fruit chew",
    quantityPurchased: 15,
    costPerUnit: 0.87,
    pricePerUnit: 2.00,
  },
  {
    name: "Hi-Chew Bites",
    description: "Bite Sized unwrapped taffy candies in fruit flavors",
    quantityPurchased: 36,
    costPerUnit: 0.93,
    pricePerUnit: 2.00,
  },
  {
    name: "Kit Kat",
    description: 'A chocolate and wafer snack made of three layers of wafer separated by chocolate, with each layer being called a "finger"',
    quantityPurchased: 36,
    costPerUnit: 0.99,
    pricePerUnit: 2.00,
  },
  {
    name: "Twix",
    description: "Candy that is a crumbly cookie covered in caramel and milk chocolate",
    quantityPurchased: 108,
    costPerUnit: 0.97,
    pricePerUnit: 2.00,
  },
  {
    name: "Starburst FaveReds",
    description: "A mix of red fruit flavors, including strawberry, fruit punch, watermelon, and cherry, in one pack",
    quantityPurchased: 24,
    costPerUnit: 1.03,
    pricePerUnit: 2.50,
  },
  {
    name: "Carnival Swirl Lollipops",
    description: "Large round multi flavor lollipop",
    quantityPurchased: 10,
    costPerUnit: 0.35,
    pricePerUnit: 1.00,
  },
  {
    name: "Sour Patch Kids",
    description: "Soft, chewy, fruit-flavored candies with a sour sugar coating that changes to sweet as you eat them - 2 for $5",
    quantityPurchased: 48,
    costPerUnit: 1.02,
    pricePerUnit: 2.50,
    notes: "2 for 5",
  },
  {
    name: "Sour Skittles",
    description: "Sour candy-coated fruit flavored chewy candy - 2 for $5",
    quantityPurchased: 48,
    costPerUnit: 0.98,
    pricePerUnit: 2.50,
    notes: "2 for 5",
  },
  {
    name: "Original Skittles",
    description: "Original fruit flavored candy-coated chewy candy - 2 for $5",
    quantityPurchased: 72,
    costPerUnit: 1.03,
    pricePerUnit: 2.50,
    notes: "2 for 5",
  },
  {
    name: "Hubba Bubba Max",
    description: "Bubble gum - 2 for $3",
    quantityPurchased: 36,
    costPerUnit: 0.69,
    pricePerUnit: 1.50,
    notes: "2 for 3",
  },
  {
    name: "Nerds Ropes",
    description: "Chewy rope candy covered in crunchy Nerds - 2 for $5",
    quantityPurchased: 48,
    costPerUnit: 1.06,
    pricePerUnit: 2.50,
    notes: "2 for 5",
  },
];

export async function seedProducts() {
  console.log("🌱 Seeding products...");

  try {
    for (const product of productData) {
      const slug = generateSlug(product.name);

      await db.insert(products).values({
        name: product.name,
        slug: slug,
        description: product.description,
        price: product.pricePerUnit.toFixed(2),
        stockQuantity: product.quantityPurchased,
        isActive: true,
        category: "Candy",
        imageUrl: "", // Add product images later
      });

      console.log(`✅ Added: ${product.name} - $${product.pricePerUnit.toFixed(2)} (${product.quantityPurchased} in stock)`);
    }

    console.log("\n🎉 Successfully seeded all products!");
    console.log(`📦 Total products: ${productData.length}`);

    const totalValue = productData.reduce(
      (sum, p) => sum + p.pricePerUnit * p.quantityPurchased,
      0
    );
    console.log(`💰 Total inventory value: $${totalValue.toFixed(2)}`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
