function MovieDataService(movieDataApi) {
    this.movieDataApi = movieDataApi;
}

MovieDataService.buildService = function() {
    const movieDataApi = require('./movieDataApi');
    return new MovieDataService(movieDataApi);
}

MovieDataService.prototype = {
    findMovieByTitle: function(movieTitle) {
        return this.movieDataApi.getMovieByTitle(movieTitle);
    },

    findMoviesInGenreIncludingActor: function(genre, actor) {
        return this.movieDataApi
            .getMoviesByGenre(genre)
            .then(function(allMovies){
                return allMovies.filter(movie => movie.cast.includes(actor));
            });
    },
};

module.exports = MovieDataService;