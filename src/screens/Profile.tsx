import React from 'react';
import { Box, Paper, Typography, Avatar, TextField, Button } from '@mui/material';
import { useAuth } from '@contexts/AuthContext';
import { updateProfile } from 'firebase/auth';

export function Profile() {
	const { user } = useAuth();
	const [saving, setSaving] = React.useState(false);
	const [form, setForm] = React.useState({ name: '', storeName: '' });

	React.useEffect(() => {
		if (user) {
			setForm({ name: user.displayName || '', storeName: '' });
		}
	}, [user]);

	const save = async () => {
		if (!user) return;
		setSaving(true);
		try {
			await updateProfile(user, { displayName: form.name });
		} finally {
			setSaving(false);
		}
	};

	return (
		<Box display="grid" gap={3}>
			<Typography variant="h5" fontWeight={800}>Profile</Typography>
			<Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
				<Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
					<Avatar src={user?.photoURL ?? undefined} sx={{ width: 80, height: 80 }} />
					<Box>
						<Typography variant="h6" fontWeight={800}>{user?.displayName || 'User'}</Typography>
						<Typography variant="body2" color="text.secondary">{user?.email}</Typography>
					</Box>
				</Box>
				<Box display="grid" gap={2}>
					<TextField label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
					<TextField label="Email" value={user?.email ?? ''} disabled fullWidth />
					<TextField label="Store Name" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} fullWidth />
					<Box>
						<Button variant="contained" onClick={save} disabled={saving}>Save Changes</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

