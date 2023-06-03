import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { TableroComponent } from './tablero/tablero.component';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';
import { TableroRolesComponent } from './tablero-roles/tablero-roles.component';
import { FormRolesComponent } from './form-roles/form-roles.component';


const routes: Routes = [
    {path : '',component : UsuariosComponent ,
    children : [
        {path : '' , component : TableroComponent},
        {path : 'crear',component : FormUsuariosComponent},
        {path : 'editar/:id',component : FormUsuariosComponent},
        {path : 'roles',component : TableroRolesComponent},
        {path : 'roles/crear',component : FormRolesComponent},
        {path : 'roles/editar/:id',component : FormRolesComponent}     
    ]
}    
];

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class UsuariosRoutingModule{}