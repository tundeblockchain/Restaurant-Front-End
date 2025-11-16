import React from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Register() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = React.useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		storeName: ''
	});
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!form.name.trim()) return setError('Name is required');
		if (!form.email.trim()) return setError('Email is required');
		if (!form.password) return setError('Password is required');
		if (form.password.length < 6) return setError('Password must be at least 6 characters');
		if (form.password !== form.confirmPassword) return setError('Passwords do not match');
		if (!form.storeName.trim()) return setError('Store name is required');
		setLoading(true);
		try {
			await register(form.email, form.password, form.name, form.storeName);
			navigate('/');
		} catch (err: any) {
			setError(err.message || 'Failed to register');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
			<Paper elevation={0} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 500 }}>
				<Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>Register</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				<Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
					<TextField label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required />
					<TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth required />
					<TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth required />
					<TextField label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} fullWidth required />
					<TextField label="Store Name *" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} fullWidth required helperText="Store creation is mandatory" />
					<Button type="submit" variant="contained" fullWidth disabled={loading}>Register</Button>
					<Box display="flex" justifyContent="center" gap={1}>
						<Typography variant="body2">Already have an account?</Typography>
						<Button variant="text" onClick={() => navigate('/login')}>Login</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

