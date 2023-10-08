const { parentPort } = require("worker_threads");

const t0 = performance.now();
let total = 0;
for (let i = 0; i < 10000000000; i++) {
	total = total + i;
	// console.log(i);
}

const t1 = performance.now();
const timeTook = Math.floor(t1 - t0);
console.log("Call to doSomething took:", timeTook, " milliseconds.");

parentPort.postMessage({ total, timeTook });
