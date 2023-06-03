import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { FuncionesComponent } from './funciones/funciones.component';
import { DulceriaComponent } from './dulceria/dulceria.component';
import { VentasRoutingModule } from './ventas-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VentasComponent,
    FuncionesComponent,
    DulceriaComponent,    
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
