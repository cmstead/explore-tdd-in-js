const { assert } = require('chai');
var State = require('../../../sessions/02-methods-properties-and-objects/State');

describe('test methods and properties on an app state object', function () {

    describe('app initial state', function () {
        it('contains a property called count and it is initialized to 0', function () {
            const appState = new State();

            const actualCount = appState.count;
            const expectedCount = 0;

            assert.equal(actualCount, expectedCount);
        });
    });

    describe('incrementing app count state', function () {
        it('increments the count by one when incrementCount method is called', function () {
            const appState = new State();

            appState.incrementCount();

            const actualCount = appState.count;
            const expectedCount = 1;

            assert.equal(actualCount, expectedCount);
        });

        it('increments the count by 3 when incrementCount method is called with 3', function () {
            const appState = new State();

            appState.incrementCount(3);

            const actualCount = appState.count;
            const expectedCount = 3;

            assert.equal(actualCount, expectedCount);
        });

        it('throws an error when incrementValue is less than 1', function () {
            const appState = new State();

            function performIncrement() {
                appState.incrementCount(-1);
            }

            assert.throws(performIncrement, 'Cannot increment with values less than one. Received: -1');
        });
    });

    describe('resetting app count state', function () {
        it('resets app count state when reset is called', function () {
            const appState = new State();

            appState.incrementCount(); // we know because of other tests, this makes count = 1

            appState.resetCount();

            const actualCount = appState.count;
            const expectedCount = 0;

            assert.equal(actualCount, expectedCount);
        });
    });

    it('zzzzzz is just a demo', function () {
        const appState = new State();

        console.log(appState.name);

        appState.name = "Not Bob";

        console.log(appState.name);

        appState.resetName();

        console.log(appState.name);
    });
});