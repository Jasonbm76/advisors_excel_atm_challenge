import { createContext, useState } from 'react';

type AuthUser = {
	name: string;
	accountNumber: number;
	creditLimit: number;
	balance: number;
};

export type UserContextType = {
	user: any;
	setUser: any;
	isLoggedIn: boolean;
};

type UserContextProviderType = {
	children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	return (
		<UserContext.Provider value={{ user, setUser, isLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};
