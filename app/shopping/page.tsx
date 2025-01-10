'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from '@/components/ui/skeleton'
import { useDebounce } from 'use-debounce'
import { AlertCircle, Star, ShoppingCart } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

async function getProducts() {
    try {
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

export default function ShoppingPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 1000,
        sortBy: 'featured'
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [debouncedSearch] = useDebounce(filters.search, 300)
    const [cart, setCart] = useState<{id: number, quantity: number}[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getProducts()
                if (data.length === 0) {
                    throw new Error('No products found')
                }
                setProducts(data)
                setFilteredProducts(data)
                const uniqueCategories = Array.from(new Set(data.map(p => p.category)))
                setCategories(uniqueCategories)
                const maxPrice = Math.ceil(Math.max(...data.map(p => p.price)))
                setFilters(prev => ({...prev, maxPrice}))
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        let result = [...products]

        if (debouncedSearch) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        }

        if (filters.category && filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category)
        }

        result = result.filter(p =>
            p.price >= filters.minPrice && p.price <= filters.maxPrice
        )

        switch (filters.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
                break
            case 'popularity':
                result.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
                break
        }

        setFilteredProducts(result)
    }, [filters, products, debouncedSearch])

    const handleAddToCart = (productId: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId)
            if (existing) {
                return prev.map(item =>
                    item.id === productId 
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            }
            return [...prev, {id: productId, quantity: 1}]
        })
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="text-sm font-medium">Search</label>
                                <Input
                                    placeholder="Search products..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Category</label>
                                <Select
                                    value={filters.category}
                                    onValueChange={(value) => setFilters({ ...filters, category: value })}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Price Range</label>
                                <div className="pt-4">
                                    <Slider
                                        min={0}
                                        max={filters.maxPrice}
                                        step={1}
                                        value={[filters.minPrice, filters.maxPrice]}
                                        onValueChange={([min, max]) =>
                                            setFilters({ ...filters, minPrice: min, maxPrice: max })
                                        }
                                        className="mt-1"
                                    />
                                    <div className="flex justify-between mt-2 text-sm">
                                        <span>${filters.minPrice.toFixed(2)}</span>
                                        <span>${filters.maxPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Products
                            </h1>
                            <p className="text-sm text-gray-500">
                                Showing {filteredProducts.length} of {products.length} products
                            </p>
                        </div>
                        <Select
                            value={filters.sortBy}
                            onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="rating">Highest Rated</SelectItem>
                                <SelectItem value="popularity">Most Popular</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <>
                                    {[...Array(6)].map((_, i) => (
                                        <Card key={i} className="hover:shadow-lg transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="aspect-square relative mb-4">
                                                    <Skeleton className="w-full h-full rounded-lg" />
                                                </div>
                                                <Skeleton className="h-4 w-3/4 mb-2" />
                                                <Skeleton className="h-3 w-1/2 mb-2" />
                                                <Skeleton className="h-4 w-1/4 mb-4" />
                                                <Skeleton className="h-9 w-full" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </>
                            ) : filteredProducts.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500">No products found matching your criteria</p>
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <CardContent className="p-4">
                                                <div className="aspect-square relative mb-4 group overflow-hidden rounded-lg">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                                <h3 className="font-semibold truncate hover:text-blue-600 transition-colors" title={product.title}>
                                                    {product.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                                </p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="font-bold text-lg text-blue-600">
                                                        ${product.price.toFixed(2)}
                                                    </p>
                                                    {product.rating && (
                                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span>{product.rating.rate}</span>
                                                            <span>({product.rating.count})</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <Button 
                                                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                                    onClick={() => handleAddToCart(product.id)}
                                                >
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Add to Cart
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
