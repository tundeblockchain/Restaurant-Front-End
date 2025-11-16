import { OrderDto } from '@models/OrderDto';

export const mockOrders: OrderDto[] = [
	{
		id: '#5552311',
		createdAt: '2020-03-26T00:42:00.000Z',
		customerName: 'Olivia Shine',
		locationLine1: '35 Station',
		locationLine2: 'Road London',
		customerPhone: '+44 20 7946 0958',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=11',
		amount: 82.46,
		status: 'PENDING',
		items: [
			{ productId: 'prd_1001', name: 'Watermelon juice with ice', category: 'MAIN COURSE', imageUrl: 'https://picsum.photos/seed/watermelon/128/128', price: 4.12, quantity: 1, rating: 3.2, reviewsCount: 454 },
			{ productId: 'prd_1002', name: 'Chicken curry special with cucumber', category: 'MAIN COURSE', imageUrl: 'https://picsum.photos/seed/chicken/128/128', price: 14.99, quantity: 3, rating: 3.1, reviewsCount: 454 }
		]
	},
	{
		id: '#5552322',
		createdAt: '2020-03-26T00:42:00.000Z',
		customerName: 'Samantha Bake',
		locationLine1: '79 The Drive',
		locationLine2: 'London',
		customerPhone: '+44 20 7000 1234',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=12',
		amount: 22.18,
		status: 'DELIVERED',
		items: [
			{ productId: 'prd_1003', name: 'Italiano pizza with garlic', category: 'MAIN COURSE', imageUrl: 'https://picsum.photos/seed/pizza/128/128', price: 15.44, quantity: 1, rating: 3.0, reviewsCount: 454 }
		]
	},
	{
		id: '#5552323',
		createdAt: '2020-03-26T00:42:00.000Z',
		customerName: 'Veronica',
		locationLine1: '21 King Street',
		locationLine2: 'London',
		customerPhone: '+44 161 555 9988',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=13',
		amount: 74.92,
		status: 'PENDING',
		items: [
			{ productId: 'prd_1002', name: 'Chicken curry special with cucumber', category: 'MAIN COURSE', imageUrl: 'https://picsum.photos/seed/chicken/128/128', price: 14.99, quantity: 3, rating: 3.1, reviewsCount: 454 }
		]
	},
	{
		id: '#5552349',
		createdAt: '2020-03-26T00:42:00.000Z',
		customerName: 'Roberto Carlo',
		locationLine1: '544 Manor',
		locationLine2: 'Road London',
		customerPhone: '+44 20 7777 1234',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=14',
		amount: 34.41,
		status: 'CANCELLED',
		items: [
			{ productId: 'prd_1001', name: 'Watermelon juice with ice', category: 'MAIN COURSE', imageUrl: 'https://picsum.photos/seed/watermelon/128/128', price: 4.12, quantity: 1, rating: 3.2, reviewsCount: 454 }
		]
	},
	{
		id: '#5552351',
		createdAt: '2020-03-26T00:42:00.000Z',
		customerName: 'James Wltcwicky',
		locationLine1: 'Corner Street',
		locationLine2: '5th London',
		customerPhone: '+44 20 8888 4321',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=15',
		amount: 164.52,
		status: 'PENDING',
		items: [
			{ productId: 'prd_1003', name: 'Italiano pizza with garlic', category: 'MAIN COURSE', imageUrl: 'https://picsum.photos/seed/pizza/128/128', price: 15.44, quantity: 1, rating: 3.0, reviewsCount: 454 }
		]
	}
];


