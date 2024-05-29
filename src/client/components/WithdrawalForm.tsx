import { useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';

import { UserContext } from '../context/UserContext.js';

const WithdrawalForm = () => {
	const userContext = useContext(UserContext);

	const [singleWithdrawalLimit, setSingleWithdrawalLimit] = useState(200);
	const [dailyWithdrawalLimit, setDailyWithdrawalLimit] = useState(400);
	const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState(0);

	const [accountType, setAccountType] = useState('' as string);
	const [amountWithdrawnToday, setAmountWithdrawnToday] = useState(0);
	const [showWithdrawalForm, setShowWithdrawalForm] = useState(true);
	const [singleLimitPass, setSingleLimitPass] = useState(false);
	const [dailyLimitPass, setDailyLimitPass] = useState(false);
	const [multipleOfFivePass, setMultipleOfFivePass] = useState(false);
	const [inputNotEmpty, setInputNotEmpty] = useState(false);
	const [hasTheFunds, setHasTheFunds] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { errors },
	} = useForm();

	// Withdrawal money from an account
	function withdrawalMoney(amount: number) {
		let url = `http://localhost:3000/account/${userContext?.user?.accountNumber}/withdrawal/${amount}`;

		// Need a different URL for credit accounts
		if (userContext.user.type === 'credit') {
			url = `http://localhost:3000/account/${userContext?.user?.accountNumber}/advance/${amount}`;
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount, type: userContext.user.type }),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				let accountObject = JSON.parse(data);

				// Update the amount withdrawn today
				setAmountWithdrawnToday((a) => a + Number(amount));

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
		withdrawalMoney(Number(data.withdrawalAmount));
	};

	// User has no credit available
	function NoCreditAvailableMessage() {
		return (
			<>
				<FormLabel>Make Withdrawal</FormLabel>
				<Heading
					as='h6'
					size='xs'>
					Withdrawal is not available for this account due to having no
					available credit.
				</Heading>
			</>
		);
	}

	// Check the withdrawal rules to determine if the withdrawal button should be disabled
	function checkWithdrawalRules(num: number) {
		// This is the standard check for a checking/savings account
		let inSufficientFundsCheck = num <= userContext.user.balance === true;

		// Check if the user has enough funds on their credit card
		if (userContext.user.type === 'credit') {
			inSufficientFundsCheck =
				num <= userContext.user.creditLimit - userContext.user.balance;
		}

		// Check if the user has the funds available
		setHasTheFunds(inSufficientFundsCheck);

		// Make sure the input is not empty
		setInputNotEmpty(num > 0);

		// Check if the withdrawal amount is a multiple of 5
		setMultipleOfFivePass(num % 5 === 0);

		// Single withdrawal limit
		setSingleLimitPass(num <= 200);

		/*** TODO: Would really need to modify the database to prevent the user from simply refreshing the page or logging out to reset this ***/
		// Ensure we are under our daily withdrawal limit
		setDailyLimitPass(amountWithdrawnToday + num <= dailyWithdrawalLimit);
	}

	// Reset the form after a successful submission
	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	// Determine which UI to show based on the user's account type and balance
	// this is necessary if the user has a balance of 0 but then makes a deposit
	useEffect(() => {
		let cl = userContext.user.creditLimit;
		let bal = userContext.user.balance;
		let type = userContext.user.type;

		// Credit accounts
		if (type === 'credit') {
			if (cl - bal <= 0) {
				setShowWithdrawalForm(false);
			} else {
				setShowWithdrawalForm(true);
			}
		}

		// Checking/Savings accounts
		if (type !== 'credit') {
			if (bal <= 0) {
				setShowWithdrawalForm(false);
			} else {
				setShowWithdrawalForm(true);
			}
		}
	}, [userContext.user]);

	return (
		<>
			{/* No credit available */}
			<div className={showWithdrawalForm ? 'd-none' : ''}>
				<FormLabel>Make Withdrawal</FormLabel>
				<Heading
					as='h6'
					size='xs'>
					Withdrawal is not available for this account at this time.
				</Heading>
			</div>

			{/* Standard Withdrawal Form */}
			<div className={showWithdrawalForm ? '' : 'd-none'}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl>
						<FormLabel>Make Withdrawal</FormLabel>
						<Stack
							direction={['column', 'row']}
							spacing='10px'>
							<Input
								{...register('withdrawalAmount', {})}
								type='number'
								id='withdrawalAmount'
								placeholder='Enter withdrawal amount'
								onChange={(e) => checkWithdrawalRules(Number(e.target.value))}
							/>

							<Button
								type='submit'
								value='Withdrawal'
								colorScheme='blue'
								isDisabled={
									inputNotEmpty === false ||
									singleLimitPass === false ||
									dailyLimitPass === false ||
									multipleOfFivePass === false ||
									hasTheFunds === false
								}>
								Submit
							</Button>
						</Stack>
						<FormHelperText
							fontSize='xs'
							color='#ff0000'
							textAlign={'left'}></FormHelperText>
					</FormControl>

					<Box
						w='100%'
						p={4}>
						<ul className='withdrawal-reqs'>
							<li className={multipleOfFivePass ? 'd-none' : ''}>
								Withdrawal Must Be A Multiple Of $5
							</li>
							<li className={singleLimitPass ? 'd-none' : ''}>
								Single Withdrawal Limit ${singleWithdrawalLimit}
							</li>
							<li className={dailyLimitPass ? 'd-none' : ''}>
								Daily Withdrawal Limit ${dailyWithdrawalLimit}
							</li>
							<li className={hasTheFunds ? 'd-none' : ''}>
								Insufficient Funds
							</li>
						</ul>
					</Box>
				</form>
			</div>
		</>
	);
};

export default WithdrawalForm;
