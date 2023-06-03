import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _httpClient: HttpClient) { }


  getRoles() {
    return this._httpClient.get(environment.API_ENDPOINT + "rol/all");
  }

  getUsers(nombres: string, roles: [], page: number, chunk: number) {
    return this._httpClient.get(environment.API_ENDPOINT + "usuarios/find" +
      "?nombres=" + nombres +
      "&roles=" + roles +
      "&page=" + page +
      "&chunk=" + chunk);
  }

  saveUser(user: User) {
    return this._httpClient.post(environment.API_ENDPOINT + "usuarios/", user);
  }

  updateUser(user: User,id :number){
    return this._httpClient.put(environment.API_ENDPOINT+"usuarios/update/"+id,user);
  }

  getUserById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"usuarios/"+id);
  }

  getPermissions(){
    return this._httpClient.get(environment.API_ENDPOINT+"permisos");
  }

  findRoles(nombres :  string,page : number, chunk : number){
    return this._httpClient.get(environment.API_ENDPOINT+"rol/find"+ 
    "?nombres="+ nombres + 
    "&page=" + page + 
    "&chunk="+ chunk);
  }

  getRoleById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"rol/"+id);
  }

  saveRole(rol : Rol){
    return this._httpClient.post(environment.API_ENDPOINT+"rol/",rol);
  }

  updateRole(rol : Rol,id : number){
    return this._httpClient.put(environment.API_ENDPOINT+"rol/update/"+id,rol);
  }
}
