import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models/permissions';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.scss']
})
export class FormRolesComponent implements OnInit {

  edit = false;

  permisos: Permission[] = [];

  roleForm: FormGroup;

  selectedId: number = 0;

  constructor(
    private _userService: UsuariosService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      permissions: new FormControl([], [Validators.required])
    });

    this._userService.getPermissions().subscribe({
      next: (response: any) => {
        this.permisos = response;
      }
    })

    this._route.paramMap.subscribe(params => {
      this.selectedId = parseInt(params.get('id'));
    })

    if (this.selectedId != undefined && this.selectedId != null && !isNaN(this.selectedId)) {
      this._userService.getRoleById(this.selectedId).pipe(
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
            Swal.fire('Error 404', 'Rol no encontrado', 'error');
          }

          return throwError(() => error);
        })
      )
        .subscribe({
          next: (response: any) => {

            console.log(response);
            console.log(this.roleForm.controls['permissions']);
            


            this.roleForm.controls['name'].patchValue(response.nombre);
            this.roleForm.controls['permissions'].patchValue(response.permisos.map((permission: { id_permiso: any; }) => permission.id_permiso) ) ;
            this.edit = true;
          }
        })
    }
  }

  saveRole() {

    let newRole = new Rol();

    if (!this.roleForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.roleForm.markAllAsTouched();
      return;
    }

    newRole.nombre = this.roleForm.controls['name'].value;

    let selectedPermissions : Permission[] = [];

    this.roleForm.controls['permissions'].value.forEach(permission => {
      let permiso : Permission = new Permission();

      permiso.id_permiso = permission;

      selectedPermissions.push(permiso);
    });

    newRole.permisos = selectedPermissions;


    this._userService.saveRole(newRole).pipe(
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
            'Rol creado con éxito',
            'success');
          this._router.navigate(['/app/gestion/usuarios/roles']);
        }
      })

  }


  updateRole() {

    let roleUpdated: Rol = new Rol();

    if (!this.roleForm.valid) {
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos para continuar',
        'error'
      );
      this.roleForm.markAllAsTouched();
      return;
    }

    roleUpdated.nombre = this.roleForm.controls['name'].value;

    let selectedPermissions : Permission[] = [];

    this.roleForm.controls['permissions'].value.forEach(permission => {
      let permiso : Permission = new Permission();

      permiso.id_permiso = permission;

      selectedPermissions.push(permiso);
    });
    

    roleUpdated.permisos = selectedPermissions;

    console.log(this.roleForm.controls['permissions'].value);

    this._userService.updateRole(roleUpdated, this.selectedId).pipe(
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
          Swal.fire('Error 404', 'Rol no encontrado', 'error');
        }

        return throwError(() => error);
      }
      ))
      .subscribe({
        next: (response: any) => {
          Swal.fire('Mensaje',
            'Rol actualizado con éxito',
            'success');
          this._router.navigate(['/app/gestion/usuarios/roles']);
        }
      })
  }

}
