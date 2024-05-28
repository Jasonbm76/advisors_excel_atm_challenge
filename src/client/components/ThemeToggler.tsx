import React from 'react';
import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggler() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box
			textAlign='right'
			py={4}
			mr={12}>
			<IconButton
				icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
				onClick={toggleColorMode}
				variant='ghost'
				aria-label='Toggle Theme'
				title={'Toggle Theme'}
			/>
		</Box>
	);
}
