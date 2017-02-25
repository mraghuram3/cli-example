import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Movie } from './../model/entity';
@Injectable()
export class MovieDBService {
    key: string = 'aebd531f88c06b7f621444d841075ac9';
    apiurl: string = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.key + '&language=en-US&page=1';
    constructor(private http: Http){

    }
     getMovies (): Observable<Movie[]> {
    return this.http.get(this.apiurl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json().results;
    console.log(body);
    return body;
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}