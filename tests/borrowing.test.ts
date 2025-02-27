import { expect } from "chai";
import app from "../src/app";
import request from "supertest";

describe("Borrowing test suite", () => {

    it('should pass a basic test', () => {
        expect(true).to.equal(true);
    });

    it('should borrow a token', async () => {
        const res = await request(app)
            .get('/api/markets/wsx/borrowAPY');
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('amount');
    });

});