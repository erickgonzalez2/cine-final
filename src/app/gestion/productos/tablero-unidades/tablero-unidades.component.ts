import { Component, OnInit } from '@angular/core';
import { Unidad } from 'src/app/models/unidad';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-tablero-unidades',
  templateUrl: './tablero-unidades.component.html',
  styleUrls: ['./tablero-unidades.component.scss']
})
export class TableroUnidadesComponent implements OnInit {


  totalUnidades = 0;
  currentPage = 0;
  selectedNames: string;
  unidades : Unidad[] = [];

  filter: string = '';

  constructor(
    private _productsService : ProductosService
  ) { }

  ngOnInit(): void {

    this.search();

  }  


  search(){

    let names: string[] = this.filter.trim().split(/\s+/);

    names = names.filter(element => {
      return element != '' && element != ' '
    })

    this.selectedNames = names.join(',')

    this._productsService.findUnits(this.selectedNames,this.currentPage,20).subscribe({
      next : (response : any) => {
        this.unidades = response.unidades;
        this.totalUnidades = response.count;
      }
    })


  }

}
