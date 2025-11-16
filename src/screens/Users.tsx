import React from 'react';
import { Box, Paper, Typography, Avatar, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { DataTable, SearchField } from '@ui/index';
import { useUsers } from '@hooks/useUsers';
import dayjs from 'dayjs';

const roles = ['Supervisor', 'Manager', 'Restaurant Admin', 'Staff'];

export function Users() {
	const { data, isLoading, error } = useUsers();
	const [query, setQuery] = React.useState('');
	const [roleFilter, setRoleFilter] = React.useState<string>('');
	const [open, setOpen] = React.useState(false);
	const [form, setForm] = React.useState({ name: '', email: '', role: 'Staff', phone: '' });
	const [formError, setFormError] = React.useState<string | null>(null);
	const [rows, setRows] = React.useState<any[]>([]);

	React.useEffect(() => {
		if (data) setRows(data);
	}, [data]);

	const filtered = React.useMemo(() => {
		let list = rows;
		if (roleFilter) list = list.filter((u: any) => u.role === roleFilter);
		const q = query.trim().toLowerCase();
		if (!q) return list;
		return list.filter((u: any) => [u.name, u.email, u.role].some((v) => (v ?? '').toLowerCase().includes(q)));
	}, [rows, query, roleFilter]);

	function validateEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email);
	}

	const submitNewUser = () => {
		setFormError(null);
		if (!form.name.trim()) return setFormError('Name is required');
		if (!validateEmail(form.email)) return setFormError('Valid email is required');
		if (!roles.includes(form.role)) return setFormError('Please select a role');
		const newUser = {
			id: `usr_${Math.random().toString(36).slice(2, 8)}`,
			name: form.name.trim(),
			email: form.email.trim(),
			role: form.role,
			phone: form.phone.trim() || undefined,
			createdAt: new Date().toISOString(),
			status: 'ACTIVE' as const
		};
		setRows((prev) => [newUser, ...prev]);
		setOpen(false);
		setForm({ name: '', email: '', role: 'Staff', phone: '' });
	};

	return (
		<Box display="grid" gap={2}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Typography variant="h5" fontWeight={800}>Users</Typography>
				<Box display="flex" alignItems="center" gap={2}>
					<Box width={260}>
						<FormControl fullWidth size="small">
							<InputLabel>Role</InputLabel>
							<Select label="Role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
								<MenuItem value="">All</MenuItem>
								{roles.map((r) => (
									<MenuItem key={r} value={r}>{r}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box width={360}>
						<SearchField placeholder="Search users" value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} />
					</Box>
					<Button variant="contained" onClick={() => setOpen(true)}>Add User</Button>
				</Box>
			</Box>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
				{error && <Alert severity="error">Failed to load users.</Alert>}
				{isLoading && <Typography>Loading...</Typography>}
				{!isLoading && !error && (
					<DataTable
						columns={[
							{ key: 'user', header: 'User', render: (u: any) => (
								<Box display="flex" alignItems="center" gap={1.5}>
									<Avatar src={u.avatarUrl} />
									<Box>
										<Typography fontWeight={700}>{u.name}</Typography>
										<Typography variant="body2" color="text.secondary">{u.email}</Typography>
									</Box>
								</Box>
							)},
							{ key: 'role', header: 'Role', render: (u: any) => <Chip label={u.role} size="small" sx={{ fontWeight: 700 }} /> },
							{ key: 'phone', header: 'Phone' },
							{ key: 'createdAt', header: 'Joined', render: (u: any) => dayjs(u.createdAt).format('DD MMM YYYY') },
							{ key: 'status', header: 'Status', render: (u: any) => <Chip label={u.status} size="small" color={u.status === 'ACTIVE' ? 'success' : 'default'} /> }
						]}
						rows={filtered}
						getRowId={(r: any) => r.id}
					/>
				)}
			</Paper>

			{/* Add User Dialog */}
			<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Add User</DialogTitle>
				<DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
					{formError && <Alert severity="error">{formError}</Alert>}
					<TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
					<TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
					<TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
					<FormControl fullWidth>
						<InputLabel>Role</InputLabel>
						<Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as string })}>
							{roles.map((r) => (
								<MenuItem key={r} value={r}>{r}</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button variant="contained" onClick={submitNewUser}>Save</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}


