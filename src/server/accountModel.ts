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

// Rest of the code remains the same
const getAccounts = async () => {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query('SELECT * FROM accounts', (error: any, results: any) => {
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

//export default { getAccounts };

module.exports = {
	getAccounts,
};
