import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsuariosService } from '../usuarios.service';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/users';
import Swal from 'sweetalert2';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  edit = false;
  editPass = false;

  roles: Rol[] = [];

  hide = true;
  hideConfirm = true;

  userForm: FormGroup;

  selectedId: number = 0;

  constructor(
    private _userService: UsuariosService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      secondLastName: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
      enabled: new FormControl(false),
    })

    this._userService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response;
      }
    })

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)) {
      this._userService.getUserById(this.selectedId).pipe(
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
            Swal.fire('Error 404', 'Usuario no encontrado', 'error');
          }

          return throwError(() => error);
        })
      )
        .subscribe({
          next: (response: any) => {


            this.userForm.controls['username'].patchValue(response.username);
            this.userForm.controls['name'].patchValue(response.nombre);
            this.userForm.controls['lastName'].patchValue(response.apellido_paterno)
            this.userForm.controls['secondLastName'].patchValue(response.apellido_materno)
            this.userForm.controls['enabled'].patchValue(response.estado);
            this.userForm.controls['rol'].patchValue(response.rol.id);
            this.edit = true;
          }
        })
    }

  }



  saveUser() {

    let newUser = new User();

    if (!this.userForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.userForm.controls['password'].value != this.userForm.controls['passwordConfirm'].value) {
      Swal.fire(
        'Error',
        'Las contraseñas no coinciden',
        'error'
      );
      return;
    }

    newUser.username = this.userForm.controls['username'].value;
    newUser.nombre = this.userForm.controls['name'].value;
    newUser.apellido_paterno = this.userForm.controls['lastName'].value;
    newUser.apellido_materno = this.userForm.controls['secondLastName'].value;
    newUser.password = this.userForm.controls['password'].value;
    newUser.estado = this.userForm.controls['enabled'].value;
    newUser.rol.id = this.userForm.controls['rol'].value;

    this._userService.saveUser(newUser).pipe(
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
            'Usuario creado con éxito',
            'success');
          this._router.navigate(['/app/gestion/usuarios']);
        }
      })

  }


  updateUser() {


    if (this.editPass) {
      if (!this.userForm.valid) {
        Swal.fire(
          'Error',
          'Favor de ingresar todos los datos para continuar',
          'error'
        );
        this.userForm.markAllAsTouched();
        return;
      }

      if (this.userForm.controls['password'].value != this.userForm.controls['passwordConfirm'].value) {
        Swal.fire(
          'Error',
          'Las contraseñas no coinciden',
          'error'
        );
        this.userForm.markAllAsTouched();
        return;
      }
    }
    else {

      if (!this.userForm.controls['username'].valid || !this.userForm.controls['name'].valid ||
        !this.userForm.controls['lastName'].valid || !this.userForm.controls['secondLastName'].valid || !this.userForm.controls['rol'].valid
        || !this.userForm.controls['enabled'].valid) {
        Swal.fire(
          'Error',
          'Ingrese todos los campos para continuar',
          'error'
        );
        this.userForm.markAllAsTouched();
        return;
      }

    }


    let userUpdated: User = new User();

    userUpdated.id = this.selectedId;
    userUpdated.username = this.userForm.controls['username'].value;
    userUpdated.nombre = this.userForm.controls['name'].value;
    userUpdated.apellido_paterno = this.userForm.controls['lastName'].value;
    userUpdated.apellido_materno = this.userForm.controls['secondLastName'].value;
    userUpdated.rol.id = this.userForm.controls['rol'].value;
    userUpdated.estado = this.userForm.controls['enabled'].value;

    if (this.editPass) {
      userUpdated.password = this.userForm.controls['password'].value;
    }
    else {
      userUpdated.password = '';
    }


    this._userService.updateUser(userUpdated,this.selectedId).pipe(
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
          Swal.fire('Error 404', 'Usuario no encontrado', 'error');
        }


        return throwError(() => error);
      }
    ))
    .subscribe({
      next : (response : any) => {
        Swal.fire('Mensaje',
            'Usuario actualizado con éxito',
            'success');
          this._router.navigate(['/app/gestion/usuarios']);
      }
    })
  }
}
