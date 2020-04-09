function hello(name = 'World') {
    // if(typeof name !== 'undefined') {
    //     return 'Hello, ' + name + '!';
    // } else {
    //     return 'Hello, World!';
    // }

    return `Hello, ${name}!`;
}

function isOddNumber(numberValue) {
    return numberValue % 2 !== 0;
}

function findFirstOddNumber(numberArray) {
    // old, original solution for test 1
    // return 5; // cheating out.

    // if(numberArray.length === 0) {
    //     return null;
    // } else {
    // for(let i = 0; i < numberArray.length; i++) {
    //     if(numberArray[i] % 2 !== 0) {
    //         return numberArray[i];
    //     }
    // }

    // return null;
    // }
    const maybeOddNumber = numberArray.find(isOddNumber);

    return typeof maybeOddNumber === 'undefined'
        ? null
        : maybeOddNumber;
}

module.exports = {
    hello,
    findFirstOddNumber
}