const dataUtils = require('./data-utils');

function initAndWriteTaskBoardData(newTaskBoard) {
    dataUtils.init();
    dataUtils.writeJsonData(newTaskBoard);
}

function createTaskBoard() {
    const newTaskBoard = {
        teams: {},
        parkingLot: []
    };

    initAndWriteTaskBoardData(newTaskBoard);
}

function addTeam(teamName) {
    const teamBoard = {
        toDo: [],
        doing: [],
        done: []
    };

    dataUtils.update(`teams.${teamName}`, teamBoard);
}

function addTask({
    taskName,
    taskDescription = '',
    teamName = null,
    addToParkingLot = false,
    inProgress = false,
    isComplete = false
}) {
    const task = {
        name: taskName,
        description: taskDescription
    };

    if (!task.name) {
        throw new Error('Missing task name; cannot create new task.');
    }

    if (teamName !== null) {
        if (addToParkingLot) {
            const parkingLotItems = dataUtils.read(`parkingLot`);
            dataUtils.update(`parkingLot`, parkingLotItems.concat(task));

            return;
        }

        if (inProgress) {
            const doingItems = dataUtils.read(`teams.${teamName}.doing`);
            dataUtils.update(`teams.${teamName}.doing`, doingItems.concat(task));
        } else if (isComplete) {
            const doneItems = dataUtils.read(`teams.${teamName}.done`);
            dataUtils.update(`teams.${teamName}.done`, doneItems.concat(task));
        } else {
            const toDoItems = dataUtils.read(`teams.${teamName}.toDo`);
            dataUtils.update(`teams.${teamName}.toDo`, toDoItems.concat(task));
        }
    } else {
        const parkingLotItems = dataUtils.read(`parkingLot`);
        dataUtils.update(`parkingLot`, parkingLotItems.concat(task));

        return;
    }
}

module.exports = {
    addTeam,
    createTaskBoard,
    addTask
};