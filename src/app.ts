// const express = require("express");
import * as express from "express";
// const { env } = require("./env");
import { env } from "./env";
// const { discoveryClientRouter } = require("./routes/discovery-client.route");
import { discoveryClientRouter } from "./routes/discovery-client.route";
// const { aJsonRouter } = require("./routes/a-json.route");
import { setAJsonRoute } from "./routes/a-json.route";
import { IExpressError } from "./interfaces/IExpressError";
// import { MikroORM, ReflectMetadataProvider } from "mikro-orm";
import { MongoDriver } from "@mikro-orm/mongodb";
import entities from "./entities/";
import { IExpressRequest } from "./interfaces/IExpressRequest";
import * as bodyParser from "body-parser";
import {ReflectMetadataProvider, MikroORM} from "@mikro-orm/core";
// module.exports.makeApp = makeApp;
export { makeApp };

// const url = 'mongodb://localhost:27017';

let app: express.Application;

async function makeApp(): Promise<express.Application> {
	if (app) return app;

	// const client = new MongoClient(url);
	// await client.connect();

	app = express();

	const orm = await MikroORM.init<MongoDriver>({
		metadataProvider: ReflectMetadataProvider,
		cache: { enabled: false },
		entities: entities,
		dbName: env.DB_NAME,
		clientUrl: env.MONGO_URL,
		type: "mongo"
	});

	// make the entity manager available in request
	app.use((req: IExpressRequest, _res: express.Response, next: express.NextFunction) => {
		req.em = orm.em.fork();
		next();
	});

	console.log(env);
	// middleware
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// routes
	app.use(env.DISCOVERY_CLIENT_ROUTE, discoveryClientRouter);
	app.use(env.A_JSON_ROUTE, setAJsonRoute);

	app.use(env.A_JSON_ROUTE, setAJsonRoute(express.Router()));

	// 404
	app.use((err: IExpressError, _req: IExpressRequest, _res: express.Response, next: express.NextFunction) => {
		// could have created a full ExpressError class with a constructor to extend Error instead of the interface
		err.status = 404;
		next(err);
	});

	// 500
	app.use((err: IExpressError, _req: IExpressRequest, res: express.Response, _next: express.NextFunction) => {
		res.status(err.status || 500).send(env.NODE_ENV === "development" ? err : {});
	});

	return app;
}
