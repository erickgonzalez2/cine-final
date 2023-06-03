import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { TableroUnidadesComponent } from './tablero-unidades/tablero-unidades.component';
import { FormUnidadesComponent } from './form-unidades/form-unidades.component';
import { TableroInsumosComponent } from './tablero-insumos/tablero-insumos.component';
import { FormInsumosComponent } from './form-insumos/form-insumos.component';
import { TableroProductosComponent } from './tablero-productos/tablero-productos.component';
import { FormProductosComponent } from './form-productos/form-productos.component';
import { AltaMercanciasComponent } from './alta-mercancias/alta-mercancias.component';



const routes: Routes = [
    {
        path: '', component: ProductosComponent,
        children: [
            {path : 'unidades',component : TableroUnidadesComponent},
            {path : 'unidades/crear',component : FormUnidadesComponent},
            {path : 'unidades/editar/:id',component : FormUnidadesComponent},
            {path : 'insumos',component : TableroInsumosComponent},
            {path : 'insumos/crear',component : FormInsumosComponent},
            {path : 'insumos/editar/:id',component : FormInsumosComponent},
            {path : '',component : TableroProductosComponent},
            {path : 'crear',component : FormProductosComponent},
            {path : 'editar/:id',component : FormProductosComponent},
            {path : 'alta',component : AltaMercanciasComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductosRoutingModule { }