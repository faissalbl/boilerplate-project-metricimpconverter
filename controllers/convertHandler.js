function ConvertHandler() {

  // example matches: 9, 9.9, 9/9, 9.9/9, 9/9.9, 9.9/9.9, .9, .9/.9
  const NUM_REGEX = /[0-9]*[\.\/]*[0-9]*(\/[0-9]*[\.\/]*[0-9]*)?/;

  // any A-Z, a-z, at the end of the string
  const UNIT_REGEX = /[A-z]+$/;

  this.INVALID_NUMBER_AND_UNIT = 'invalid number and unit';
  this.INVALID_NUMBER = 'invalid number';
  this.INVALID_UNIT = 'invalid unit';

  this.FMT_DECIMALS = 5;

  // returns 1 if number is empty; returns INVALID_NUMBER if number is invalid.
  this.getNum = function(input) {
    let result;
    // number 1 if empty
    const numStr = (input || '').replace(UNIT_REGEX, '') || '1';

    try {
      // check for fractions
      // it would be absolutely fine to write fractions like 3/2/3,
      // but one of the requirements is to return an error in this case 
      // (double fractions)
      const numParts = numStr.split('/');
      if (numParts.length > 2) return this.INVALID_NUMBER;
      if (numParts.length > 1) {
        numParts.forEach((part, index) => {
          const n = parseFloat(part);
          if (index === 0) result = n;
          else result /= n;
        });
      } 
      else result = Number(numStr);
    } catch (err) {
      result = this.INVALID_NUMBER;
    }
    return result;
  };

  // returns the unit or, if empty, INVALID_UNIT
  this.getUnit = function(input) {
    // just interested at the last three characters
    const slicedInput = input.trim().slice(-3);
    let result = (slicedInput || '').replace(NUM_REGEX, '').trim().toLowerCase();
    if (result === 'l') result = result.toUpperCase();
    const validResult = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'].includes(result);
    if (!validResult) return this.INVALID_UNIT;
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal': result = 'L'; break;
      case 'L': result = 'gal'; break;
      case 'lbs': result = 'kg'; break;
      case 'kg': result = 'lbs'; break;
      case 'mi': result = 'km'; break;
      case 'km': result = 'mi'; break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'L': result = 'liters'; break;
      case 'gal': result = 'gallons'; break;
      case 'kg': result = 'kilograms'; break;
      case 'lbs': result = 'pounds'; break;
      case 'mi': result = 'miles'; break;
      case 'km': result = 'kilometers'; break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result, 
        returnNum;
    
    switch(initUnit) {
      case 'L': returnNum = initNum / galToL; break;
      case 'gal': returnNum = initNum * galToL; break;
      case 'kg': returnNum = initNum / lbsToKg; break;
      case 'lbs': returnNum = initNum * lbsToKg; break;
      case 'km': returnNum = initNum / miToKm; break;
      case 'mi': returnNum = initNum * miToKm; break;
    }

    if (returnNum) returnNum = Number(returnNum.toFixed(this.FMT_DECIMALS));

    const returnUnit = this.getReturnUnit(initUnit);

    const str = this.getString(initNum, initUnit, returnNum, returnUnit);

    result = { initNum, initUnit, returnNum, returnUnit, string: str };
    
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(this.FMT_DECIMALS)} ${this.spellOutUnit(returnUnit)}`;

    console.log('initNum:', initNum, 'initUnit:', initUnit, 'result:', result);
    
    return result;
  };

}

module.exports = ConvertHandler;
