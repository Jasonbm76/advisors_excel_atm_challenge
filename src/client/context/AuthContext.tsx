import { createContext } from 'react';
import { User } from '../hooks/useUser';

interface AuthContext {
	isLoggedIn: boolean;
	token: string | null;
	login: {};
	logout: {};
}

export const AuthContext = createContext<AuthContext>({
	isLoggedIn: false,
	token: null,
	login: () => {},
	logout: () => {},
});
