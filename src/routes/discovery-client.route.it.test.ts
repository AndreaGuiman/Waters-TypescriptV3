// integration test example for a single route, with 'supertest'
// when routes are doing too much, be free to use `proxyquire` instead of import/require to mock the deps down the chain

import * as express from "express";
import * as supertest from "supertest";
import { env } from "../env";
import { setDiscoveryClientRoute } from "./discovery-client.route";

describe(`GET ${env.DISCOVERY_CLIENT_ROUTE}`, () => {
	let app: express.Application;

	beforeEach(() => app = express());

	it("success", done => {
		app.use(env.DISCOVERY_CLIENT_ROUTE, setDiscoveryClientRoute(express.Router()));

		supertest(app)
			.get(env.DISCOVERY_CLIENT_ROUTE)
			.expect(200, { jsonRoute: env.A_JSON_ROUTE }, done);
	});
});
