import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasComponent } from './peliculas.component';
import { TableroSalasComponent } from './tablero-salas/tablero-salas.component';
import { FormSalasComponent } from './form-salas/form-salas.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { TableroPeliculasComponent } from './tablero-peliculas/tablero-peliculas.component';
import { FormPeliculasComponent } from './form-peliculas/form-peliculas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TableroFuncionesComponent } from './tablero-funciones/tablero-funciones.component';
import { FormFuncionesComponent } from './form-funciones/form-funciones.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    PeliculasComponent,
    TableroSalasComponent,
    FormSalasComponent,
    TableroPeliculasComponent,
    FormPeliculasComponent,
    TableroFuncionesComponent,
    FormFuncionesComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
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
    MatSlideToggleModule,
    MatTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    
  ]
})
export class PeliculasModule { }
