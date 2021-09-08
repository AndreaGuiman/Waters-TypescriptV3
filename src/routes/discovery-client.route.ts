// const express = require("express");
import * as express from "express";
import { Router } from "express";

// const { env } = require("../env");
import { env } from "../env";

const discoveryClientRouter = express.Router();

// module.exports.discoveryClientRouter = discoveryClientRouter;
export {discoveryClientRouter};

discoveryClientRouter.get("/", getdiscoveryClient);

function getdiscoveryClient(_req: express.Request, res: express.Response, _next: express.NextFunction) {
	try {
		const clientSettings = {
			jsonRoute: env.A_JSON_ROUTE
		};
		return res.json(clientSettings);
	} catch (ex) {
		return _next(ex);
	}
}

export function setDiscoveryClientRoute(router: Router): Router {
	router.get("/", getdiscoveryClient);
	return router;
}
