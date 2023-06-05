import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-tablero-peliculas',
  templateUrl: './tablero-peliculas.component.html',
  styleUrls: ['./tablero-peliculas.component.scss']
})
export class TableroPeliculasComponent implements OnInit {

  
  totalPeliculas = 0;
  currentPage = 0;
  selectedNames: string;
  peliculas : Pelicula[] = [];

  filter: string = '';

  constructor(
    private _peliculasService : PeliculasService
  ) { }

  ngOnInit(): void {

    this.search();
  }


  search(){

    let names: string[] = this.filter.trim().split(/\s+/);

    names = names.filter(element => {
      return element != '' && element != ' '
    })

    this.selectedNames = names.join(',');

    this._peliculasService.findPeliculas(this.selectedNames,this.currentPage,20).subscribe({
      next : (response : any) => {
        this.peliculas = response.peliculas;
        this.totalPeliculas = response.count;
      }
    })
  }

}
