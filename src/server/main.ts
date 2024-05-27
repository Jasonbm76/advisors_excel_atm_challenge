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

// Get an individual account
app.get('/account/:id', (req, res) => {
	const id = req.params.id;
	account_model
		.getAccount(id)
		.then((response: any) => {
			res.status(200).send(response);
		})
		.catch((error: any) => {
			res.status(500).send(error);
		});
});

// Update by depositing into an individual account
app.post('/account/:id/deposit/:amount', (req, res) => {
	const id = req.params.id;
	const amount = req.body.amount;
	account_model
		.depositIntoAccount(id, amount)
		.then((response: any) => {
			res.status(200).send(response);
		})
		.catch((error: any) => {
			res.status(500).send(error);
		});
});

// Update by withdrawing from an individual account
app.post('/account/:id/withdrawal/:amount', (req, res) => {
	const id = req.params.id;
	const amount = req.body.amount;
	account_model
		.withdrawalFromAccount(id, amount)
		.then((response: any) => {
			res.status(200).send(response);
		})
		.catch((error: any) => {
			res.status(500).send(error);
		});
});

// Update by making a payment into a credit card account
app.post('/account/:id/payment/:amount', (req, res) => {
	const id = req.params.id;
	const amount = req.body.amount;
	account_model
		.makePaymentIntoAccount(id, amount)
		.then((response: any) => {
			res.status(200).send(response);
		})
		.catch((error: any) => {
			res.status(500).send(error);
		});
});

ViteExpress.listen(app, 3000, () =>
	console.log('Server is listening on port 3000...')
);
