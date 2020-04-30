const dataUtils = require('../../../sessions/04-testing-legacy-code/data-utils');
const taskBoardSystem = require('../../../sessions/04-testing-legacy-code');

const { assert } = require('chai');

describe('Create a new task board', function () {

    it('creates a new task board when createTaskBoard is called', function () {
        dataUtils.deleteDataFile();

        taskBoardSystem.createTaskBoard();

        const expectedTaskBoard = {
            teams: {},
            parkingLot: []
        };

        const actualTaskBoard = dataUtils.readJsonData();

        assert.equal(JSON.stringify(actualTaskBoard), JSON.stringify(expectedTaskBoard));
    });

    it('flushes and creates a new task board when createTaskBoard is called', function () {
        dataUtils.writeJsonData({
            thisShouldBeGone: 'something else'
        });

        taskBoardSystem.createTaskBoard();

        const expectedTaskBoard = {
            teams: {},
            parkingLot: []
        };

        const actualTaskBoard = dataUtils.readJsonData();

        assert.equal(JSON.stringify(actualTaskBoard), JSON.stringify(expectedTaskBoard));
    });    

});