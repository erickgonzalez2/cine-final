import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Unidad } from 'src/app/models/unidad';
import Swal from 'sweetalert2';
import { Insumo } from 'src/app/models/insumo';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-insumos',
  templateUrl: './form-insumos.component.html',
  styleUrls: ['./form-insumos.component.scss']
})
export class FormInsumosComponent implements OnInit {

  edit = false;  

  insumosForm : FormGroup;

  unidades : Unidad[] = [];

  selectedId : number = 0;

  constructor(
    private _productsService : ProductosService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.insumosForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required,Validators.min(0.00000001)]),
      unidad: new FormControl('', [Validators.required]),
    })

    this._productsService.getAllUnits().subscribe({
      next : (response : any) => {
        this.unidades = response; 
      }
    })

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)){

      this._productsService.getInsumoById(this.selectedId).pipe(
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
            Swal.fire('Error 404', 'Insumo no encontrado', 'error');
          }

          return throwError(() => error);
        })
      ).subscribe({
        next : (response : any) => {


          this.insumosForm.controls['name'].patchValue(response.nombre);
          this.insumosForm.controls['precio'].patchValue(response.precio);
          this.insumosForm.controls['unidad'].patchValue(response.unidad.id);
          this.edit = true;

        }
      })

    }
  }


  saveInsumo(){

    let newInsumo : Insumo = new Insumo();
    
    if (!this.insumosForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.insumosForm.markAllAsTouched();
      return;
    }


    newInsumo.nombre = this.insumosForm.controls['name'].value;
    newInsumo.precio = this.insumosForm.controls['precio'].value;
    newInsumo.stock = 0;
    newInsumo.unidad.id = this.insumosForm.controls['unidad'].value;


    this._productsService.saveInsumo(newInsumo).pipe(
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
            'Insumo creado con éxito',
            'success');
          this._router.navigate(['/app/gestion/productos/insumos']);
        }
      })

  }

  updateInsumo(){

    if (!this.insumosForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.insumosForm.markAllAsTouched();
      return;
    }


    let insumoUpdated : Insumo = new Insumo();

    insumoUpdated.id = this.selectedId;
    insumoUpdated.nombre = this.insumosForm.controls['name'].value;
    insumoUpdated.precio = this.insumosForm.controls['precio'].value;
    insumoUpdated.unidad.id = this.insumosForm.controls['unidad'].value;

    this._productsService.updateInsumo(insumoUpdated,this.selectedId).pipe(
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
          Swal.fire('Error 404', 'Insumo no encontrado', 'error');
        }


        return throwError(() => error);
      }
    ))
    .subscribe({
      next : (response : any) => {
        Swal.fire('Mensaje',
            'Insumo actualizado con éxito',
            'success');
          this._router.navigate(['/app/gestion/productos/insumos']);
      }
    })

  }
}
