import "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

const userAddress = '0x1234567890123456789012345678901234567890';

describe("USDC Money Markets Tests", () => {

    it("GET /api/markets/usdc should return 404", async () => {
        const response = await request(app).get("/api/markets/usdc");
        expect(response.status).to.equal(404);
    });

    //---------------------------- MARKET ROUTES -----------------------//

    it("GET /api/markets/usdc/supplyAPY should return 200 and supply APY", async () => {
        const response = await request(app).get("/api/markets/usdc/supplyAPY");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("apy");
    });

    it("GET /api/markets/usdc/borrowAPY should return 200 and borrow APY", async () => {
        const response = await request(app).get("/api/markets/usdc/borrowAPY");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("apy");
    });

    it("GET /api/markets/usdc/supplyBalance/:userAddress should return 200 and supply balance", async () => {
        const response = await request(app).get(`/api/markets/usdc/supplyBalance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("supplyBalance");
    });

    it("GET /api/markets/usdc/borrowBalance/:userAddress should return 200 and borrow balance", async () => {
        const response = await request(app).get(`/api/markets/usdc/borrowBalance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("borrowBalance");
    });

    it("POST /api/markets/usdc/approve should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/usdc/approve")
            .send({ amount: 1000, spender: "0x1234567890123456789012345678901234567890" });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/usdc/mint should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/usdc/mint")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/usdc/borrow should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/usdc/borrow")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/usdc/redeem should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/usdc/redeem")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/usdc/repayBorrow should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/usdc/repayBorrow")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });
});