const assert = require('assert')

const {postRecoG}  = require('../poiscopi')

var sum = function (a,b){return a+b;}

describe( "my first dumb test", () => {
    const test = [ 1, 2 ]
    const result = sum (1,2);
    it("should return 3" , () =>{
    assert( result, 3 );
  })



})

describe ( "node mail test" , () => {


    // expect ( sum ( 1,2)).to.equal(expected);
}

)

describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });

 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});
