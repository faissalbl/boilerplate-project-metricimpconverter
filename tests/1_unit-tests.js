const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  function testInputAndExpectedNumber(input, expectedNumber) {
    const resultingNumber = convertHandler.getNum(input);
    assert.strictEqual(expectedNumber, resultingNumber);
  }

  function testInputAndExpectedUnit(input, expectedUnit) {
    const resultingUnit = convertHandler.getUnit(input);
    assert.strictEqual(expectedUnit, resultingUnit);
  }

  function testExpectedReturnUnit(unit, expectedReturnUnit) {
    const returnUnit = convertHandler.getReturnUnit(unit);
    assert.strictEqual(expectedReturnUnit, returnUnit);
  }

  function testExpectedSpelledOutUnit(unit, expectedSpelledOutUnit) {
    const spelledOutUnit = convertHandler.spellOutUnit(unit);
    assert.strictEqual(spelledOutUnit, expectedSpelledOutUnit);
  }

  function testExpectedConvertedNumAndUnit(initNum, initUnit, expectedReturnNum, expectedReturnUnit, expectedStr) {
    const { initNum: resInitNum, initUnit: resInitUnit, returnNum, returnUnit, string } = convertHandler.convert(initNum, initUnit);

    assert.equal(initNum, resInitNum);
    assert.equal(initUnit, resInitUnit);
    assert.equal(expectedReturnNum, returnNum);
    assert.equal(expectedReturnUnit, returnUnit);
    assert.equal(expectedStr, string);
  }

  test('should correctly read a whole number input', () => {
    testInputAndExpectedNumber('3mi', 3);
    assert.isTrue(true);
  });

  test('should correctly read a decimal number input', () => {
    testInputAndExpectedNumber('3.2mi', 3.2);
    assert.isTrue(true);
  });

  test('should correctly read a fractional input', () => {
    testInputAndExpectedNumber('3/2mi', 3/2);
    assert.isTrue(true);
  });

  test('should correctly read a fractional input with a decimal', () => { 
    testInputAndExpectedNumber('3.2/2mi', 3.2/2);     
    testInputAndExpectedNumber('3/2.2mi', 3/2.2);     
    testInputAndExpectedNumber('3.2/2.2mi', 3.2/2.2);    
    assert.isTrue(true);
  });

  test('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
    testInputAndExpectedNumber('3/2/3', 'invalid number');
    assert.isTrue(true);
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    testInputAndExpectedNumber('mi', 1);
    assert.isTrue(true);
  });

  test('should correctly read each valid input unit', () => {
    testInputAndExpectedUnit('1gal', 'gal');
    testInputAndExpectedUnit('1l', 'L');
    testInputAndExpectedUnit('1mi', 'mi');
    testInputAndExpectedUnit('1km', 'km');
    testInputAndExpectedUnit('1lbs', 'lbs');
    testInputAndExpectedUnit('1kg', 'kg');
    assert.isTrue(true);
  });

  test('incoming units should be accepted in both upper and lower case, but should be returned in lowercase, except L', () => {
    testInputAndExpectedUnit('1Gal', 'gal');
    testInputAndExpectedUnit('1GAL', 'gal');
    testInputAndExpectedUnit('1l', 'L');
    testInputAndExpectedUnit('1L', 'L');
    testInputAndExpectedUnit('1mi', 'mi');
    testInputAndExpectedUnit('1Mi', 'mi');
    testInputAndExpectedUnit('1MI', 'mi');
    testInputAndExpectedUnit('1km', 'km');
    testInputAndExpectedUnit('1Km', 'km');
    testInputAndExpectedUnit('1KM', 'km');
    testInputAndExpectedUnit('1lbs', 'lbs');
    testInputAndExpectedUnit('1Lbs', 'lbs');
    testInputAndExpectedUnit('1LBS', 'lbs');
    testInputAndExpectedUnit('1kg', 'kg');
    testInputAndExpectedUnit('1Kg', 'kg');
    testInputAndExpectedUnit('1KG', 'kg');
    assert.isTrue(true);
  });

  test('should correctly return an error for an invalid input unit', () => {
    testInputAndExpectedUnit('1notValidUnit', 'invalid unit');
    testInputAndExpectedUnit('32g', 'invalid unit');
    assert.isTrue(true);
  });

  test('should return the correct return unit for each valid input unit', () => {
    testExpectedReturnUnit('gal', 'L');
    testExpectedReturnUnit('L', 'gal');
    testExpectedReturnUnit('lbs', 'kg');
    testExpectedReturnUnit('kg', 'lbs');
    testExpectedReturnUnit('mi', 'km');
    testExpectedReturnUnit('km', 'mi');
    assert.isTrue(true);
  });

  test('should correctly return the spelled-out string unit for each valid input unit', () => {
    testExpectedSpelledOutUnit('L', 'liters');
    testExpectedSpelledOutUnit('gal', 'gallons');
    testExpectedSpelledOutUnit('kg', 'kilograms');
    testExpectedSpelledOutUnit('lbs', 'pounds');
    testExpectedSpelledOutUnit('mi', 'miles');
    testExpectedSpelledOutUnit('km', 'kilometers');
    assert.isTrue(true);
  });

  test('should correctly get the string representing the conversion', () => {
    const initNum = 3.1, 
          initUnit = 'mi', 
          returnNum = 4.98895, 
          returnUnit = 'km';
    
    const expectedStr = `${initNum} ${convertHandler.spellOutUnit(initUnit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`;
    const resultingStr = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    assert.strictEqual(expectedStr, resultingStr);
    assert.isTrue(true);
  });

  test('should correctly convert gal to L', () => {
    const initNum = 4, 
          initUnit = 'gal', 
          returnNum = 15.14164, 
          returnUnit = 'L',
          str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    testExpectedConvertedNumAndUnit(initNum, initUnit, returnNum, returnUnit, str);
    assert.isTrue(true);
  });

  test('should correctly convert L to gal', () => {
    const initNum = 15.14164, 
          initUnit = 'L', 
          returnNum = 4, 
          returnUnit = 'gal',
          str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    testExpectedConvertedNumAndUnit(initNum, initUnit, returnNum, returnUnit, str);
    assert.isTrue(true);
  });

  test('should correctly convert mi to km', () => {
    const initNum = 3.1, 
          initUnit = 'mi', 
          returnNum = 4.98895, 
          returnUnit = 'km',
          str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    testExpectedConvertedNumAndUnit(initNum, initUnit, returnNum, returnUnit, str);
    assert.isTrue(true);
  });
  
  test('should correctly convert km to mi', () => {
    const initNum = 4.98895, 
          initUnit = 'km', 
          returnNum = 3.1, 
          returnUnit = 'mi',
          str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    testExpectedConvertedNumAndUnit(initNum, initUnit, returnNum, returnUnit, str);
    assert.isTrue(true);
  });
  
  test('should correctly convert lbs to kg', () => {
    const initNum = 1.8, 
          initUnit = 'lbs', 
          returnNum = 0.81647, 
          returnUnit = 'kg',
          str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    testExpectedConvertedNumAndUnit(initNum, initUnit, returnNum, returnUnit, str);
    assert.isTrue(true);
  });

  test('should correctly convert kg to lbs', () => {
    const initNum = 0.81647, 
          initUnit = 'kg', 
          returnNum = 1.80001, 
          returnUnit = 'lbs',
          str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    testExpectedConvertedNumAndUnit(initNum, initUnit, returnNum, returnUnit, str);
    assert.isTrue(true);
  });
});