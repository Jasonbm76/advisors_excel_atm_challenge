import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	Box,
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

	const [singleWithdrawalLimit, setSingleWithdrawalLimit] = useState(200);
	const [dailyWithdrawalLimit, setDailyWithdrawalLimit] = useState(400);
	const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState(0);

	const [accountType, setAccountType] = useState('' as string);
	const [amountWithdrawnToday, setAmountWithdrawnToday] = useState(0);

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

	// Reset the form after a successful submission
	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

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
		// Check if the user has the funds available
		// setHasTheFunds(num <= parseInt(userContext?.user?.balance));
		// console.log('hasTheFunds', hasTheFunds);
		// console.info(typeof userContext.user.balance);

		// Make sure the input is not empty
		setInputNotEmpty(num > 0);

		// Check if the withdrawal amount is a multiple of 5
		setMultipleOfFivePass(num % 5 === 0);

		// Single withdrawal limit
		setSingleLimitPass(num <= 200);

		// Ensure we are under our daily withdrawal limit
		setDailyLimitPass(amountWithdrawnToday + num <= dailyWithdrawalLimit);
	}

	// function CCWithdrawalFormOld() {
	// 	let returnObj = {};
	// 	let availableCredit =
	// 		userContext?.user?.creditLimit - userContext?.user?.balance;

	// 	return returnObj;
	// }

	// <NoCreditAvailableMessage />

	return (
		<>
			<div className=''>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl>
						<FormLabel>Make Withdrawal</FormLabel>
						<Stack
							direction={['column', 'row']}
							spacing='10px'>
							<Input
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
						</ul>
					</Box>
				</form>
			</div>
		</>
	);
};

export default WithdrawalForm;

/*
if (userContext.user.balance === 0) {
					console.log('balance is 0');
				}
*/

/*
// We need to get the amount due on the credit card to determine the max value for the input
	useEffect(() => {
		if (userContext.user) {
			let balance = parseInt(userContext?.user?.balance);
			switch (userContext?.user?.type) {
				case 'credit':
					setMaxWithdrawalAmount(
						userContext?.user?.creditLimit -
							Math.abs(userContext?.user?.balance)
					);
					break;
				default:
					// User has a balance higher than the single withdrawal limit
					if (balance > singleWithdrawalLimit) {
						setMaxWithdrawalAmount(singleWithdrawalLimit);
					}
					break;
			}
			// setMaxWithdrawalAmount(
			// 	(userContext?.user?.type !== 'credit'
			// 		? Math.abs(balance)
			// 		: userContext?.user?.creditLimit) -
			// 		Math.abs(userContext?.user?.balance)
			// );
			setAccountType(userContext?.user?.type);

			//console.log('accountType (withdrawalForm)', accountType);
			//console.log(userContext.user);
		}
	}, [userContext]);
*/

/*
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
									min: 5,
									max: maxWithdrawalAmount,
									pattern: /^[0-9]*[05]$/,
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
									{`Amount must be between $5 and $${maxWithdrawalAmount.toLocaleString()} dollars in increments of $5.`}
								</span>
							)}
						</FormHelperText>
					</FormControl>

					<Box
						w='100%'
						p={4}>
						<ul className='withdrawal-reqs'>
							<li>Withdrawal must be in increments of $5</li>
							<li className={accountType === 'credit' ? 'd-none' : ''}>
								Single Withdrawal Limit ${singleWithdrawalLimit}
							</li>
							<li className={accountType === 'credit' ? 'd-none' : ''}>
								Daily Withdrawal Limit ${dailyWithdrawalLimit}
							</li>
						</ul>
					</Box>
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
*/
