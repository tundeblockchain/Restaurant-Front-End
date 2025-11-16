import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'src/api'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@ui': path.resolve(__dirname, 'src/ui'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@screens': path.resolve(__dirname, 'src/screens'),
			'@models': path.resolve(__dirname, 'src/models'),
			'@mockData': path.resolve(__dirname, 'src/mockData'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@contexts': path.resolve(__dirname, 'src/contexts')
		}
	},
	server: {
		port: 5173
	}
});

