import { ProductType } from './ProductType'

export interface Product {
    id: number;
    name: string;
    description: string;
    youtubeUrl: string;
    types: ProductType[];
    images: string[];
    created_at: string
}

export interface ProductDto extends Omit<Product, "id" | "created_at"> {
    
}