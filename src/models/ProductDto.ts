export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'INACTIVE';

import type { ReviewDto } from './ReviewDto';

export interface ProductDto {
	id: string;
	name: string;
	category?: string;
	price: number;
	status: ProductStatus;
	imageUrl?: string;
	createdAt?: string;
	stock?: number;
	isAvailable?: boolean;

	// For listing UI
	rating?: number; // average 0..5
	reviewsCount?: number;
	quantity?: number; // for cart-like table mock
	reviews?: ReviewDto[];

	// Metadata
	description?: string;
	containsAllergens?: boolean;
	allergens?: string[]; // e.g., ['nuts', 'dairy']
	caloriesKcal?: number;
	proteinG?: number;
	carbsG?: number;
	fatG?: number;
}


