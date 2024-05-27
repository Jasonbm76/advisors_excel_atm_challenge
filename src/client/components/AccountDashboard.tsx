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
	Center,
	Square,
	Text,
	Spacer,
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';

//import { AuthContext } from '../context/AuthContext';

const AccountDashboard = () => {
	//const authContext = useContext(AuthContext);

	const userContext = useContext(UserContext);
	//console.log('User Context: ', userContext);

	//const [userName, setUserName] = useState(userContext?.user?.name);
	const [account, setAccount] = useState<string[]>([]);
	const [accountId, setAccountId] = useState<number>(); // change to null later
	const [depositAmount, setDepositAmount] = useState<number>(0); // change to 0 later
	const [withdrawAmount, setWithdrawAmount] = useState<number>(0); // change to 0 later

	// Get account information for an account
	function getAccount() {
		fetch(`http://localhost:3000/account/${accountId}`)
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				setAccount([data]);
			});
	}

	// Deposit money into an account
	function depositMoney(amount: number) {
		fetch(`http://localhost:3000/account/${accountId}/deposit/${amount}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount }),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				//alert(data);
				getAccount();
			});
	}

	// Widthdraw money from an account
	function withdrawMoney(amount: number) {
		fetch(`http://localhost:3000/account/${accountId}/withdraw/${amount}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount }),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				//alert(data);
				getAccount(); // Remove the accountId argument
			});
	}

	function AccountDisplay() {
		return account ? account : 'There is no account data available';
	}

	// function LoginForm() {
	// 	return (
	// 		<form>
	// 			<label>
	// 				Bank Account Number:
	// 				<input
	// 					type='text'
	// 					name='accountId'
	// 					value={accountId}
	// 					onChange={(e) => setAccountId(Number(e.target.value))}
	// 				/>
	// 			</label>
	// 			<input
	// 				type='submit'
	// 				value='Submit'
	// 				onClick={() => getAccount()}
	// 			/>
	// 		</form>
	// 	);
	// }

	function DepositForm() {
		return (
			<form>
				<label>
					Deposit Amount:
					<input
						type='text'
						name='deposit'
						value={depositAmount}
						onChange={(e) => setDepositAmount(Number(e.target.value))}
					/>
				</label>
				<input
					type='submit'
					value='Deposit'
					onClick={() => depositMoney(depositAmount)}
				/>
			</form>
		);
	}

	function WithdrawForm() {
		return (
			<form>
				<label>
					Withdraw Amount:
					<input
						type='text'
						name='withdraw'
						value={withdrawAmount}
						onChange={(e) => setWithdrawAmount(Number(e.target.value))}
					/>
				</label>
				<input
					type='submit'
					value='Withdraw'
					onClick={() => withdrawMoney(withdrawAmount)}
				/>
			</form>
		);
	}

	// Get account information on load
	// useEffect(() => {
	// 	if (accountId) {
	// 		getAccount();
	// 	}
	// }, []);

	return (
		userContext?.user?.isLoggedIn && (
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
						<Heading mb='5'>Bank Account Dashboard</Heading>

						<Flex>
							<Box flex='1'>
								<Text align={'left'}>{userContext?.user?.name}</Text>
							</Box>
							<Spacer />
							<Center w='150px'>
								<Text>Account Number: {userContext?.user?.accountNumber}</Text>
							</Center>
						</Flex>
					</Box>
				</Box>

				{/* 
				<AccountDisplay />
				<DepositForm />
				<WithdrawForm /> 
				*/}
			</Flex>
		)
	);
};

export default AccountDashboard;
