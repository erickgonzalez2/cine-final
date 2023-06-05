import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Insumo } from 'src/app/models/insumo';
import { ProductosService } from '../productos.service';
import { ProductoInsumos } from 'src/app/models/producto-insumos';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent implements OnInit {

  edit = false;

  insumos: Insumo[] = [];

  productosInsumos: ProductoInsumos[] = [];

  productForm: FormGroup;
  productInsumoForm: FormGroup;

  selectedId: number = 0;

  addInsumo = false;

  totalCostoProductoInsumo = 0;

  productType = '';

  constructor(
    private _productsService: ProductosService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.productForm = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      estado: new FormControl(false, [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(0.000001)],),
      costo: new FormControl('', [Validators.required, Validators.min(0.00001)]),
      tipoProducto: new FormControl('', [Validators.required]),
    });

    this.productInsumoForm = new FormGroup({
      insumo: new FormControl('', [Validators.required]),
      cantidadDescarga: new FormControl('', [Validators.required, Validators.min(0.0000001)])
    })

    this._productsService.getAllInsumos().subscribe({
      next: (respose: any) => {
        this.insumos = respose;
      }
    })

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)) {

      this._productsService.getProductById(this.selectedId).pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status === 401 || error.status === 403) {
            Swal.fire('Error 401', 'No tiene permisos para acceder al recurso', 'error');
          }
          else if (error.status === 0) {
            Swal.fire('Error 0', 'No hay conexión con el servidor', 'error');
          }

          else if (error.status === 400) {
            Swal.fire('Error 400', error.error.error, 'error');
          }

          else if (error.status === 500) {
            Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
          }

          else if (error.status === 404) {
            Swal.fire('Error 404', 'Producto no encontrado', 'error');
          }

          return throwError(() => error);
        })
      ).subscribe({
        next: (response: Producto) => {


          this.productForm.controls['name'].patchValue(response.nombre);
          this.productForm.controls['precio'].patchValue(response.precio);
          this.productForm.controls['estado'].patchValue(response.estado);
          this.productForm.controls['codigo'].patchValue(response.codigo);
          this.productForm.controls['costo'].patchValue(response.costo);


          if (response.tipoProducto == 'COMPUESTO') {
            this.productType = 'COMPUESTO';
            this.productForm.controls['tipoProducto'].patchValue(2);
            this.productosInsumos = response.insumos;
          }
          else {
            this.productType = 'FABRICA';
            this.productForm.controls['tipoProducto'].patchValue(1);
          }

          this.edit = true;

        }
      })

    }


  }


  saveProduct() {

    let newProduct = new Producto();

    if (!this.productForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.productType == 'COMPUESTO' && this.productosInsumos.length <= 0) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.productForm.markAllAsTouched();
      return;
    }

    newProduct.nombre = this.productForm.controls['name'].value;
    newProduct.codigo = this.productForm.controls['codigo'].value;
    newProduct.estado = this.productForm.controls['estado'].value;
    newProduct.precio = this.productForm.controls['precio'].value;
    newProduct.costo = this.productForm.controls['costo'].value;    
    newProduct.stock = 0;
    newProduct.tipoProducto = this.productType;



    this._productsService.saveProducto(newProduct, this.productosInsumos)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            Swal.fire('Error 401', 'No tiene permisos para acceder al recurso', 'error');
          }
          else if (error.status === 0) {
            Swal.fire('Error 0', 'No hay conexión con el servidor', 'error');
          }

          else if (error.status === 400) {
            Swal.fire('Error 400', error.error.error, 'error');
          }

          else if (error.status === 500) {
            Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
          }

          return throwError(() => error);
        }))
      .subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Producto creado con éxito',
            'success');
          this._router.navigate(['/app/gestion/productos']);
        }
      })

  }


  updateProduct() {

    if (!this.productForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.productType == 'COMPUESTO' && this.productosInsumos.length <= 0) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.productForm.markAllAsTouched();
      return;
    }

      let productUpdated: Producto = new Producto();

      productUpdated.id = this.selectedId;
      productUpdated.nombre = this.productForm.controls['name'].value;
      productUpdated.codigo = this.productForm.controls['codigo'].value;
      productUpdated.estado = this.productForm.controls['estado'].value;
      productUpdated.precio = this.productForm.controls['precio'].value;
      productUpdated.costo = this.productForm.controls['costo'].value;
      productUpdated.tipoProducto = this.productType;

      this._productsService.updateProducto(productUpdated,this.productosInsumos,this.selectedId).pipe(
        catchError((error: HttpErrorResponse) => {
  
          if (error.status === 401 || error.status === 403) {
            Swal.fire('Error 401', 'No tiene permisos para acceder al recurso', 'error');
          }
          else if (error.status === 0) {
            Swal.fire('Error 0', 'No hay conexión con el servidor', 'error');
          }
  
          else if (error.status === 400) {
            Swal.fire('Error 400', error.error.error, 'error');
          }
  
          else if (error.status === 500) {
            Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
          }
  
          else if (error.status === 404) {
            Swal.fire('Error 404', 'Producto no encontrado', 'error');
          }
  
  
          return throwError(() => error);
        }
      ))
      .subscribe({
        next : (response : any) => {
          Swal.fire('Mensaje',
              'Producto actualizado con éxito',
              'success');
            this._router.navigate(['/app/gestion/productos']);
        }
      })
    

  }



  setProductType(event) {

    console.log(event);

    if (event.value == 1) {
      this.productType = 'FABRICA';
      this.productForm.controls['costo'].enable();
      this.productForm.controls['costo'].patchValue(0);
    }
    else {
      this.productForm.controls['costo'].disable();
      this.productType = 'COMPUESTO';
      this.productForm.controls['costo'].patchValue(this.totalCostoProductoInsumo);
    }

  }

  saveItemInsumo() {

    if (this.productInsumoForm.valid) {

      let productoInsumo: ProductoInsumos = new ProductoInsumos();
      productoInsumo.insumo = this.productInsumoForm.controls['insumo'].value;

      //Valida si el insumo ya fue agregado
      if (this.validProductoInsumo(productoInsumo)) {

        Swal.fire(
          'Error',
          'El insumo ya ha sido agregado',
          'error'
        );
        return;
      }

      productoInsumo.cantidad_descarga = this.productInsumoForm.controls['cantidadDescarga'].value;

      let totalCostoInsumo = productoInsumo.cantidad_descarga * productoInsumo.insumo.precio;

      this.totalCostoProductoInsumo += totalCostoInsumo;
      this.productForm.controls['costo'].patchValue(this.totalCostoProductoInsumo);

      this.productosInsumos.push(productoInsumo);
      this.addInsumo = false;
      this.productInsumoForm.reset();
    }
    else {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.productInsumoForm.markAllAsTouched();
      return;
    }
  }

  deleteItemInsumo(index: number, productoInsumo: ProductoInsumos) {

    Swal.fire({
      title: 'Confirmar acción',
      text: '¿Estás seguro de que deseas continuar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosInsumos.splice(index, 1);

        let restarTotal = productoInsumo.cantidad_descarga * productoInsumo.insumo.precio;

        this.totalCostoProductoInsumo -= restarTotal;
        this.productForm.controls['costo'].patchValue(this.totalCostoProductoInsumo);
      }
    });

  }


  validProductoInsumo(productoInsumo: ProductoInsumos) {

    return this.productosInsumos.some(productoInsumoItem => {
      return productoInsumo.insumo === productoInsumoItem.insumo;
    });

  }

}
