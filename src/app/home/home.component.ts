import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import {IndexedDBService} from './../service/indexed-db.service';
import {Movie} from './../model/entity';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
@Input() movies: Movie[];
slectedMovie: Movie= new Movie();
filteredItems: Movie[] = new Array<Movie>();
offset: number=100;
imageprefix: string='https://image.tmdb.org/t/p/w500/';
length: number = 0;
imagelinks: string[]=[];
view: any[] = [700, 400];
  data: Value[]=[
  {
    "name": "Progress",
    "value": 87
  }
];

  colorScheme = {
    domain: ['#5AA454', '#5AA454', '#5AA454']
  };
  
  onSelect(event) {
    console.log(event);
  }
  constructor(private indexservice: IndexedDBService) {
  }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    this.length = this.movies.length;
    for (let i = 0; i < this.length; i++)
    {
      if(!this.movies[i].poster_path.startsWith('https://'))
      this.movies[i].poster_path = this.imageprefix + this.movies[i].poster_path;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.length = this.movies.length;
    for (let i = 0; i < this.length; i++)
    {
      if(!this.movies[i].poster_path.startsWith('https://'))
      this.movies[i].poster_path = this.imageprefix + this.movies[i].poster_path;
    }
  }
  changeSelectedMovie(movie: Movie) {
    this.slectedMovie = movie;
    this.data.value=movie.vote_average;
  }
  assignCopy(){
   this.filteredItems = Object.assign([], this.movies);
}
filterItem(value){
   if(!value) this.assignCopy(); //when nothing has typed
   this.filteredItems = Object.assign([], this.movies).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
   )
}

}
export class Value{
  name:string;
  value:number;
}