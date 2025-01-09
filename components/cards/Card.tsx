import { Card as CardBase, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

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

interface CardProps {
    product: Product;
}

const Card = ({ product }: CardProps) => {
    // Function to render star rating
    const renderRating = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < Math.round(rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                    }`}
            />
        ));
    };

    return (
        <CardBase className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                    <Badge variant="secondary" className="capitalize">
                        {product.category}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                    {product.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex">
                        {product.rating && renderRating(product.rating.rate)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        ({product.rating?.count || 0} reviews)
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <Button size="sm" className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </CardBase>
    );
};

export default Card;
