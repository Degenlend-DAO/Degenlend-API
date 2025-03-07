import "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import router from "../src/routes/market.routes";

const userAddress = '0x1234567890123456789012345678901234567890';

describe("Account Tests", () => {

    //---------------------------- ACCOUNT ROUTES -----------------------//

    // tests for the account entrypoint
    it("GET /api/account should return 404", async () => {
        //  This is a url that doesn't exist
        const response = await request(app).get("/api/account");
        expect(response.status).to.equal(404);
    });

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

    //---------------------------- ACCOUNT LIQUIDITY ROUTES -----------------------//


    it("GET /api/account/liquidity/:userAddress should return 200", async () => {
        const response = await request(app).get(`/api/account/liquidity/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("liquidity");
    });

    it("GET /api/account/balance/:userAddress should return 200", async () => {
        const response = await request(app).get(`/api/account/balance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("balance");
    });

    it("GET /api/account/supplyBalance/:userAddress should return 200", async () => {
        const response = await request(app).get(`/api/account/supplyBalance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("supplyBalance");
    });

    it("GET /api/account/borrowBalance/:userAddress should return 200", async () => {
        const response = await request(app).get(`/api/account/borrowBalance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("borrowBalance");
    });

    it("GET /api/account/apy/:userAddress should return 200", async () => {
        const response = await request(app).get(`/api/account/apy/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("apy");
    });

    it("GET /api/account/borrowLimit/:userAddress should return 200", async () => {
        const response = await request(app).get(`/api/account/borrowLimit/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("borrowLimit");
    });

    //---------------------------- ACCOUNT ROUTES ACTIVITIES -----------------------//

    it("POST /api/account/enterMarket should return 200", async () => {
        const response = await request(app).post(`/api/account/enterMarket`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message");
    });

    it("POST /api/account/exitMarket should return 200", async () => {
        const response = await request(app).post(`/api/account/exitMarket`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message");
    });
});