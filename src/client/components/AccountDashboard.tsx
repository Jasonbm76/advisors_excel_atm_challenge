import { useContext, useEffect, useState } from 'react';

import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { AccountTable } from './AccountTable';
import DepositForm from './DepositForm';
import WithdrawalForm from './WithdrawalForm';
import MakePaymentForm from './MakePaymentForm';

const AccountDashboard = () => {
	const userContext = useContext(UserContext);

	const [accountType, setAccountType] = useState('' as string);

	// We need to get the account type to determine whether to show checking or credit options
	useEffect(() => {
		if (userContext.user) {
			setAccountType(userContext?.user?.type);
			console.log(userContext.user);
		}
	}, [userContext]);

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

						{accountType !== 'credit' ? (
							<Grid
								templateColumns='repeat(5, 1fr)'
								gap={4}
								mt={6}>
								<GridItem colSpan={2}>
									<WithdrawalForm />
								</GridItem>
								<GridItem
									colStart={4}
									colEnd={6}>
									<DepositForm />
								</GridItem>
							</Grid>
						) : (
							<Grid
								templateColumns='repeat(5, 1fr)'
								gap={4}
								mt={6}>
								<GridItem colSpan={2}></GridItem>
								<GridItem
									colStart={4}
									colEnd={6}>
									<MakePaymentForm />
								</GridItem>
							</Grid>
						)}
					</Box>
				</Box>
			</Flex>
		)
	);
};

export default AccountDashboard;
