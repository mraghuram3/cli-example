import { Injectable } from '@angular/core';

/**
 * Movie entity.
 */
export class Movie {

    /**
     * Key.
     */
    poster_path: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    title: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
    id: number;
    adult: boolean;
    original_title: string;
    original_language: string;
    backdrop_path: string;
    video: boolean;
}

/**
 * Entity class. Defines each entity and its methods.
 */
@Injectable() export class Entity {

    /**
     * Movies entity.
     */
    movies: Array<Movie> = [];
    index: number;
    addMovie(record: Movie) {

        this.movies.push(record);

    }

    deleteMovie(record: Movie) {

        this.index = this.movies.indexOf(record);
        this.movies.splice(this.index, 1);

    }

    editMovie(record: Movie) {

        this.index = this.movies.indexOf(record);
        this.movies[this.index].id = record.id;
        this.movies[this.index].title = record.title;
        this.movies[this.index].poster_path = record.poster_path;
        this.movies[this.index].overview = record.overview;
        this.movies[this.index].release_date = record.release_date;
        this.movies[this.index].adult = record.adult;
        this.movies[this.index].genre_ids = record.genre_ids;
        this.movies[this.index].popularity = record.popularity;
        this.movies[this.index].vote_count = record.vote_count;
        this.movies[this.index].vote_average = record.vote_average;
        this.movies[this.index].original_title = record.original_title;
        this.movies[this.index].original_language = record.original_language;
        this.movies[this.index].backdrop_path = record.backdrop_path;
        this.movies[this.index].video = record.video;

    }

    clearMovies() {

        this.movies.splice(0);

    }
    sortMoviesByTitle() {

        this.movies = this.movies.sort((record1, record2) => {

            if (record1.title > record2.title) {
                return 1;
            }

            if (record1.title < record2.title) {
                return -1;
            }

            return 0;
        });

    }

}
