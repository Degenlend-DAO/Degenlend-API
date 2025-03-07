import "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import router from "../src/routes/market.routes";

const userAddress = '0x1234567890123456789012345678901234567890';

describe("Money Markets Tests", () => {
    it("GET /api/markets should return 404", async () => {
        //  This is a url that doesn't exist
        const response = await request(app).get("/api/markets");
        expect(response.status).to.equal(404);
    });

    //---------------------------- MARKET ROUTES -----------------------//


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

});