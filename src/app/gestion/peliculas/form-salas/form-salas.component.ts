import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../peliculas.service';
import { Sala } from 'src/app/models/sala';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-salas',
  templateUrl: './form-salas.component.html',
  styleUrls: ['./form-salas.component.scss']
})
export class FormSalasComponent implements OnInit {

  edit = false;

  salaForm: FormGroup;

  selectedId: number = 0;

  constructor(
    private _peliculaService: PeliculasService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.salaForm = new FormGroup({
      no_sala: new FormControl('', [Validators.required]),
      no_filas: new FormControl('', [Validators.required, Validators.min(1)]),
      no_asientos: new FormControl('', [Validators.required, Validators.min(1)]),
      estado: new FormControl(false)
    });

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)) {

      this._peliculaService.getSalaById(this.selectedId).pipe(
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
            Swal.fire('Error 404', 'Sala no encontrada', 'error');
          }

          return throwError(() => error);
        })
      ).subscribe({
        next: (response: Sala) => {
          this.salaForm.controls['no_sala'].patchValue(response.noSala);
          this.salaForm.controls['no_filas'].patchValue(response.no_filas);
          this.salaForm.controls['no_asientos'].patchValue(response.no_asientos_fila);
          this.salaForm.controls['estado'].patchValue(response.estado);

          this.edit = true;
        }
      })
    }
  }


  saveSala() {

    let newSala = new Sala();

    if (!this.salaForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.salaForm.markAllAsTouched();
      return;
    }

    newSala.noSala = this.salaForm.controls['no_sala'].value;
    newSala.no_filas = this.salaForm.controls['no_filas'].value;
    newSala.no_asientos_fila = this.salaForm.controls['no_asientos'].value;
    newSala.estado = this.salaForm.controls['estado'].value;

    this._peliculaService.saveSala(newSala).pipe(
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
      })).subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Sala creada con éxito',
            'success');
          this._router.navigate(['/app/gestion/peliculas/salas']);
        }
      })

  }

  updateSala() {

    let salaUpdated: Sala = new Sala();

    if (!this.salaForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.salaForm.markAllAsTouched();
      return;
    }

    salaUpdated.noSala = this.salaForm.controls['no_sala'].value;
    salaUpdated.no_filas = this.salaForm.controls['no_filas'].value;
    salaUpdated.no_asientos_fila = this.salaForm.controls['no_asientos'].value;
    salaUpdated.estado = this.salaForm.controls['estado'].value;

    this._peliculaService.updateSala(salaUpdated, this.selectedId)
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

          else if (error.status === 404) {
            Swal.fire('Error 404', 'Sala no encontrada', 'error');
          }

          return throwError(() => error);
        }
        ))
      .subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Sala actualizada con éxito',
            'success');
          this._router.navigate(['/app/gestion/peliculas/salas']);
        }
      })
  }

}
