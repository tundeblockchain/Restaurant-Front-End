export type UserRole = 'Supervisor' | 'Manager' | 'Restaurant Admin' | 'Staff';

export interface UserDto {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	phone?: string;
	avatarUrl?: string;
	createdAt: string; // ISO
	status?: 'ACTIVE' | 'INACTIVE';
}


