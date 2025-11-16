export type OrderStatus = 'PENDING' | 'DELIVERED' | 'CANCELLED' | 'PROCESSING';

export interface OrderDto {
	id: string;
	createdAt: string; // ISO string
	customerName: string;
	locationLine1: string;
	locationLine2?: string;
	customerPhone?: string;
	customerAvatarUrl?: string;
	amount: number;
	status: OrderStatus;
	items?: OrderItemDto[];
}

export interface OrderItemDto {
	productId: string;
	name: string;
	category?: string;
	imageUrl?: string;
	price: number;
	quantity: number;
	rating?: number;
	reviewsCount?: number;
}


