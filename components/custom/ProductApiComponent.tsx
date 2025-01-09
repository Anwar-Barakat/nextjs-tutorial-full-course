'use client'

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/cards/Card";

// Define TypeScript interface for product
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ProductApiComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of high-quality products at competitive prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductApiComponent;
