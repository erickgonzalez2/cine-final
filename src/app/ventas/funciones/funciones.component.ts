import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FuncionesService } from './funciones.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss'],
  providers: [DatePipe]
})
export class FuncionesComponent implements OnInit,OnDestroy {



  dateChoose: any;
  todayDate: Date;
  functions: [] = [];

  unSubscribeAll = new Subject();

  constructor(
    private _datePipe: DatePipe,
    private _funcionesService : FuncionesService
  ) { }
  

  ngOnInit(): void {
    this.todayDate = new Date();
    this.todayDate.setHours(0, 0, 0, 0);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  findFunctions() {
    

    if (this.dateChoose < this.todayDate) {
      Swal.fire('Error','No se puede vender funciones en días anteriores','error');
    }

    else{
      let formatDate = this._datePipe.transform(this.dateChoose,'yyyy-MM-dd HH:mm:ss');
      this._funcionesService.getFunctionsByDate(formatDate).pipe(takeUntil(this.unSubscribeAll)).subscribe({
        next : (response) => {
          console.log(response);          

        },
        error : (err) => {
          if(err.status === 403 || err.status === 401){
            Swal.fire('Error','Acceso no autorizado','error');
          }
          else if(err.status === 500){
            Swal.fire('Error','Hubo un error en el servidor, consulte con su administrador','error');
          }
        }
      })
    }


  }

}
