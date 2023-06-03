import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Insumo } from 'src/app/models/insumo';
import { ProductosService } from '../productos.service';
import { ProductoInsumos } from 'src/app/models/producto-insumos';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent implements OnInit {

  edit = false;

  insumos: Insumo[] = [];

  productosInsumos: ProductoInsumos[] = [];

  productForm : FormGroup;

  selectedId : number = 0;

  productType = '';

  constructor(
    private _productsService : ProductosService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.productForm = new FormGroup({
      codigo : new FormControl('',[Validators.required]),
      name : new FormControl('',[Validators.required]),
      estado : new FormControl(false,[Validators.required]),
      precio : new FormControl('',[Validators.required,Validators.min(0.000001)],),
      costo : new FormControl('',[Validators.required,Validators.min(0.00001)]),
      tipoProducto : new FormControl('',[Validators.required]),
    });

    this._productsService.getAllInsumos().subscribe({
      next : (respose : any) => {
        this.insumos = respose;
      }
    })

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })


  }


  saveProduct(){

  }


  updateProduct(){

  }

}
