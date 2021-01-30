let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("GET /fault", () => {
        it("It should NOT GET", (done) => {
            chai.request(server)
                .get("/fault")
                .end((err, response) => {
                    response.should.have.status(404);
                   
                done();
                });
        });

       

    });




});


