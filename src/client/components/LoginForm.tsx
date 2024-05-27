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
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
	const userContext = useContext(UserContext);

	const [accountNumber, setAccountNumber] = useState(1); // default to account 1

	// Get account information for an account
	function getAccount() {
		fetch(`http://localhost:3000/account/${accountNumber}`)
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				let accountObject = JSON.parse(data);

				userContext.setUser({
					name: accountObject[0].name,
					accountNumber: accountNumber,
					creditLimit: accountObject[0].creditLimit,
					balance: accountObject[0].amount,
					isLoggedIn: true,
				});
			});
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		getAccount();
	};

	const handleAccountNumberChange = (value: number) => {
		setAccountNumber(value);
	};

	return (
		!userContext?.user?.isLoggedIn && (
			<Flex
				width='full'
				align='center'
				justifyContent='center'>
				<Box
					p={8}
					maxWidth='480px'
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
								colorScheme='blue'
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
