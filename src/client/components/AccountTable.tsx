import React, { useContext, useEffect, useState } from 'react';

import {
	Table,
	TableContainer,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';

import { UserContext } from '../context/UserContext';

export const AccountTable = () => {
	const userContext = useContext(UserContext);

	const [accountType, setAccountType] = useState('' as string);

	// We need to figure out the account type
	useEffect(() => {
		if (userContext.user) {
			setAccountType(userContext?.user?.type);
		}
	}, [userContext]);

	// Format prices to USD using the locale, style, and currency.
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return (
		<TableContainer>
			<Table
				variant='striped'
				colorScheme='blue'>
				<Thead>
					<Tr>
						<Th textAlign={'center'}>Account</Th>
						<Th>Name</Th>
						<Th>Type</Th>
						{accountType === 'credit' && <Th isNumeric>Credit Limit</Th>}
						<Th isNumeric>Balance</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td textAlign={'center'}>{userContext?.user?.accountNumber}</Td>
						<Td>{userContext?.user?.name}</Td>
						<Td className='capitalize'>{userContext?.user?.type}</Td>
						{accountType === 'credit' && (
							<Td isNumeric>
								{USDollar.format(userContext?.user?.creditLimit)}
							</Td>
						)}
						<Td isNumeric>{USDollar.format(userContext?.user?.balance)}</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};
