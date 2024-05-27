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

const MakePaymentForm = () => {
	const userContext = useContext(UserContext);
	const [maxPaymentAmount, setMaxPaymentAmount] = useState(0);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// We need to get the amount due on the credit card to determine the max value for the input
	useEffect(() => {
		if (userContext.user) {
			let balance = parseInt(userContext?.user?.balance);
			setMaxPaymentAmount(Math.abs(balance));
			console.log(userContext.user);
		}
	}, [userContext]);

	// MakePayment money into an account
	function makePayment(amount: number) {
		fetch(
			`http://localhost:3000/account/${userContext?.user?.accountNumber}/payment/${amount}`,
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
	const onSubmit = (data: { makePaymentAmount: number }) => {
		const makePaymentAmountInput = document.querySelector(
			'#makePaymentAmount'
		) as HTMLInputElement;
		makePaymentAmountInput.value = '0';
		makePayment(data.makePaymentAmount);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl>
					<FormLabel>Make Payment</FormLabel>
					<Stack
						direction={['column', 'row']}
						spacing='10px'>
						<Input
							{...register('makePaymentAmount', {
								min: 1,
								max: maxPaymentAmount,
							})}
							type='number'
							id='makePaymentAmount'
							placeholder='Enter payment amount'
						/>

						<Button
							type='submit'
							value='MakePayment'
							colorScheme='blue'>
							Submit
						</Button>
					</Stack>
					<FormHelperText
						fontSize='xs'
						color='#ff0000'>
						{errors.makePaymentAmount && (
							<span>
								{`Payment must be between $1 and $${maxPaymentAmount.toLocaleString()} dollars`}
							</span>
						)}
					</FormHelperText>
				</FormControl>
			</form>
		</div>
	);
};

export default MakePaymentForm;
