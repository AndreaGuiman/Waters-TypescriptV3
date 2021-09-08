// module.exports.log = log;
export { log };

function log(message: Error | string) {
	// using eval just to proove a point, should never ever use it in production
	// even for development, there are ways to mitigate this, so don't use it at all
	// tslint:disable:no-eval
	if (message instanceof Error)
		eval(`console.error("${String(message)}")`);
	else
		eval(`console.log("${message}")`);
	// tslint:enable
}
