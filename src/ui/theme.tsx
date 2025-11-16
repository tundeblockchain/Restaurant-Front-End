import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';

const pink = {
	50: '#ffe5ef',
	100: '#ffbfd6',
	200: '#ff94bb',
	300: '#ff6aa1',
	400: '#ff4b8e',
	500: '#ff2c7a',
	600: '#e0266e',
	700: '#ba1f5c',
	800: '#95194a',
	900: '#6f1238'
};

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: pink[500],
			light: pink[300],
			dark: pink[700],
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#6C63FF'
		},
		background: {
			default: '#f5f6fa',
			paper: '#ffffff'
		}
	},
	shape: {
		borderRadius: 12
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 600
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					border: '1px solid rgba(16,24,40,0.06)'
				}
			}
		}
	},
	typography: {
		fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
	}
});

type Props = { children: React.ReactNode };

export function AppThemeProvider({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

