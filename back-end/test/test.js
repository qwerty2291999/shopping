/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

const account = {
  email: 'blackcat22.ngu@gmail.com',
  password: '123',
};
const account1 = {
  email: 'blackcat221.ngu@gmail.com',
  password: '123',
};
const data = {
  flashsaleId: 100000031,
  itemQuantity: 1,
  itemAttributeId: 100000014,
};
const data1 = {
  flashsaleId: 10000003,
  itemQuantity: 1,
  itemAttributeId: 100000014,
};
const code = {
  code: 'TAITVA',
};
const code1 = {
  code: 'TAITVAa',
};
const item = {
  id: '100000200',
};
const item1 = {
  id: '100000199',
};
describe('/test Auth API', () => {
  it('test success login', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(account)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 200);
        }
      });
    done();
  });
  it('test failed login', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(account1)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 404);
        }
      });
    done();
  });
});

describe('/test Order API', () => {
  it('test success create order', (done) => {
    chai
      .request(app)
      .post('/myorder/create')
      .send(data)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 200);
        }
      });
    done();
  });
  it('test failed create order', (done) => {
    chai
      .request(app)
      .post('/myorder/create')
      .send(data1)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 404);
        }
      });
    done();
  });
  it('test success applycode', (done) => {
    chai
      .request(app)
      .post('/myorder/applyvoucher')
      .send(code)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 200);
        }
      });
    done();
  });
  it('test failed applycode', (done) => {
    chai
      .request(app)
      .post('/myorder/applyvoucher')
      .send(code1)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 404);
        }
      });
    done();
  });
  it('test remove voucher', (done) => {
    chai
      .request(app)
      .post('/myorder/removevoucher')
      .send(code1)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 200);
        }
      });
    done();
  });
  it('test success remove item in order', (done) => {
    chai
      .request(app)
      .post('/myorder/delete')
      .send(item)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 200);
        }
      });
    done();
  });
  it('test failed remove item in order', (done) => {
    chai
      .request(app)
      .post('/myorder/delete')
      .send(item1)
      .set('Content-Type', 'application/json')
      .set(
        'token',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDQ3LCJ1c2VybmFtZSI6ImxvbmcyMjkxOTk5IiwiZW1haWwiOiJibGFja2NhdDIyLm5ndUBnbWFpbC5jb20iLCJ2ZXJpZnkiOiJ2ZXJpZmllZCIsImlhdCI6MTYzNTE0MjA1MCwiZXhwIjoxNjM1NzQ2ODUwfQ.XAGgMZKi3eg5zLFQhHnDM2wf08uxL5jz6rI_n95179I',
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          chai.assert.equal(res.status, 404);
        }
      });
    done();
  });
});
