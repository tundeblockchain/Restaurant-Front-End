export interface ReviewDto {
	id: string;
	orderRef: string;
	customerName: string;
	customerAvatarUrl?: string;
	rating: number; // 0..5
	comment: string;
	createdAt: string; // ISO
	status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';
}

export interface ReviewDto {
	id: string;
	rating: number; // 0..5
	comment?: string;
	createdAt?: string;
	author?: string;
}


