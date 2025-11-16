import type { CustomerDto } from '@models/CustomerDto';

export const mockCustomers: CustomerDto[] = [
	{
		id: 'cus_0001',
		name: 'Olivia Shine',
		email: 'olivia.shine@example.com',
		phone: '+1 (555) 123-4567',
		city: 'London',
		country: 'UK',
		joinedAt: '2023-01-15T09:30:00Z',
		totalOrders: 12,
		status: 'ACTIVE',
		avatarUrl: 'https://i.pravatar.cc/100?img=1'
	},
	{
		id: 'cus_0002',
		name: 'Samantha Bake',
		email: 'samantha.bake@example.com',
		phone: '+1 (555) 987-6543',
		city: 'London',
		country: 'UK',
		joinedAt: '2023-03-21T14:12:00Z',
		totalOrders: 8,
		status: 'ACTIVE',
		avatarUrl: 'https://i.pravatar.cc/100?img=2'
	},
	{
		id: 'cus_0003',
		name: 'Veronica Hart',
		email: 'veronica.hart@example.com',
		phone: '+1 (555) 222-3344',
		city: 'Manchester',
		country: 'UK',
		joinedAt: '2022-11-03T10:00:00Z',
		totalOrders: 4,
		status: 'INACTIVE',
		avatarUrl: 'https://i.pravatar.cc/100?img=3'
	}
];


