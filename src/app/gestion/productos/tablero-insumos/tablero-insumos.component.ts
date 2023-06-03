import { Component, OnInit } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { ProductosService } from '../productos.service';
import { Unidad } from 'src/app/models/unidad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablero-insumos',
  templateUrl: './tablero-insumos.component.html',
  styleUrls: ['./tablero-insumos.component.scss']
})
export class TableroInsumosComponent implements OnInit {

  totalInsumos = 0;
  currentPage = 0;

  unidades: Unidad[] = [];
  insumos: Insumo[] = [];

  selectedUnidades: [] = [];
  selectedOrder: number[] = [];
  selectedNames: string;
  filter: string = '';

  constructor(
    private _productsService: ProductosService
  ) { }

  ngOnInit(): void {

    this._productsService.getAllUnits().subscribe({
      next: (response: any) => {
        this.unidades = response;
      }
    })

    this.search();

  }


  search() {

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

    this._productsService.findInsumos(this.selectedNames,this.selectedUnidades,this.currentPage,20,tipoOrdenamientoPrecio,tipoOrdenamientoStock).subscribe({
      next : (response : any) => {
        this.insumos = response.insumos;
        this.totalInsumos = response.count;
      }
    })


  }

}
