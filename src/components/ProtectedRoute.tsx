import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}

