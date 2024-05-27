import { useEffect, useState } from 'react';

import {
	Box,
	Button,
	ColorModeProvider,
	Container,
	CSSReset,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Heading,
	Input,
	Select,
	Textarea,
	theme,
	ThemeProvider,
	VStack,
} from '@chakra-ui/react';

import './scss/app.scss';
import LoginForm from './components/LoginForm';
import AccountDashboard from './components/AccountDashboard';
import ThemeToggler from './components/ThemeToggler';

import { AuthContext } from './context/AuthContext';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	const login = () => {
		setLoggedIn(true);
	};

	const logout = () => {
		setLoggedIn(false);
	};

	return (
		<>
			<AuthContext.Provider
				value={{
					isLoggedIn: loggedIn,
					login: login,
					logout: logout,
					token: '',
				}}>
				<ThemeProvider theme={theme}>
					<ColorModeProvider>
						<CSSReset />
						<ThemeToggler />
						<LoginForm />
						<AccountDashboard />
					</ColorModeProvider>
				</ThemeProvider>
			</AuthContext.Provider>
		</>
	);
}

export default App;
