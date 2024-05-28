import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	Box,
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

	const [singleDepositLimit, setSingleDepositLimit] = useState(1000);
	const [accountBalance, setAccountBalance] = useState(0);
	const [accountType, setAccountType] = useState('' as string);
	const [depositAmount, setDepositAmount] = useState('' as string);

	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { errors },
	} = useForm();

	// Deposit money into an account
	function depositMoney(amount: number) {
		//console.log(Number(amount));
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

				//console.log(accountObject);

				setAccountBalance(accountObject[0].amount);
				setAccountType(accountObject[0].type);

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

	// Reset the form after a successful submission
	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	// Submit form after successful validation
	const onSubmit = (data: { depositAmount: string }) => {
		depositMoney(Number(data.depositAmount));
	};

	// This is our standard deposit form but we will need ot hide if the account balance is 0 and the account type is credit
	function DepositFormStandard() {
		if (accountBalance === 0 && accountType === 'credit') {
			return '';
		}

		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl>
					<FormLabel>Make Deposit</FormLabel>
					<Stack
						direction={['column', 'row']}
						spacing='10px'>
						<Input
							{...register('depositAmount', {
								min: 1,
								max: singleDepositLimit,
							})}
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
							<span>
								You may only deposit between $1 and $
								{singleDepositLimit.toLocaleString()} dollars
							</span>
						)}
					</FormHelperText>
				</FormControl>

				<Box
					w='100%'
					p={4}>
					<ul className='deposit-reqs'>
						<li>Single Deposit Limit ${singleDepositLimit}</li>
					</ul>
				</Box>
			</form>
		);
	}

	// If the account balance is 0 and the account type is credit, display a message
	function CantDepositForm() {
		let reason = '';
		if (accountBalance === 0 && accountType === 'credit') {
			reason = 'Congrats you have paid your balance in full!';
		}
		return <div>{reason}</div>;
	}

	return (
		<div>
			<DepositFormStandard />
			<CantDepositForm />
		</div>
	);
};

export default DepositForm;
