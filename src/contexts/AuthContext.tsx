import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister, loginWithGoogle as apiLoginWithGoogle, logout as apiLogout, getCurrentUser } from '@api/auth';
import type { UserDto } from '@models/UserDto';

type AuthContextType = {
	user: UserDto | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string, storeName: string) => Promise<void>;
	loginWithGoogle: (idToken: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserDto | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is already authenticated
		const token = localStorage.getItem('auth_token');
		if (token) {
			getCurrentUser()
				.then((userData) => {
					setUser(userData);
					setLoading(false);
				})
				.catch(() => {
					// Token is invalid, clear it
					localStorage.removeItem('auth_token');
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (email: string, password: string) => {
		const response = await apiLogin(email, password);
		setUser(response.user);
	};

	const register = async (email: string, password: string, name: string, storeName: string) => {
		const response = await apiRegister(email, password, name, storeName);
		setUser(response.user);
	};

	const loginWithGoogle = async (idToken: string) => {
		const response = await apiLoginWithGoogle(idToken);
		setUser(response.user);
	};

	const logout = async () => {
		await apiLogout();
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
}

