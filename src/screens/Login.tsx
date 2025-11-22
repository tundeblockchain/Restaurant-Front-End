import React from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, Alert } from '@mui/material';
import { useAuth } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@config/firebase';

export function Login() {
	const { login, loginWithGoogle } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await login(email, password);
			navigate('/');
		} catch (err: any) {
			setError(err.message || 'Failed to login');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setError(null);
		setLoading(true);
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const idToken = await result.user.getIdToken();
			await loginWithGoogle(idToken);
			navigate('/');
		} catch (err: any) {
			setError(err.message || 'Failed to login with Google');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
			<Paper elevation={0} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 400 }}>
				<Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>Login</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				<Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
					<TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
					<TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
					<Button type="submit" variant="contained" fullWidth disabled={loading}>Login</Button>
					<Divider>OR</Divider>
					<Button variant="outlined" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleLogin} disabled={loading}>Login with Google</Button>
					<Box display="flex" justifyContent="center" gap={1}>
						<Typography variant="body2">Don't have an account?</Typography>
						<Button variant="text" onClick={() => navigate('/register')}>Register</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

