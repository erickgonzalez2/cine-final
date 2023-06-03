import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(
    private _httpClient : HttpClient
  ) { }


  getFunctionsByDate(fecha){
     return this._httpClient.get(environment.API_ENDPOINT+`/funciones/fecha/${fecha}`)
  }
}
