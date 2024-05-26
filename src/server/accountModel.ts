//import { Pool } from 'pg';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
	user: 'my_user',
	host: 'localhost',
	database: 'challenge',
	password: 'root',
	port: 5432,
});

// Get a list of all accounts (will delete later)
// const getAccounts = async () => {
// 	try {
// 		return await new Promise(function (resolve, reject) {
// 			pool.query('SELECT * FROM accounts', (error: any, results: any) => {
// 				if (error) {
// 					reject(error);
// 				}
// 				if (results && results.rows) {
// 					resolve(results.rows);
// 				} else {
// 					reject(new Error('No results found'));
// 				}
// 			});
// 		});
// 	} catch (error_1) {
// 		console.error(error_1);
// 		throw new Error('Internal server error');
// 	}
// };

// Get individual account information
const getAccount = (id: number) => {
	const accountNumber = id;
	try {
		return new Promise(function (resolve, reject) {
			const query = `SELECT * FROM accounts WHERE account_number = $1`;
			pool.query(query, [accountNumber], (error: any, results: any) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error('No results found'));
				}
			});
		});
	} catch (error_1) {
		console.error(error_1);
		throw new Error('Internal server error');
	}
};

// Deposit money into an account
const depositIntoAccount = (id: number, amount: number) => {
	const accountNumber = id;
	const query = `UPDATE accounts SET amount = amount + $2 WHERE account_number = $1 RETURNING *`;

	try {
		return new Promise(function (resolve, reject) {
			pool.query(query, [accountNumber, amount], (error: any, results: any) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error('No results found'));
				}
			});
		});
	} catch (error_1) {
		console.error(error_1);
		throw new Error('Internal server error');
	}
};

// Withdraw money from an account
const withdrawFromAccount = (id: number, amount: number) => {
	const accountNumber = id;
	const query = `UPDATE accounts SET amount = amount - $2 WHERE account_number = $1 RETURNING *`;

	try {
		return new Promise(function (resolve, reject) {
			pool.query(query, [accountNumber, amount], (error: any, results: any) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error('No results found'));
				}
			});
		});
	} catch (error_1) {
		console.error(error_1);
		throw new Error('Internal server error');
	}
};

module.exports = {
	getAccount,
	depositIntoAccount,
	withdrawFromAccount,
};
