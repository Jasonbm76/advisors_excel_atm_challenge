import { useContext, useState } from 'react';
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

const DepositForm = () => {
	const userContext = useContext(UserContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Deposit money into an account
	function depositMoney(amount: number) {
		fetch(
			`http://localhost:3000/account/${userContext?.user?.accountNumber}/deposit/${amount}`,
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
	const onSubmit = (data: { depositAmount: number }) => {
		const depositAmountInput = document.querySelector(
			'#depositAmount'
		) as HTMLInputElement;
		depositAmountInput.value = '0';
		depositMoney(data.depositAmount);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl>
					<FormLabel>Make Deposit</FormLabel>
					<Stack
						direction={['column', 'row']}
						spacing='10px'>
						<Input
							{...register('depositAmount', { min: 1, max: 1000 })}
							type='number'
							id='depositAmount'
							placeholder='Enter deposit amount'
						/>

						<Button
							type='submit'
							value='Deposit'
							colorScheme='blue'>
							Submit
						</Button>
					</Stack>
					<FormHelperText
						fontSize='xs'
						color='#ff0000'
						textAlign={'left'}>
						{errors.depositAmount && (
							<span>You may only deposit between $1 and $1,000 dollars</span>
						)}
					</FormHelperText>
				</FormControl>
			</form>
		</div>
	);
};

export default DepositForm;
