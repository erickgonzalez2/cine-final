import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-tablero-salas',
  templateUrl: './tablero-salas.component.html',
  styleUrls: ['./tablero-salas.component.scss']
})
export class TableroSalasComponent implements OnInit {

  totalSalas = 0;
  currentPage = 0;
  selectedNames: string;
  salas : Sala[] = [];

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

    this._peliculasService.findSalas(this.selectedNames,this.currentPage,20).subscribe({
      next : (response : any) => {
        this.salas = response.salas;
        this.totalSalas = response.count;
      }
    })
  }

}
