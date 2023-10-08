'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    // num will be 1 if empty
    const num = convertHandler.getNum(input);

    // unit is invalid if empty
    const unit = convertHandler.getUnit(input);
    if (num === convertHandler.INVALID_NUMBER && unit === convertHandler.INVALID_UNIT) {
      return res.end(convertHandler.INVALID_NUMBER_AND_UNIT);
    }
    if (num === convertHandler.INVALID_NUMBER) return res.end(num);
    if (unit === convertHandler.INVALID_UNIT) return res.end(unit);

    return res.json(convertHandler.convert(num, unit));
  });

};
