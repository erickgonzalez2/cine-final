import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion.component';


const routes: Routes = [
    {path : '',component : GestionComponent,}, 
    {path : 'usuarios', loadChildren : () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
    {path : 'productos', loadChildren : () => import('./productos/productos.module').then(m => m.ProductosModule)}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class GestionRoutingModule { }