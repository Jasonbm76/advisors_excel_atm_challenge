import React, { useContext, useEffect, useState } from 'react';

import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { AccountTable } from './AccountTable';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';

const AccountDashboard = () => {
	const userContext = useContext(UserContext);

	//const [account, setAccount] = useState<string[]>([]);
	//const [accountId, setAccountId] = useState<number>(0);
	const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

	// Get account information for an account
	// function getAccount() {
	// 	fetch(`http://localhost:3000/account/${accountId}`)
	// 		.then((response) => {
	// 			return response.text();
	// 		})
	// 		.then((data) => {
	// 			setAccount([data]);
	// 			console.log('Account', account);
	// 			//setAccountId(userContext?.user?.accountNumber);
	// 		});
	// }

	// Widthdraw money from an account
	function withdrawMoney(amount: number) {
		fetch(
			`http://localhost:3000/account/${userContext?.user?.accountNumber}/withdraw/${amount}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount }),
			}
		)
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				//getAccount();
			});
	}

	// function WithdrawForm() {
	// 	return (
	// 		<form>
	// 			<label>
	// 				Withdraw Amount:
	// 				<input
	// 					type='text'
	// 					name='withdraw'
	// 					value={withdrawAmount}
	// 					onChange={(e) => setWithdrawAmount(Number(e.target.value))}
	// 				/>
	// 			</label>
	// 			<input
	// 				type='submit'
	// 				value='Withdraw'
	// 				onClick={() => withdrawMoney(withdrawAmount)}
	// 			/>
	// 		</form>
	// 	);
	// }

	// useEffect(() => {
	// 	setAccountId(userContext?.user?.accountNumber);
	// }, [userContext]);

	return (
		userContext?.user?.isLoggedIn && (
			<Flex
				//width='full'
				align='center'
				justifyContent='center'
				margin='auto'
				width='80%'>
				<Box
					p={8}
					//maxWidth='1280px'
					minWidth='600px'
					minHeight='400px'
					borderWidth={1}
					borderRadius={8}
					boxShadow='lg'>
					<Box textAlign='center'>
						<Heading mb='5'>Bank Account Dashboard</Heading>
						<AccountTable />
						<Grid
							templateColumns='repeat(5, 1fr)'
							gap={4}
							mt={6}>
							<GridItem colSpan={2}>
								<WithdrawForm />
							</GridItem>
							<GridItem
								colStart={4}
								colEnd={6}>
								<DepositForm />
							</GridItem>
						</Grid>
					</Box>
				</Box>

				{/*
				<DepositForm />
				<WithdrawForm /> 
				*/}
			</Flex>
		)
	);
};

export default AccountDashboard;
