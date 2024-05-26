import './App.css';

import { useEffect, useState } from 'react';

function App() {
	const [accounts, setAccounts] = useState<string[]>([]);

	function getAccounts() {
		fetch('http://localhost:3000')
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				setAccounts([data]);
			});
	}

	useEffect(() => {
		getAccounts();
	}, []);

	return (
		<div>{accounts ? accounts : 'There is no account data available'}</div>
	);
}

export default App;
