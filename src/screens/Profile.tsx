import React from 'react';
import { Box, Paper, Typography, Avatar, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useProfile, useUpdateProfile } from '@hooks/useProfile';

export function Profile() {
	const { data: profile, isLoading } = useProfile();
	const updateProfileMutation = useUpdateProfile();
	const [form, setForm] = React.useState({ name: '', phone: '', avatarUrl: '' });
	const [error, setError] = React.useState<string | null>(null);
	const [success, setSuccess] = React.useState(false);

	React.useEffect(() => {
		if (profile) {
			setForm({
				name: profile.name || '',
				phone: profile.phone || '',
				avatarUrl: profile.avatarUrl || ''
			});
		}
	}, [profile]);

	const save = async () => {
		setError(null);
		setSuccess(false);
		try {
			await updateProfileMutation.mutateAsync({
				name: form.name,
				phone: form.phone,
				avatarUrl: form.avatarUrl
			});
			setSuccess(true);
		} catch (err: any) {
			setError(err.message || 'Failed to update profile');
		}
	};

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box display="grid" gap={3}>
			<Typography variant="h5" fontWeight={800}>Profile</Typography>
			<Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
				<Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
					<Avatar src={profile?.avatarUrl ?? undefined} sx={{ width: 80, height: 80 }} />
					<Box>
						<Typography variant="h6" fontWeight={800}>{profile?.name || 'User'}</Typography>
						<Typography variant="body2" color="text.secondary">{profile?.email}</Typography>
					</Box>
				</Box>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				{success && <Alert severity="success" sx={{ mb: 2 }}>Profile updated successfully</Alert>}
				<Box display="grid" gap={2}>
					<TextField label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
					<TextField label="Email" value={profile?.email ?? ''} disabled fullWidth />
					<TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
					<TextField label="Avatar URL" value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} fullWidth />
					<Box>
						<Button variant="contained" onClick={save} disabled={updateProfileMutation.isPending}>
							{updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

