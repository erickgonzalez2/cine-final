import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../peliculas.service';
import { Pelicula } from 'src/app/models/pelicula';
import { Sala } from 'src/app/models/sala';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { Funcion } from 'src/app/models/funcion';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export function minDateValidator(): ValidatorFn {

  let today = new Date();

  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = control.value;

    if (selectedDate && selectedDate >= today) {
      return null;
    }

    return { minDate: true };
  };
}

@Component({
  selector: 'app-form-funciones',
  templateUrl: './form-funciones.component.html',
  styleUrls: ['./form-funciones.component.scss'],
})
export class FormFuncionesComponent implements OnInit {

  minHourValue: Date = new Date();

  todayFunction: boolean = false;

  edit = false;

  selectedId: number = 0;

  funcionForm: FormGroup;

  peliculas: Pelicula[] = [];
  salas: Sala[] = [];

  constructor(
    private _peliculaService: PeliculasService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.minHourValue.setMinutes(this.minHourValue.getMinutes() + 30)

    this.funcionForm = new FormGroup({
      pelicula: new FormControl('', [Validators.required]),
      sala: new FormControl('', [Validators.required]),
      precio_general: new FormControl('', [Validators.required, Validators.min(0.01)]),
      precio_desc: new FormControl('', [Validators.required, Validators.min(0.01)]),
      start: new FormControl('', [Validators.required, minDateValidator()]),
      end: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
    })

    this._peliculaService.finAllPeliculasEnabled().subscribe({
      next: (response: any) => {
        this.peliculas = response;
      }
    })

    this._peliculaService.findAllSalasEnabled().subscribe({
      next: (response: any) => {
        this.salas = response;
      }
    })
  }


  saveFuncion() {

    if (this.todayFunction) {
      this.saveOne();
    }
    else {
      this.saveMany();
    }
  }

  updateFuncion() {

  }


  saveMany() {

    if (!this.funcionForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.funcionForm.markAllAsTouched();
      return;
    }


    let funciones: Funcion[] = [];


    let dateInit = new Date(this.funcionForm.controls['start'].value);
    let endDate = new Date(this.funcionForm.controls['end'].value);
    let hora = new Date(this.funcionForm.controls['hora'].value);

    while (dateInit <= endDate) {

      dateInit.setHours(hora.getHours());
      dateInit.setMinutes(hora.getMinutes());
      dateInit.setSeconds(hora.getSeconds());

      let year = dateInit.getFullYear();
      let month = dateInit.getMonth() + 1;
      let day = dateInit.getDate();
      let hours = dateInit.getHours();
      let minutes = dateInit.getMinutes();
      let seconds = dateInit.getSeconds();

      let fechaFuncion = `${year}-${this.padNumber(month)}-${this.padNumber(day)}T${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;

      let funcion: Funcion = new Funcion();

      funcion.pelicula = this.funcionForm.controls['pelicula'].value;
      funcion.sala = this.funcionForm.controls['sala'].value;
      funcion.precio_general = this.funcionForm.controls['precio_general'].value;
      funcion.precio_desc = this.funcionForm.controls['precio_desc'].value;
      funcion.estado = true;
      funcion.fecha_hora = fechaFuncion;

      funciones.push(funcion);
      dateInit.setDate(dateInit.getDate() + 1); // Incrementa la fecha en un día
      dateInit.setHours(0, 0, 0);

    }

    console.log(funciones);

    this._peliculaService.saveManyFunciones(funciones).pipe(
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

        else if (error.status === 404) {
          Swal.fire('Error 400', error.error.error, 'error');
        }

        else if (error.status === 500) {
          Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
        }

        return throwError(() => error);
      })).subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Funciones creadas con éxito',
            'success');
          this._router.navigate(['/app/gestion/peliculas/funciones']);
        }
      })

  }


  saveOne() {

    if (!this.funcionForm.controls['pelicula'].valid || !this.funcionForm.controls['sala'].value
      || !this.funcionForm.controls['precio_general'].value || !this.funcionForm.controls['precio_desc'].value
      || !this.funcionForm.controls['hora'].value) {
        
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.funcionForm.markAllAsTouched();
      return;
    }

    let dateInit = new Date();
    let hora = new Date(this.funcionForm.controls['hora'].value);

    dateInit.setHours(hora.getHours());
    dateInit.setMinutes(hora.getMinutes());
    dateInit.setSeconds(hora.getSeconds());


    let year = dateInit.getFullYear();
    let month = dateInit.getMonth() + 1;
    let day = dateInit.getDate();
    let hours = dateInit.getHours();
    let minutes = dateInit.getMinutes();
    let seconds = dateInit.getSeconds();

    let fechaFuncion = `${year}-${this.padNumber(month)}-${this.padNumber(day)}T${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;

    let funcion: Funcion = new Funcion();
    funcion.pelicula = this.funcionForm.controls['pelicula'].value;
    funcion.sala = this.funcionForm.controls['sala'].value;
    funcion.precio_general = this.funcionForm.controls['precio_general'].value;
    funcion.precio_desc = this.funcionForm.controls['precio_desc'].value;
    funcion.estado = true;
    funcion.fecha_hora = fechaFuncion;

    this._peliculaService.saveOneFuncion(funcion).pipe(
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

        else if (error.status === 404) {
          Swal.fire('Error 400', error.error.error, 'error');
        }

        else if (error.status === 500) {
          Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
        }

        return throwError(() => error);
      })).subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Funcion creada con éxito',
            'success');
          this._router.navigate(['/app/gestion/peliculas/funciones']);
        }
      })

  }


  padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

}
