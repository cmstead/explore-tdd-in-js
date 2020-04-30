const dataUtils = require('../../../sessions/04-testing-legacy-code/data-utils');
const taskBoardSystem = require('../../../sessions/04-testing-legacy-code');

const { assert } = require('chai');

describe('Add task to board', function () {

    beforeEach(function () {
        // This isolates tests from each other.
        // It does NOT isolate tests when they run in parallel
        taskBoardSystem.createTaskBoard();
    });

    it('adds a task to parking lot when task only has a name', function () {
        const simpleTask = { taskName: 'a very simple task' };

        taskBoardSystem.addTask(simpleTask);

        const expectedTask = {
            "name": "a very simple task",
            "description": ""
        };

        const actualTask = dataUtils.read('parkingLot.0');

        assert.equal(JSON.stringify(actualTask), JSON.stringify(expectedTask));
    });

    it('adds a task to parking lot when task has only a name and description', function () {
        const taskWithNameAndDescription = {
            taskName: 'A brand new task',
            taskDescription: 'Some words and other information type stuff goes here.'
        };

        taskBoardSystem.addTask(taskWithNameAndDescription);

        const expectedTask = {
            name: 'A brand new task',
            description: 'Some words and other information type stuff goes here.'
        };

        const actualTask = dataUtils.read('parkingLot.0');

        assert.equal(JSON.stringify(actualTask), JSON.stringify(expectedTask));
    });

    it('adds a task to the TeamA toDo column when task has a team name', function() {
        taskBoardSystem.addTeam('TeamA');

        const taskWithTeamName = {
            taskName: 'a team task',
            teamName: 'TeamA'
        };

        taskBoardSystem.addTask(taskWithTeamName);

        const expectedTask = {
            name: 'a team task',
            description: ''
        };

        const actualTask = dataUtils.read('teams.TeamA.toDo.0');

        assert.equal(JSON.stringify(actualTask), JSON.stringify(expectedTask));
    });

});