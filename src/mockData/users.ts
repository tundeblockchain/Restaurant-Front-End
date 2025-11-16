import type { UserDto } from '@models/UserDto';

export const mockUsers: UserDto[] = [
	{
		id: 'usr_0001',
		name: 'James Sullivan',
		email: 'james.sullivan@example.com',
		role: 'Restaurant Admin',
		phone: '+44 7890 111 222',
		avatarUrl: 'https://i.pravatar.cc/100?img=21',
		createdAt: '2023-01-10T09:00:00Z',
		status: 'ACTIVE'
	},
	{
		id: 'usr_0002',
		name: 'Maria Gomez',
		email: 'maria.gomez@example.com',
		role: 'Manager',
		phone: '+44 7890 222 333',
		avatarUrl: 'https://i.pravatar.cc/100?img=22',
		createdAt: '2023-02-15T10:30:00Z',
		status: 'ACTIVE'
	},
	{
		id: 'usr_0003',
		name: 'Liam Brown',
		email: 'liam.brown@example.com',
		role: 'Supervisor',
		phone: '+44 7890 333 444',
		avatarUrl: 'https://i.pravatar.cc/100?img=23',
		createdAt: '2023-04-05T14:00:00Z',
		status: 'INACTIVE'
	}
];


