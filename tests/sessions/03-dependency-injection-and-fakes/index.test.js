const { assert } = require('chai');

const MovieDataService = require('../../../sessions/03-dependency-injection-and-fakes/index');

describe('Movie Data Service', function () {

    function makeNewMovieDataApiFake({ movieToReturn, moviesToReturn }) {
        const movieDataApiFake = {
            getMovieByTitle: function() {
                return Promise.resolve(movieToReturn);
            },
            getMoviesByGenre: function () {
                return Promise.resolve(moviesToReturn);
            }
        };

        return movieDataApiFake;
    }

    function buildNewMovieDataService(fakeMovieData) {
        const movieDataApiFake = makeNewMovieDataApiFake(fakeMovieData);
        return new MovieDataService(movieDataApiFake);
    }

    function getActionMovies() {
        return [
            {
                title: 'Lethal Weapon',
                genre: 'Action',
                cast: ['Danny Glover', 'That one guy we don\'t talk about anymore']
            },
            {
                title: 'Batman',
                genre: 'Action',
                cast: ['Michael Keaton', 'Kim Basinger', 'Jack Nicholson']
            }
        ];
    }

    describe('get movie data from movieDataService', function () {

        it('returns a movie when the movie exists', function () {
            const movieToFind = 'Beetlejuice';
            
            const movieDataService = buildNewMovieDataService({
                movieToReturn: {
                    title: movieToFind
                }
            });

            return movieDataService
                .findMovieByTitle(movieToFind)
                .then(function (movieData) {
                    assert.equal(movieData.title, movieToFind);
                });
        });

        it('returns a different movie when the movie exists', function () {
            const movieToFind = 'Edward Scissorhands';

            const movieDataService = buildNewMovieDataService({
                movieToReturn: {
                    title: movieToFind
                }
            });

            return movieDataService
                .findMovieByTitle(movieToFind)
                .then(function (movieData) {
                    assert.equal(movieData.title, movieToFind);
                });
        });

    });

    describe('get all movies in a genre where selected actor is in the movie', function () {
    
        it('returns action movies with Michael Keaton in the cast', function () {
            const moviesToReturn = getActionMovies();

            const movieDataService = buildNewMovieDataService({
                moviesToReturn: moviesToReturn
            });

            const genreToSearch = 'Action';
            const actorToSearch = 'Michael Keaton';

            const expectedMovies = [moviesToReturn[1]];
            
            return movieDataService
                .findMoviesInGenreIncludingActor(genreToSearch, actorToSearch)
                .then(function(foundMovies) {
                    assert.equal(JSON.stringify(foundMovies), JSON.stringify(expectedMovies));
                });
        });

        it('returns action movies with Danny Glover in the cast', function () {
            const moviesToReturn = getActionMovies();

            const movieDataService = buildNewMovieDataService({
                moviesToReturn: moviesToReturn
            });

            const genreToSearch = 'Action';
            const actorToSearch = 'Danny Glover';

            const expectedMovies = [moviesToReturn[0]];
            
            return movieDataService
                .findMoviesInGenreIncludingActor(genreToSearch, actorToSearch)
                .then(function(foundMovies) {
                    assert.equal(JSON.stringify(foundMovies), JSON.stringify(expectedMovies));
                });
        });

    });

});