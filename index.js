const express = require('express');
const app = express();
const fs = require('fs');
const request = require("request");

console.log("Program started");

setInterval(() => {
	fs.readFile('./data.json', 'utf8', (err, json) => {
		if (err) {
			console.log(err);
			return;
		}
		let data = JSON.parse(json);
		request('https://api.iextrading.com/1.0/stock/aapl/price', (err, res, price) => {
			if (err) {
				console.log(err);
				return;
			}
			let priceObj = {"time": new Date(), "ticker": 'aapl', "stockPrice": price};
			console.log(priceObj);
			data.stockPrices.push(priceObj);
			fs.writeFile('./data.json', JSON.stringify(data), (err) => {
				if(err) console.log(err);
			})
		})
	});
}, 1000 * 60);


app.get('/', (req, res) => {
	fs.readFile('./data.json', 'utf8', (err, json) => {
		data = JSON.parse(json);
		res.status(200).json(data);
	});
})


app.listen(process.env.PORT || 3000);
