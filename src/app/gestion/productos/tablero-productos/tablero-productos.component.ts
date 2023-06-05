import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from '../productos.service';
import Swal from 'sweetalert2';

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
  selectedOrder: number[] = [];
  filter : string = '';

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

    if (this.selectedOrder.includes(1) && this.selectedOrder.includes(2) || (this.selectedOrder.includes(3) && this.selectedOrder.includes(4))) {
      Swal.fire('Error',
        'Los filtros no pueden solaparse entre si',
        'error');
      return;
    }

    let tipoOrdenamientoPrecio = 0;
    let tipoOrdenamientoStock = 0;

    this.selectedOrder.forEach(element => {
      switch (element) {
        case 1:
          tipoOrdenamientoPrecio = 2;
          break;
        case 2:
          tipoOrdenamientoPrecio = 1;
          break;
        case 3:
          tipoOrdenamientoStock = 2;
          break;
        case 4:
          tipoOrdenamientoStock = 1;
          break;
      }
    })

    this._productsService.findProducts(this.selectedNames,this.selectedTipos,this.currentPage,20,tipoOrdenamientoPrecio,tipoOrdenamientoStock).subscribe({
      next : (response : any) => {
        this.productos = response.productos;
        this.totalProductos = response.count;
      }
    })
    
  }

}
