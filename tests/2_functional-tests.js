const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  function sendReqAndTest (url, testFn) {
    chai
      .request(server)
      .keepOpen()
      .get(url)
      .end((err, res) => {
        testFn(err, res);
      });
  }
  
  test('Convert a valid input such as 10L', async () => {
    sendReqAndTest('/api/convert?input=10L', (err, res) => {
      const { initNum, initUnit, returnNum, returnUnit, string } = res.body;
      assert.equal(initNum, 10);
      assert.equal(initUnit, 'L');
      assert.equal(returnNum, 2.64172);
      assert.equal(returnUnit, 'gal');
      assert.equal(string, '10 liters converts to 2.64172 gallons');
    });
  });

  test('Convert an invalid input such as 32g', async () => {
    sendReqAndTest('/api/convert?input=32g', (err, res) => {
      assert.equal(res.text, 'invalid unit');
    });
  });

  test('Convert an invalid number such as 3/7.2/4kg', async () => {
    sendReqAndTest('/api/convert?input=3/7.2/4kg', (err, res) => {
      assert.equal(res.text, 'invalid number');
    });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', async () => {
    sendReqAndTest('/api/convert?input=3/7.2/4kilomegagram', (err, res) => {
      assert.equal(res.text, 'invalid number and unit');
    });
  });

  test('Convert with no number such as kg', async () => {
    sendReqAndTest('/api/convert?input=kg', (err, res) => {
      const { initNum, initUnit, returnNum, returnUnit, string } = res.body;
      assert.equal(initNum, 1);
      assert.equal(initUnit, 'kg');
      assert.equal(returnNum, 2.20462);
      assert.equal(returnUnit, 'lbs');
      assert.equal(string, '1 kilograms converts to 2.20462 pounds');
    });
  });
});
