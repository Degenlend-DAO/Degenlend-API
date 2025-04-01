import "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app";
import { createServer } from "http";

const userAddress = '0x4869aF0Aed0a9948f724f809dC0DCcF9885cCe34';

describe("USDC Money Markets Tests", () => {

    let server: any; // Type gets decided at line 14

    before(function(done) {
        server = createServer(app);
        server.listen(done);
    })

    after(function (done) {
        server.close(done); // Stop the server after tests
    });

    it("GET /api/markets/usdc should return 404", async () => {
        supertest(server).get("/api/markets/usdc").end((err, res) => {
            expect(res.status).to.equal(404);
        });
    });

    //---------------------------- MARKET ROUTES -----------------------//

    it("GET /api/markets/usdc/supplyAPY should return 200 and supply APY", async (done) => {
        supertest(server).get("/api/markets/usdc/supplyAPY").end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("apy");
            expect(res.body).to.have.property("success", true);
        });

    });

    it("GET /api/markets/usdc/borrowAPY should return 200 and borrow APY", async (done) => {
        supertest(server).get("/api/markets/usdc/borrowAPY").end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property("success", true);
            expect(res.body).to.have.property("apy");
        });
    });

    it("GET /api/markets/usdc/supplyBalance/:userAddress should return 200 and supply balance", async (done) => {
        supertest(server).get(`/api/markets/usdc/supplyBalance/${userAddress}`).end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property("success", true);
            expect(res.body).to.have.property("supplyBalance");
        });
    });

    it("GET /api/markets/usdc/borrowBalance/:userAddress should return 200 and borrow balance", async (done) => {
        supertest(server).get(`/api/markets/usdc/borrowBalance/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body).to.have.property("borrowBalance");
            if (err) return done(err);
        })
    });

    it("POST /api/markets/usdc/approve should return 200 and transaction hash", async (done) => {
        supertest(server)
            .post("/api/markets/usdc/approve")
            .send({ amount: 1000, spender: "0x1234567890123456789012345678901234567890" }).end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });

    });

    it("POST /api/markets/usdc/mint should return 200 and transaction hash", async (done) => {
        supertest(server)
            .post("/api/markets/usdc/mint")
            .send({ amount: 1000 }).end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });

    it("POST /api/markets/usdc/borrow should return 200 and transaction hash", async (done) => {
        supertest(server)
            .post("/api/markets/usdc/borrow")
            .send({ amount: 1000 }).end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });

    it("POST /api/markets/usdc/redeem should return 200 and transaction hash", async (done) => {
        supertest(server)
            .post("/api/markets/usdc/redeem")
            .send({ amount: 1000 }).end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            })
    });

    it("POST /api/markets/usdc/repayBorrow should return 200 and transaction hash", async (done) => {
        supertest(server)
            .post("/api/markets/usdc/repayBorrow")
            .send({ amount: 1000 }).end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });
});