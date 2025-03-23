import "mocha";
import { Done } from "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import { createServer } from "http";
import supertest from "supertest";


const userAddress = '0x4869aF0Aed0a9948f724f809dC0DCcF9885cCe34';

describe("Account Tests", () => {

    let server: any;

    before(function(done) {
        server = createServer(app);  // Start the server & listen in
        server.listen(done);
    })

    after(function(done) {
        server.close(done); // stop the server after the tests
    })

    //---------------------------- ACCOUNT ROUTES -----------------------//

    // tests for the account entrypoint
    it("GET /api/account should return 404", async () => {
        //  This is a url that doesn't exist
        
        supertest(server).get("/api/account").end((err, res) => {
            expect(res.status).to.equal(404)
        })
    });

    // Test RPC url
    it("GET /api/account/rpc_url should return 200", async () => {

        // supertest(server).get("/api/account/rpc_url");
        supertest(server).get("/api/account/rpc_url").end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("rpcUrl");
            
        })


    });

    // Test network id
    it("GET /api/account/network_id should return 200", async () => {
        supertest(server).get("/api/account/network_id").expect(200).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("networkId");
        })

    });

    it("GET /api/account/chain_id should return 200", async () => {
        
        supertest(server).get("/api/account/chain_id").end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("chainId");
        });

    });

    //---------------------------- ACCOUNT LIQUIDITY ROUTES -----------------------//


    it("GET /api/account/liquidity/:userAddress should return 200", async () => {

        supertest(server).get(`/api/account/liquidity/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("liquidity");
        });

    });

    it("GET /api/account/balance/:userAddress should return 200", async () => {

            supertest(server).get(`/api/account/balance/${userAddress}`).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("balance");
            })
    });

    it("GET /api/account/supplyBalance/:userAddress should return 200", async () => {

        supertest(server).get(`/api/account/supplyBalance/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("supplyBalance");
        })
    });

    it("GET /api/account/borrowBalance/:userAddress should return 200", async () => {

        supertest(server).get(`/api/account/borrowBalance/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("borrowBalance");
        })
        
    });

    it("GET /api/account/apy/:userAddress should return 200", async () => {

        supertest(server).get(`/api/account/apy/${userAddress}`).end((err, res) =>{
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("apy");
        });

    });

    it("GET /api/account/borrowLimit/:userAddress should return 200", async () => {
        
        supertest(server).get(`/api/account/borrowLimit/${userAddress}`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("borrowLimit");
        });

    });

    //---------------------------- ACCOUNT ROUTES ACTIVITIES -----------------------//

    it("POST /api/account/enterMarket should return 200", async () => {

        supertest(server).post(`/api/account/enterMarket`).end((err, res) =>{
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
        });

    });

    it("POST /api/account/exitMarket should return 200", async () => {

        supertest(server).post(`/api/account/exitMarket`).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
        });

    });
});