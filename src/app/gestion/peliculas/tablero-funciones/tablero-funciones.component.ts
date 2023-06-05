import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcion } from 'src/app/models/funcion';
import Swal from 'sweetalert2';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-tablero-funciones',
  templateUrl: './tablero-funciones.component.html',
  styleUrls: ['./tablero-funciones.component.scss']
})
export class TableroFuncionesComponent implements OnInit {

  totalFunciones = 0;
  currentPage = 0;
  selectedNames: string;
  filter: string = '';
  funciones: Funcion[] = [];

  rangeForm: FormGroup;

  constructor(
    private _peliculasService : PeliculasService
  ) { }

  ngOnInit(): void {

    this.rangeForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
    })
  }


  search() {

    let names: string[] = this.filter.trim().split(/\s+/);

    names = names.filter(element => {
      return element != '' && element != ' '
    })

    this.selectedNames = names.join(',');


    if(!this.rangeForm.valid){
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.rangeForm.markAllAsTouched();
      return; 
    }

    let fecha = new Date(this.rangeForm.controls['start'].value);    
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1; 
    let day = fecha.getDate();
    let hours = fecha.getHours();
    let minutes = fecha.getMinutes();
    let seconds = fecha.getSeconds();

    const fechaInicio = `${year}-${this.padNumber(month)}-${this.padNumber(day)}T${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;

    fecha = new Date(this.rangeForm.controls['end'].value);    
    year = fecha.getFullYear();
    month = fecha.getMonth() + 1; 
    day = fecha.getDate();
    hours = fecha.getHours();
    minutes = fecha.getMinutes();
    seconds = fecha.getSeconds();

    const fechaFin = `${year}-${this.padNumber(month)}-${this.padNumber(day)}T${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;

    console.log(fechaInicio);
    console.log(fechaFin);
    
    this._peliculasService.findFunciones(this.selectedNames,fechaInicio,fechaFin,this.currentPage,20).subscribe({
      next : (response : any)=>{
        this.funciones = response.funciones;
        this.totalFunciones = response.count;
      }
    })

  }


  padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

}
