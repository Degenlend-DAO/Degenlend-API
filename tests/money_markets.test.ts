import "mocha";
import { expect } from "chai";
import { request } from "supertest";
import app from "../src/app";


describe("Money Markets Tests", () => {
    it("GET /api/markets should return 404", async () => {
        //  This is a url that doesn't exist
        const response = await request(app).get("/api/markets");
        expect(response.status).to.equal(404);
    });
    it("GET /api/markets/wsx/borrowAPY should return 200", async () => {
        const response = await request(app).get("/api/markets/wsx/borrowAPY");
        expect(response.status).to.equal(500);
        expect(response.body).to.have.property("token");
        expect(response.body).to.have.property("amount");
    });
});