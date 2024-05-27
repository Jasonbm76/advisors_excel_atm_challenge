import {
	ColorModeProvider,
	CSSReset,
	theme,
	ThemeProvider,
} from '@chakra-ui/react';

import './scss/app.scss';
import LoginForm from './components/LoginForm';
import AccountDashboard from './components/AccountDashboard';
import ThemeToggler from './components/ThemeToggler';

import { UserContextProvider } from './context/UserContext';

function App() {
	return (
		<>
			<UserContextProvider>
				<ThemeProvider theme={theme}>
					<ColorModeProvider>
						<CSSReset />
						<ThemeToggler />
						<LoginForm />
						<AccountDashboard />
					</ColorModeProvider>
				</ThemeProvider>
			</UserContextProvider>
		</>
	);
}

export default App;
