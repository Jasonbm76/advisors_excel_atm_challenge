import express from 'express';
import ViteExpress from 'vite-express';
import account_model from './accountModel.js';

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Access-Control-Allow-Headers'
	);
	next();
});

app.get('/', (req, res) => {
	account_model
		.getAccounts()
		.then((response: any) => {
			res.status(200).send(response);
		})
		.catch((error: any) => {
			res.status(500).send(error);
		});
});

app.get('/hello', (_, res) => {
	res.send('Hello Vite + React + TypeScript!');
});

ViteExpress.listen(app, 3000, () =>
	console.log('Server is listening on port 3000...')
);
