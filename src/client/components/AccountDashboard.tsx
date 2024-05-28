import { useContext, useEffect, useState } from 'react';

import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	Link,
	Spacer,
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { AccountTable } from './AccountTable';
import DepositForm from './DepositForm';
import WithdrawalForm from './WithdrawalForm';
import MakePaymentForm from './MakePaymentForm';

const AccountDashboard = () => {
	const userContext = useContext(UserContext);

	const [accountType, setAccountType] = useState('' as string);

	function handleLogoutClick() {
		userContext.setUser({
			name: '',
			accountNumber: 0,
			creditLimit: 0,
			balance: 0,
			type: '',
			isLoggedIn: false,
		});
	}

	// We need to get the account type to determine whether to show checking or credit options
	useEffect(() => {
		if (userContext.user) {
			setAccountType(userContext?.user?.type);
			//console.log(userContext.user);
		}
	}, [userContext]);

	return (
		userContext?.user?.isLoggedIn && (
			<Flex
				width='full'
				align='center'
				justifyContent='center'
				margin='auto'>
				<Box
					p={8}
					maxWidth='840px'
					minWidth='600px'
					minHeight='400px'
					borderWidth={1}
					borderRadius={8}
					boxShadow='lg'>
					<Box textAlign='center'>
						<Flex align={'center'}>
							<Box p='1'>
								<Heading>Bank Account Dashboard</Heading>
							</Box>
							<Spacer />
							<Box p='1'>
								<Link
									fontSize='xs'
									title={'Logout'}
									onClick={handleLogoutClick}>
									LOGOUT
								</Link>
							</Box>
						</Flex>

						<AccountTable />

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
					</Box>
				</Box>
			</Flex>
		)
	);
};

export default AccountDashboard;
