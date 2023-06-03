import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';
import { Credentials } from '../models/credentials';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide = true; 
  public username : string = '';
  public password:string = '';
    

  constructor(
    private _loginService : LoginService,
    private _router : Router
    ) {    
   }

  ngOnInit(): void {    
  }  

  login(){

    if(this.username == '' || this.password == ''){
      Swal.fire('Error','Favor de llenar todos los campos para continuar','error');
    }

    else{
      let creds : Credentials = new Credentials(this.username,this.password);      
      this._loginService.login(creds).pipe(
        catchError((error : HttpErrorResponse) => {
          if(error.status === 401 || error.status === 403){
            Swal.fire('Error 401','Usuario y/o contraseña incorrectos','error');
          }

          else if(error.status === 0){
            Swal.fire('Error 0','No hay conexión con el servidor','error');
          }
          return throwError (()=> error);
        })
      ).subscribe(response => {
        Swal.fire('OK','Ingreso aceptado','success');
        this._router.navigate(['app/']);
      })
    }
    
  }


  
  
}
