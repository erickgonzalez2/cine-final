import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { TableroUnidadesComponent } from './tablero-unidades/tablero-unidades.component';
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
import { FormUnidadesComponent } from './form-unidades/form-unidades.component';
import { TableroInsumosComponent } from './tablero-insumos/tablero-insumos.component';
import { FormInsumosComponent } from './form-insumos/form-insumos.component';
import { TableroProductosComponent } from './tablero-productos/tablero-productos.component';
import { FormProductosComponent } from './form-productos/form-productos.component';
import { AltaMercanciasComponent } from './alta-mercancias/alta-mercancias.component';



@NgModule({
  declarations: [
    ProductosComponent,
    TableroUnidadesComponent,
    FormUnidadesComponent,
    TableroInsumosComponent,
    FormInsumosComponent,
    TableroProductosComponent,
    FormProductosComponent,
    AltaMercanciasComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
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
export class ProductosModule { }
