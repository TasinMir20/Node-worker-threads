const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();

dotenv.config(); // called dotenv
const { PORT_SINGLE_THREAD_SERVER } = process.env;
console.clear();

// Middleware Array
const middleware = [morgan("dev"), express.static("public"), express.urlencoded({ extended: true }), express.json()];
app.use(middleware);

app.get("/blocking", async (req, res, next) => {
	try {
		const t0 = performance.now();
		let total = 0;
		for (let i = 0; i < 10000000000; i++) {
			total = total + i;
			// console.log(i);
		}

		const t1 = performance.now();
		const timeTook = Math.floor(t1 - t0);

		console.log("Call to doSomething took:", timeTook, " milliseconds.");

		return res.json({ total, executionTime: timeTook });
	} catch (err) {
		console.log(err);
	}
});

app.get("/none-blocking", async (req, res, next) => {
	return res.json({});
});

app.listen(PORT_SINGLE_THREAD_SERVER, () => {
	console.log(`Server is Running on ${PORT_SINGLE_THREAD_SERVER}`);
});
