import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Unidad } from 'src/app/models/unidad';

@Component({
  selector: 'app-form-unidades',
  templateUrl: './form-unidades.component.html',
  styleUrls: ['./form-unidades.component.scss']
})
export class FormUnidadesComponent implements OnInit {


  edit = false;

  unidadForm : FormGroup;

  selectedId: number = 0;

  constructor(
    private _productsService : ProductosService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.unidadForm = new FormGroup({
      name : new FormControl('',[Validators.required])
    })


    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)) {

      this._productsService.getUnitById(this.selectedId).pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status === 401 || error.status === 403) {
            Swal.fire('Error 401', 'No tiene permisos para acceder al recurso', 'error');
          }
          else if (error.status === 0) {
            Swal.fire('Error 0', 'No hay conexión con el servidor', 'error');
          }

          else if (error.status === 400) {
            Swal.fire('Error 400', 'Datos incorrectos', 'error');
          }

          else if (error.status === 500) {
            Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
          }

          else if (error.status === 404) {
            Swal.fire('Error 404', 'Unidad no encontrada', 'error');
          }

          return throwError(() => error);
        })
      )
      .subscribe({
        next : (response : any) =>{

          this.unidadForm.controls['name'].patchValue(response.nombre);
          this.edit = true;
        }
      })
    }
  }




  saveUnit(){

    let newUnit = new Unidad();

    if (!this.unidadForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.unidadForm.markAllAsTouched();
      return;
    }

    newUnit.nombre =  this.unidadForm.controls['name'].value;


    this._productsService.saveUnit(newUnit).pipe(
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
            'Unidad creada con éxito',
            'success');
          this._router.navigate(['/app/gestion/productos/unidades']);
        }
      })


  }


  updateUnit(){

    let unitUpdated : Unidad = new Unidad();

    if(!this.unidadForm.valid){
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.unidadForm.markAllAsTouched();
      return;
    }

    unitUpdated.nombre = this.unidadForm.controls['name'].value;

    this._productsService.updateUnit(unitUpdated, this.selectedId).pipe(
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
          Swal.fire('Error 404', 'Unidad no encontrada', 'error');
        }

        return throwError(() => error);
      }
      ))
      .subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Unidad actualizada con éxito',
            'success');
          this._router.navigate(['/app/gestion/productos/unidades']);
        }
      })

  }

}
