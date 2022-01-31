const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


describe('Authorization', () => {

    describe('/POST /auth/signup', () => {
        it('should create a new user if all validations passes', (done) => {
            chai.request(app)
                .post('auth/signup')
                .send({
                    firstname: 'sunday',
                    lastname: 'omolade',
                    email: 'omoladesunday2021@gmail.com'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user').be.a('object');
                })
        })
    })

})