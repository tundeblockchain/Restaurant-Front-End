import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppThemeProvider } from './ui/theme';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1
		}
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppThemeProvider>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</AppThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

