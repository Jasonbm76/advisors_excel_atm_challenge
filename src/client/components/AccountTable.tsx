import React, { useContext } from 'react';

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
						<Th>Account</Th>
						<Th>Name</Th>
						<Th isNumeric>Balance</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{userContext?.user?.accountNumber}</Td>
						<Td>{userContext?.user?.name}</Td>
						<Td isNumeric>{USDollar.format(userContext?.user?.balance)}</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};
