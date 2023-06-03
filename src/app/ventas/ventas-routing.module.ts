import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { DulceriaComponent } from './dulceria/dulceria.component';
import { FuncionesComponent } from './funciones/funciones.component';


const routes : Routes = [
    {path : '', component : VentasComponent},
    {path : 'funciones',component : FuncionesComponent},
    {path : 'dulceria',component : DulceriaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class VentasRoutingModule {}