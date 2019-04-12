import { expect } from "chai";
import request from "supertest";
import app from "../../../src/index";

/**
 * Tests for '/v1/humans'
 */
describe("Humans Controller Test", () => {
  it("should return list of humans", done => {
    request(app)
      .get("/v1/humans")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.have.property("name");
        expect(res.body[0]).to.have.property("age");

        done();
      });
  });

  it("should get information of human", done => {
    request(app)
      .get("/v1/humans/Jack")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("age");

        done();
      });
  });

  it("should respond with not found error if random human name is provided", done => {
    request(app)
      .get("/v1/humans/Sara")
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.statusCode).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal("Not found human by this name.");

        done();
      });
  });

  it("should return list of Jack's pets", done => {
    request(app)
      .get("/v1/humans/Jack/pets")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.have.property("name");
        expect(res.body[0]).to.have.property("type");

        done();
      });
  });

  it("should respond with not found pets error if human's age more than 30", done => {
    request(app)
      .get("/v1/humans/Jane/pets")
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.statusCode).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal(
          "Not found pet for this human, because the human's age is more than 30"
        );

        done();
      });
  });
});
