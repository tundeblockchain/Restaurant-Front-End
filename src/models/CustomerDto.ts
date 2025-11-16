export interface CustomerDto {
	id: string;
	name: string;
	email: string;
	phone?: string;
	city?: string;
	country?: string;
	joinedAt: string; // ISO
	totalOrders: number;
	status?: 'ACTIVE' | 'INACTIVE';
	avatarUrl?: string;
}


