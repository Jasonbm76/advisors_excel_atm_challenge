import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';

import { UserContext } from '../context/UserContext.js';

const WithdrawalForm = () => {
	const userContext = useContext(UserContext);

	const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState(0);
	const [singleWithdrawalLimit, setSingleWithdrawalLimit] = useState(200);
	const [dailyWithdrawalLimit, setDailyWithdrawalLimit] = useState(400);
	const [accountType, setAccountType] = useState('' as string);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// We need to get the amount due on the credit card to determine the max value for the input
	useEffect(() => {
		if (userContext.user) {
			let balance = parseInt(userContext?.user?.balance);
			setMaxWithdrawalAmount(
				(userContext?.user?.type !== 'credit'
					? Math.abs(balance)
					: userContext?.user?.creditLimit) -
					Math.abs(userContext?.user?.balance)
			);
			setAccountType(userContext?.user?.type);

			console.log('accountType (withdrawalForm)', accountType);
			console.log(userContext.user);
		}
	}, [userContext]);

	// Withdrawal money from an account
	function withdrawalMoney(amount: number) {
		fetch(
			`http://localhost:3000/account/${userContext?.user?.accountNumber}/withdrawal/${amount}`,
			{
				method: 'POST',
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
				let accountObject = JSON.parse(data);

				userContext.setUser({
					name: accountObject[0].name,
					accountNumber: userContext.user.accountNumber,
					creditLimit: accountObject[0].credit_limit,
					balance: accountObject[0].amount,
					type: accountObject[0].type,
					isLoggedIn: true,
				});
			});
	}

	// Submit form after successful validation
	const onSubmit = (data: { withdrawalAmount: number }) => {
		const withdrawalAmountInput = document.querySelector(
			'#withdrawalAmount'
		) as HTMLInputElement;
		withdrawalAmountInput.value = '0';
		withdrawalMoney(data.withdrawalAmount);
	};

	return (
		<div>
			{maxWithdrawalAmount > 0 ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl>
						<FormLabel>Make Withdrawal</FormLabel>
						<Stack
							direction={['column', 'row']}
							spacing='10px'>
							<Input
								{...register('withdrawalAmount', {
									min: 1,
									max: maxWithdrawalAmount,
								})}
								type='number'
								id='withdrawalAmount'
								placeholder='Enter withdrawal amount'
							/>

							<Button
								type='submit'
								value='Withdrawal'
								colorScheme='blue'>
								Submit
							</Button>
						</Stack>
						<FormHelperText
							fontSize='xs'
							color='#ff0000'
							textAlign={'left'}>
							{errors.withdrawalAmount && (
								<span>
									{`Amount must be between $1 and $${maxWithdrawalAmount.toLocaleString()} dollars`}
								</span>
							)}
						</FormHelperText>
					</FormControl>
				</form>
			) : (
				<>
					<FormLabel>Make Withdrawal</FormLabel>
					<Heading
						as='h6'
						size='xs'>
						Withdrawal is not available for this account due to balance being
						$0.
					</Heading>
				</>
			)}
		</div>
	);
};

export default WithdrawalForm;
