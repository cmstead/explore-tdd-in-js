const { assert } = require('chai');
const intro = require('../intro.js');

// @cm_stead on Twitter
// https://github.com/cmstead/explore-tdd-in-js

describe("Introduction to TDD - first tests", function () {

    // Cycle looks like this:

    // Red - the test failed
    // Green - the test passed
    // Refactor - modify the code so it keeps the same
    //            behavior but is easier to maintain


    describe("hello", function () {

        it("returns 'Hello, World!' when called with no arguments", function () {
            const result = intro.hello();

            assert.equal(result, 'Hello, World!');
        });

        it("return 'Hello, Bob!' when called with 'Bob'", function () {
            // Arrange (Given)
            // Define the initial program state
            const nameToDisplay = 'Bob';

            // Act (When)
            // Call the method to run the behavior
            const result = intro.hello(nameToDisplay);

            // Assert (Then)
            // Verify (assert) your expectation matches reality
            assert.equal(result, 'Hello, Bob!');
        });

    });

    describe("findFirstOddNumber", function () {

        it("returns odd number from an array containing only one number, which is odd", function () {
            // Arrange
            // Define the initial program state
            const arrayContainingOneOddNumber = [5];

            // Act
            // Call the method to run the behavior
            const result = intro.findFirstOddNumber(arrayContainingOneOddNumber);

            // Assert
            // Verify (assert) your expectation matches reality
            assert.equal(result, 5);
        });

        it("returns null when no odd number is found in an empty array", function () {
            // Arrange
            // Define the initial program state
            const emptyArray = [];

            // Act
            // Call the method to run the behavior
            const result = intro.findFirstOddNumber(emptyArray);

            // Assert
            // Verify (assert) your expectation matches reality
            assert.equal(result, null);
        });

        it("returns an odd number which is not the first in the array", function () {
            // Arrange
            // Define the initial program state
            const arrayOfNumbersContainingOddInSecondPosition = [2, 3, 6];

            // Act
            // Call the method to run the behavior
            const actualResult = intro.findFirstOddNumber(arrayOfNumbersContainingOddInSecondPosition);

            // Assert
            // Verify (assert) your expectation matches reality
            const expectedResult = arrayOfNumbersContainingOddInSecondPosition[1];

            assert.equal(actualResult, expectedResult);
        });

        it("returns null when array contains only even numbers", function(){
            // Arrange
            // Define the initial program state
            const arrayOfOnlyEvenNumbers = [2, 4, 6, 8, 10];
            
            // Act
            // Call the method to run the behavior
            const result = intro.findFirstOddNumber(arrayOfOnlyEvenNumbers);
            
            // Assert
            // Verify (assert) your expectation matches reality
            assert.strictEqual(result, null);
        });
    });

});