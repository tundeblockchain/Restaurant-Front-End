import type { ReviewDto } from '@models/ReviewDto';

export const mockReviews: ReviewDto[] = [
	{
		id: 'rev_0001',
		orderRef: '#C01234',
		customerName: 'James Sitepu',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=31',
		rating: 4.5,
		comment:
			'We recently had dinner with friends at David CC and we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
		createdAt: '2020-04-26T00:42:00Z',
		status: 'PENDING'
	},
	{
		id: 'rev_0002',
		orderRef: '#C01234',
		customerName: 'Angela Moss',
		customerAvatarUrl: 'https://i.pravatar.cc/100?img=32',
		rating: 4.2,
		comment:
			'We recently had dinner with friends at David CC and we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
		createdAt: '2020-04-26T00:42:00Z',
		status: 'PENDING'
	}
];


