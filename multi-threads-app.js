const { Worker } = require("worker_threads");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();

dotenv.config(); // called dotenv
const { PORT_MULTI_THREAD_SERVER } = process.env;
console.clear();

// Middleware Array
const middleware = [morgan("dev"), express.static("public"), express.urlencoded({ extended: true }), express.json()];
app.use(middleware);

app.get("/blocking", async (req, res, next) => {
	try {
		const worker = new Worker("./worker.js");
		worker.on("message", (data) => {
			res.json({ total: data.total, executionTime: data.timeTook });
		});

		worker.on("error", (err) => {
			res.status(500).json({ err: err.message });
		});
	} catch (err) {
		console.log(err);
	}
});

app.get("/none-blocking", async (req, res, next) => {
	return res.json({});
});

app.listen(PORT_MULTI_THREAD_SERVER, () => {
	console.log(`Server is Running on ${PORT_MULTI_THREAD_SERVER}`);
});
