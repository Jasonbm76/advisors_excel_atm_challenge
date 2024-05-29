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

// Get individual account information
const getAccount = (id: number) => {
	const accountNumber = id;
	try {
		return new Promise(function (resolve, reject) {
			const query = `SELECT account_number, name, amount, type, credit_limit FROM accounts WHERE account_number = $1`;
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

// Make payment into a credit card account
const makePaymentIntoAccount = (id: number, amount: number) => {
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

// Withdrawal money from an account
const withdrawalFromAccount = (id: number, amount: number) => {
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

// Withdrawal money from an CC account
const withdrawalFromCCAccount = (id: number, amount: number) => {
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

module.exports = {
	getAccount,
	depositIntoAccount,
	makePaymentIntoAccount,
	withdrawalFromAccount,
	withdrawalFromCCAccount,
};
