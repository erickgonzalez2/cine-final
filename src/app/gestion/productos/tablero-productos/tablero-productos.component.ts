import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-tablero-productos',
  templateUrl: './tablero-productos.component.html',
  styleUrls: ['./tablero-productos.component.scss']
})
export class TableroProductosComponent implements OnInit {

  totalProductos = 0;
  currentPage = 0;

  productos : Producto[] = [];

  selectedTipos:[] = [];
  selectedNames: string;
  filter : string = '';

  constructor(
    private _productsService : ProductosService
  ) { }

  ngOnInit(): void {
    
    this.search();
  }

  search(){
    
  }

}
