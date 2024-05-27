import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Stack,
} from '@chakra-ui/react';

import { UserContext } from '../context/UserContext.js';

const WithdrawalForm = () => {
	const userContext = useContext(UserContext);

	const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState(0);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// We need to get the amount due on the credit card to determine the max value for the input
	useEffect(() => {
		if (userContext.user) {
			let balance = parseInt(userContext?.user?.balance);
			setMaxWithdrawalAmount(Math.abs(balance));
			console.log(userContext.user);
		}
	}, [userContext]);

	// Withdrawal money into an account
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
					creditLimit: accountObject[0].creditLimit,
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
						color='#ff0000'>
						{errors.withdrawalAmount && (
							<span>
								{`Amount must be between $1 and $${maxWithdrawalAmount.toLocaleString()} dollars`}
							</span>
						)}
					</FormHelperText>
				</FormControl>
			</form>
		</div>
	);
};

export default WithdrawalForm;
