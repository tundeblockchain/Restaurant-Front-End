import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '@config/firebase';

type AuthContextType = {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string, storeName: string) => Promise<void>;
	loginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const register = async (email: string, password: string, name: string, storeName: string) => {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(userCredential.user, { displayName: name });
	};

	const loginWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider);
	};

	const logout = async () => {
		await signOut(auth);
	};

	return <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
}

