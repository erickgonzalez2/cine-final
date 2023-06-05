import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas.component';
import { TableroSalasComponent } from './tablero-salas/tablero-salas.component';
import { FormSalasComponent } from './form-salas/form-salas.component';
import { TableroPeliculasComponent } from './tablero-peliculas/tablero-peliculas.component';
import { FormPeliculasComponent } from './form-peliculas/form-peliculas.component';
import { FormFuncionesComponent } from './form-funciones/form-funciones.component';
import { TableroFuncionesComponent } from './tablero-funciones/tablero-funciones.component';


const routes : Routes = [
    {
        path : '',component : PeliculasComponent,
        children : [
            {path : 'salas',component : TableroSalasComponent},
            {path : 'salas/crear',component : FormSalasComponent},
            {path : 'salas/editar/:id',component : FormSalasComponent},
            {path : '',component : TableroPeliculasComponent},
            {path : 'crear',component : FormPeliculasComponent},
            {path : 'editar/:id',component : FormPeliculasComponent},
            {path : 'funciones',component : TableroFuncionesComponent},
            {path : 'funciones/crear',component : FormFuncionesComponent},            
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PeliculasRoutingModule{}