import { Component } from '@angular/core';

import {IndexedDBService} from './service/indexed-db.service';
import {MovieDBService} from './service/movie-db.service';

import {Movie, Entity} from './model/entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIMILITY';
   m: Movie= new Movie();
   movies:Movie[] = new Array<Movie>();
errorMessage: string;
     constructor(private indexservice: IndexedDBService, private entity: Entity,private movieservice: MovieDBService,) {
     this.openDB('MovieDB');
     this.clearMovie();
     this.getMoviesFromApi();
   }
openDB(dbName: string) {

        // Opens the database.
        this.indexservice.openDBAsync(dbName, 1).forEach(

            // Next.
            (readyState: string) => {

                console.log('IndexedDB service: opening db: ' + readyState);

            }, null

        ).then(

            () => {

                // Gets all records from "TodoStore".
               this.readMovie();
            }

            );

    }
addMovie(movie: Movie) {
  this.entity.addMovie(movie);
  this.indexservice.addRecordAsync('MovieStore', movie).forEach(
            // Next.
            (readyState) => { console.log('IndexedDB service: adding record: ' + readyState); }, null
        );
}
clearMovie() {
  this.entity.clearMovies();
  this.indexservice.clearObjectStoreAsync('MovieStore').forEach(
            // Next.
            (readyState) => { console.log('IndexedDB service: adding record: ' + readyState); }, null
        );
}
readMovie()
{
 this.indexservice.getAllRecordsAsync('MovieStore').forEach(
                    // Next.
                    (record: Movie) => {
                        if (record != null) {
                            this.entity.addMovie(record);
                        }
                    }, null).then(() => console.log('IndexedDB service: obtaining of all records completed.'));
this.movies = this.entity.movies;
}
getMoviesFromApi(){
  this.movieservice.getMovies().subscribe(
                       (data: any) =>(this.movies = data,this.addindividualmovies()),
                       error =>  this.errorMessage = <any>error);

}
addindividualmovies()
{if (this.movies.length > 0){
    console.log('inside if ');
     for (let m of this.movies)
  {
     console.log('inside add movies ');
      this.addMovie(m);
  }}

}
}
