// const { env } = require("./env");
import { env } from "./env";

// const { makeApp } = require("./app");
import { makeApp } from "./app";

// const { log } = require("./log");
import { log } from "./log";

makeApp()
	.then(app => app.listen(env.PORT, () => log(`${env.NODE_ENV} server listening on port ${env.PORT}`)))
	.catch(err => log(err));
