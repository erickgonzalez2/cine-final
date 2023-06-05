import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../peliculas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Sala } from 'src/app/models/sala';
import Swal from 'sweetalert2';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-form-peliculas',
  templateUrl: './form-peliculas.component.html',
  styleUrls: ['./form-peliculas.component.scss']
})
export class FormPeliculasComponent implements OnInit {

  edit = false;

  selectedId: number = 0;  
  
  peliculaForm: FormGroup;

  constructor(
    private _peliculaService: PeliculasService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.peliculaForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required]),
      clasificacion: new FormControl('', [Validators.required]),
      sipnosis: new FormControl(''),
      duracion: new FormControl('', [Validators.required]),
      idioma: new FormControl('', [Validators.required]),
      formato: new FormControl('', [Validators.required]),
      subtitulos: new FormControl(false),
      estado: new FormControl(false),
    });

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)) {

      this._peliculaService.getPeliculaById(this.selectedId).pipe(
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
            Swal.fire('Error 404', 'Pelicula no encontrada', 'error');
          }

          return throwError(() => error);
        })
      ).subscribe({
        next: (response: Pelicula) => {
          this.peliculaForm.controls['titulo'].patchValue(response.titulo);
          this.peliculaForm.controls['director'].patchValue(response.director);
          this.peliculaForm.controls['clasificacion'].patchValue(response.clasificacion);
          this.peliculaForm.controls['sipnosis'].patchValue(response.sipnosis);
          this.peliculaForm.controls['idioma'].patchValue(response.idioma);
          this.peliculaForm.controls['formato'].patchValue(response.formato);
          this.peliculaForm.controls['subtitulos'].patchValue(response.subtitulos);
          this.peliculaForm.controls['estado'].patchValue(response.estado);

          const partesHora = response.duracion.split(":");
          const hora = parseInt(partesHora[0]);
          const minutos = parseInt(partesHora[1]);
          const segundos = parseInt(partesHora[2]);

          const fechaHora = new Date();
          fechaHora.setHours(hora);
          fechaHora.setMinutes(minutos);
          fechaHora.setSeconds(segundos);

          this.peliculaForm.controls['duracion'].patchValue(fechaHora);


          this.edit = true;
        }
      })
    }
  }

  savePelicula() {

    let newPelicula = new Pelicula();

    if (!this.peliculaForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.peliculaForm.markAllAsTouched();
      return;
    }

    newPelicula.titulo = this.peliculaForm.controls['titulo'].value;
    newPelicula.director = this.peliculaForm.controls['director'].value;
    newPelicula.clasificacion = this.peliculaForm.controls['clasificacion'].value;
    newPelicula.sipnosis = this.peliculaForm.controls['sipnosis'].value;
    newPelicula.idioma = this.peliculaForm.controls['idioma'].value;
    newPelicula.formato = this.peliculaForm.controls['formato'].value;
    newPelicula.subtitulos = this.peliculaForm.controls['subtitulos'].value;
    newPelicula.estado = this.peliculaForm.controls['estado'].value;

    const fechaHoraOriginal = this.peliculaForm.controls['duracion'].value;
    const horas = fechaHoraOriginal.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraOriginal.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHoraOriginal.getSeconds().toString().padStart(2, '0');

    const fechaHoraFormateada = `${horas}:${minutos}:${segundos}`;

    newPelicula.duracion = fechaHoraFormateada;

    this._peliculaService.savePelicula(newPelicula).pipe(
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
            'Pelicula creada con éxito',
            'success');
          this._router.navigate(['/app/gestion/peliculas']);
        }
      })


  }

  updatePelicula() {

    let updatePelicula = new Pelicula();

    if (!this.peliculaForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.peliculaForm.markAllAsTouched();
      return;
    }

    updatePelicula.titulo = this.peliculaForm.controls['titulo'].value;
    updatePelicula.director = this.peliculaForm.controls['director'].value;
    updatePelicula.clasificacion = this.peliculaForm.controls['clasificacion'].value;
    updatePelicula.sipnosis = this.peliculaForm.controls['sipnosis'].value;
    updatePelicula.idioma = this.peliculaForm.controls['idioma'].value;
    updatePelicula.formato = this.peliculaForm.controls['formato'].value;
    updatePelicula.subtitulos = this.peliculaForm.controls['subtitulos'].value;
    updatePelicula.estado = this.peliculaForm.controls['estado'].value;

    const fechaHoraOriginal = this.peliculaForm.controls['duracion'].value;
    const horas = fechaHoraOriginal.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraOriginal.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHoraOriginal.getSeconds().toString().padStart(2, '0');

    const fechaHoraFormateada = `${horas}:${minutos}:${segundos}`;

    updatePelicula.duracion = fechaHoraFormateada;

    this._peliculaService.updatePelicula(updatePelicula, this.selectedId).pipe(
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
          Swal.fire('Error 404', "Pelicula no encontrada", 'error');
        }

        else if (error.status === 500) {
          Swal.fire('Error 500', 'Error desconocido, consulte con el administrador del sistema', 'error');
        }

        return throwError(() => error);
      })).subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Pelicula actualizada con éxito',
            'success');
          this._router.navigate(['/app/gestion/peliculas']);
        }
      })

  }
}
