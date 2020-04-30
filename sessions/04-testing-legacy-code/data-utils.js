const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'store.json');

function init() {
    try{
        fs.lstatSync(dataPath);
    } catch (e) {
        initAndClear();
    }
}

function initAndClear() {
    fs.writeFileSync(dataPath, '');
}

function deleteDataFile() {
    try{
        fs.unlinkSync(dataPath);
    } catch(e) {
        // intentionally left blank
    }
}

function readJsonData() {
    try {
        const currentContent = fs.readFileSync(dataPath, { encoding: 'utf8' });
        return JSON.parse(currentContent);
    } catch (e) {
        return null;
    }
}

function writeJsonData(data) {
    const newContent = JSON.stringify(data, null, 4);
    fs.writeFileSync(dataPath, newContent);
}

function last(values) {
    return values[values.length - 1];
}

function getRef(keyTokens, currentData) {
    return keyTokens.reduce(
        (currentRef, keyToken) =>
            currentRef[keyToken],
        currentData
    );
}

function update(key, data) {
    const keyTokens = key.split('.');

    const dataSearchPath = keyTokens.slice(0, keyTokens.length - 1);
    const keyToUpdate = last(keyTokens);

    const currentData = readJsonData();

    const foundRef = getRef(dataSearchPath, currentData);

    foundRef[keyToUpdate] = data;

    writeJsonData(currentData);
}

function read(key) {
    const keyTokens = key.split('.');
    const currentData = readJsonData();
    
    return getRef(keyTokens, currentData);
}

module.exports = {
    deleteDataFile,
    init,
    initAndClear,
    read,
    readJsonData,
    update,
    writeJsonData
}