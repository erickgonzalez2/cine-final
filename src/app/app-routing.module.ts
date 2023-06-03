import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserLoggedGuard } from './auth/user-logged.guard';

const routes: Routes = [
  {path : '',component: LoginComponent,canActivate : [UserLoggedGuard]},     
  {path : 'login',component: LoginComponent, canActivate : [UserLoggedGuard]},     
  {path : 'app',component : MenuComponent,
  children:[
    { path : '', component : HomeComponent,canActivateChild : [AuthGuard]},
    { path : 'inicio', component : HomeComponent,canActivateChild : [AuthGuard]},
    {path : 'gestion',loadChildren : () => import('./gestion/gestion.module').then(m => m.GestionModule)},
    {path : 'ventas',loadChildren : ()=> import ('./ventas/ventas.module').then(m => m.VentasModule)}
  ],canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
