import { expect } from "chai";
import app from "../../src/index";
import request from "supertest";

describe("Base API Test", () => {
  it("should return API version and title for the app", done => {
    request(app)
      .get("/v1")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.app).to.be.equal(app.locals.title);
        expect(res.body.apiVersion).to.be.equal(app.locals.version);

        done();
      });
  });
});
