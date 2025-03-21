import "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app";
import { createServer } from "http";

const userAddress = '0x4869aF0Aed0a9948f724f809dC0DCcF9885cCe34';

describe("WSX Money Markets Tests", () => {
    
    let server: any;

    before(function(done) {
        server = createServer(app);
        server.listen(done);
    });

    after(function(done) {
        server.close(done);
    })

    it("GET /api/markets/wsx should return 404", async () => {
        supertest(server).get("/api/markets/wsx").end((err, res) => {
            expect(res.status).to.equal(404);
        });
    });

    //---------------------------- MARKET ROUTES -----------------------//

    it("GET /api/markets/wsx/supplyAPY should return 200 and supply APY", async () => {
        supertest(server).get("/api/markets/wsx/supplyAPY").end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body.data).to.have.property("apy");
        });

    });

    it("GET /api/markets/wsx/borrowAPY should return 200 and borrow APY", async () => {
        supertest(server).get("/api/markets/wsx/borrowAPY").end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body.data).to.have.property("apy");
        });
    });

    it("GET /api/markets/wsx/supplyBalance/:userAddress should return 200 and supply balance", async () => {
        supertest(server).get(`/api/markets/wsx/supplyBalance/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body.data).to.have.property("supplyBalance");
        });
    });

    it("GET /api/markets/wsx/borrowBalance/:userAddress should return 200 and borrow balance", async () => {
        supertest(server).get(`/api/markets/wsx/borrowBalance/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("success", true);
            expect(res.body.data).to.have.property("borrowBalance");
        });
    });

    it("POST /api/markets/wsx/approve should return 200 and transaction hash", async () => {
        supertest(server)
            .post("/api/markets/wsx/approve")
            .send({ amount: 1000, spender: "0x1234567890123456789012345678901234567890" }).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });

    it("POST /api/markets/wsx/mint should return 200 and transaction hash", async () => {
        supertest(server)
            .post("/api/markets/wsx/mint")
            .send({ amount: 1000 }).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });

    it("POST /api/markets/wsx/borrow should return 200 and transaction hash", async () => {
        supertest(server)
            .post("/api/markets/wsx/borrow")
            .send({ amount: 1000 }).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });

    it("POST /api/markets/wsx/redeem should return 200 and transaction hash", async () => {
        supertest(server)
            .post("/api/markets/wsx/redeem")
            .send({ amount: 1000 }).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });

    it("POST /api/markets/wsx/repayBorrow should return 200 and transaction hash", async () => {
        supertest(server)
            .post("/api/markets/wsx/repayBorrow")
            .send({ amount: 1000 }).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("success", true);
                expect(res.body).to.have.property("txHash");
            });
    });
    
});