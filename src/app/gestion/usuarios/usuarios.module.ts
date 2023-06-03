import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { TableroComponent } from './tablero/tablero.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';
import {MatCardModule} from '@angular/material/card'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'; 
import {MatSelectModule} from '@angular/material/select'
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableroRolesComponent } from './tablero-roles/tablero-roles.component';
import { FormRolesComponent } from './form-roles/form-roles.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'

@NgModule({
  declarations: [
    UsuariosComponent,
    TableroComponent,
    FormUsuariosComponent,
    TableroRolesComponent,
    FormRolesComponent
  ],
  imports: [
    CommonModule, 
    UsuariosRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,    
    FormsModule,
    ReactiveFormsModule,        
    NgSelectModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ]
})
export class UsuariosModule { }
