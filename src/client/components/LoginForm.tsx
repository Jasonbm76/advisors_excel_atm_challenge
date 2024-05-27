import React, { useContext, useState } from 'react';

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
	const authContext = useContext(AuthContext);

	const loginHandler = () => {
		authContext.login();
	};
	const logoutHandler = () => {
		authContext.logout();
	};

	const [accountNumber, setAccountNumber] = useState(1); // default to account 1

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		loginHandler();
	};

	const handleAccountNumberChange = (value: number) => {
		setAccountNumber(value);
	};

	return (
		!authContext.isLoggedIn && (
			<Flex
				width='full'
				align='center'
				justifyContent='center'>
				<Box
					p={8}
					maxWidth='500px'
					borderWidth={1}
					borderRadius={8}
					boxShadow='lg'>
					<Box textAlign='center'>
						<Heading>Bank Login</Heading>
					</Box>
					<Box
						mt={6}
						textAlign='left'>
						<form onSubmit={handleSubmit}>
							<FormControl isRequired>
								<FormLabel>Account Number</FormLabel>
								<NumberInput
									defaultValue={1}
									min={1}
									max={9}
									clampValueOnBlur={true}
									value={accountNumber}
									onChange={handleAccountNumberChange}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
							<Button
								width='full'
								mt={4}
								type='submit'>
								Sign In
							</Button>
						</form>
					</Box>
				</Box>
			</Flex>
		)
	);
};

export default LoginForm;
