import type { ProductDto } from '@models/ProductDto';

export const mockProducts: ProductDto[] = [
	{
		id: 'prd_1001',
		name: 'Watermelon juice with ice',
		category: 'MAIN COURSE',
		price: 4.12,
		status: 'AVAILABLE',
		imageUrl: 'https://picsum.photos/seed/watermelon/128/128',
		stock: 120,
		createdAt: '2024-10-01T10:00:00Z',
		rating: 3.2,
		reviewsCount: 454,
		quantity: 1
	},
	{
		id: 'prd_1002',
		name: 'Chicken curry special with cucumber',
		category: 'MAIN COURSE',
		price: 14.99,
		status: 'AVAILABLE',
		imageUrl: 'https://picsum.photos/seed/chicken/128/128',
		stock: 80,
		createdAt: '2024-10-01T10:30:00Z',
		rating: 3.1,
		reviewsCount: 454,
		quantity: 3
	},
	{
		id: 'prd_1003',
		name: 'Italiano pizza with garlic',
		category: 'MAIN COURSE',
		price: 15.44,
		status: 'AVAILABLE',
		imageUrl: 'https://picsum.photos/seed/pizza/128/128',
		stock: 45,
		createdAt: '2024-10-03T09:15:00Z',
		rating: 3.0,
		reviewsCount: 454,
		quantity: 1
	}
];


