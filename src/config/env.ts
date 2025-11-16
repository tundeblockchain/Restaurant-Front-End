/**
 * Centralized environment variables configuration
 * All environment variable access should go through this file
 */

export const env = {
	api: {
		baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'
	},
	firebase: {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
		appId: import.meta.env.VITE_FIREBASE_APP_ID ?? ''
	},
	app: {
		name: import.meta.env.VITE_APP_NAME ?? 'Restaurant Admin'
	}
} as const;

