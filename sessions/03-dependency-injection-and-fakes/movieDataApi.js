function alwaysThrowError() {
    throw new Error('Unable to get data because you looked at me funny.');
}

module.exports = {
    getMovieByTitle: alwaysThrowError,
    getMoviesByGenre: alwaysThrowError
};