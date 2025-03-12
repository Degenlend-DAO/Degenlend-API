import "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

const userAddress = '0x4869aF0Aed0a9948f724f809dC0DCcF9885cCe34';

describe("WSX Money Markets Tests", () => {

    it("GET /api/markets/wsx should return 404", async () => {
        const response = await request(app).get("/api/markets/wsx");
        expect(response.status).to.equal(404);
    });

    //---------------------------- MARKET ROUTES -----------------------//

    it("GET /api/markets/wsx/supplyAPY should return 200 and supply APY", async () => {
        const response = await request(app).get("/api/markets/wsx/supplyAPY");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("apy");
    });

    it("GET /api/markets/wsx/borrowAPY should return 200 and borrow APY", async () => {
        const response = await request(app).get("/api/markets/wsx/borrowAPY");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("apy");
    });

    it("GET /api/markets/wsx/supplyBalance/:userAddress should return 200 and supply balance", async () => {
        const response = await request(app).get(`/api/markets/wsx/supplyBalance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("supplyBalance");
    });

    it("GET /api/markets/wsx/borrowBalance/:userAddress should return 200 and borrow balance", async () => {
        const response = await request(app).get(`/api/markets/wsx/borrowBalance/${userAddress}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.have.property("borrowBalance");
    });

    it("POST /api/markets/wsx/approve should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/wsx/approve")
            .send({ amount: 1000, spender: "0x1234567890123456789012345678901234567890" });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/wsx/mint should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/wsx/mint")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/wsx/borrow should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/wsx/borrow")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/wsx/redeem should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/wsx/redeem")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });

    it("POST /api/markets/wsx/repayBorrow should return 200 and transaction hash", async () => {
        const response = await request(app)
            .post("/api/markets/wsx/repayBorrow")
            .send({ amount: 1000 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("txHash");
    });
    
});