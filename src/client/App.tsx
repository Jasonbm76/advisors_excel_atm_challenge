import { useEffect, useState } from 'react';

import './App.css';

function App() {
	const [account, setAccount] = useState<string[]>([]);
	const [accountId, setAccountId] = useState<number>(1); // change to null later
	const [depositAmount, setDepositAmount] = useState<number>(100); // change to 0 later
	const [withdrawAmount, setWithdrawAmount] = useState<number>(100); // change to 0 later

	// Get account information for an account
	function getAccount(id: number) {
		fetch(`http://localhost:3000/account/${id}`)
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				setAccount([data]);
			});
	}

	// Deposit money into an account
	function depositMoney(id: number, amount: number) {
		fetch(`http://localhost:3000/account/${id}/deposit/${amount}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount }),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				//alert(data);
				getAccount(accountId);
			});
	}

	// Widthdraw money from an account
	function withdrawMoney(id: number, amount: number) {
		fetch(`http://localhost:3000/account/${id}/withdraw/${amount}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount }),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				//alert(data);
				getAccount(accountId);
			});
	}

	function AccountDisplay() {
		return account ? account : 'There is no account data available';
	}

	function DepositForm() {
		return (
			<form>
				<label>
					Deposit Amount:
					<input
						type='text'
						name='deposit'
						value={depositAmount}
						onChange={(e) => setDepositAmount(Number(e.target.value))}
					/>
				</label>
				<input
					type='submit'
					value='Deposit'
					onClick={() => depositMoney(accountId, depositAmount)}
				/>
			</form>
		);
	}

	function WithdrawForm() {
		return (
			<form>
				<label>
					Withdraw Amount:
					<input
						type='text'
						name='withdraw'
						value={withdrawAmount}
						onChange={(e) => setWithdrawAmount(Number(e.target.value))}
					/>
				</label>
				<input
					type='submit'
					value='Withdraw'
					onClick={() => withdrawMoney(accountId, withdrawAmount)}
				/>
			</form>
		);
	}

	// Get account information on load
	useEffect(() => {
		getAccount(accountId);
	}, []);

	return (
		<div>
			<AccountDisplay />
			<DepositForm />
			<WithdrawForm />
		</div>
	);
}

export default App;
