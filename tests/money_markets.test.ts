import "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../src/app";


describe("Money Markets Tests", () => {
    it("GET /api/markets should return 404", async () => {
        //  This is a url that doesn't exist
        const response = await request(app).get("/api/markets");
        expect(response.status).to.equal(404);
    });

    //----------------------------  ROUTES -----------------------//

    // tests for the account entrypoint
    it("GET /api/account should return 404", async () => {
        //  This is a url that doesn't exist
        const response = await request(app).get("/api/account");
        expect(response.status).to.equal(404);
    });


    // tests for the market entrypoint
    it("GET /api/markets should return 404", async () => {
        //  This is a url that doesn't exist"
        const response = await request(app).get("/api/markets");
        expect(response.status).to.equal(404);
    });

    // tests for the markets entrypoint
    it("GET /api/markets/usdc should return 404", async () => {
        // This is a url that doesn't exist
        const response = await request(app).get("/api/markets/usdc");
        expect(response.status).to.equal(404);
    });

    // tests for the markets entrypoint
    it("GET /api/markets/wsx should return 404", async () => {
        // This is a url that doesn't exist
        const response = await request(app).get("/api/markets/wsx");
        expect(response.status).to.equal(404);
    });

    // Diving deeper into individual routes

    // USDC: 9 routes


    // WSX: 9 routes

    // Token activities



    //---------------------------- ACCOUNT ROUTES -----------------------//

    // Test RPC url
    it("GET /api/account/rpc_url should return 200", async () => {

        const response = await request(app).get("/api/account/rpc_url");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("rpcUrl");

    });

    // Test network id
    it("GET /api/account/network_id should return 200", async () => {
        const response = await request(app).get("/api/account/network_id");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("networkId");
    });

    it("GET /api/account/chain_id should return 200", async () => {
        const response = await request(app).get("/api/account/chain_id");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("chainId");
    });

    // TODO: account liquidity tests


});