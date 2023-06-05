import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcion } from 'src/app/models/funcion';
import { Pelicula } from 'src/app/models/pelicula';
import { Sala } from 'src/app/models/sala';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private _httpClient : HttpClient) { }

  getSalaById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"sala/id/"+id);
  }

  saveSala(sala : Sala){
    return this._httpClient.post(environment.API_ENDPOINT+"sala/",sala);
  }

  updateSala(sala : Sala,id : number){
    return this._httpClient.put(environment.API_ENDPOINT+"sala/update/"+id,sala);
  }

  findSalas(nombres : string,page : number,chunk : number){
    return this._httpClient.get(environment.API_ENDPOINT+"sala/find"+ 
    "?nombres="+ nombres + 
    "&page=" + page + 
    "&chunk="+ chunk);
  }

  findAllSalasEnabled(){
    return this._httpClient.get(environment.API_ENDPOINT+"sala/allEnabled");
  }

  getPeliculaById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"pelicula/id/"+id);
  }

  savePelicula(pelicula : Pelicula){
    return this._httpClient.post(environment.API_ENDPOINT+"pelicula/",pelicula);
  }

  updatePelicula(pelicula : Pelicula, id : number){
    return this._httpClient.put(environment.API_ENDPOINT+"pelicula/update/"+id,pelicula);
  }

  findPeliculas(nombres : string,page : number,chunk : number){
    return this._httpClient.get(environment.API_ENDPOINT+"pelicula/find"+ 
    "?nombres="+ nombres + 
    "&page=" + page + 
    "&chunk="+ chunk);
  }

  finAllPeliculasEnabled(){
    return this._httpClient.get(environment.API_ENDPOINT+"pelicula/allEnabled");
  }

  findFunciones(nombres:string,fechaInicio:string,fechaFin : string,page : number,chunk : number){
    return this._httpClient.get(environment.API_ENDPOINT+"funcion/find"+ 
    "?nombres="+ nombres + 
    "&fechaInicio=" + fechaInicio + 
    "&fechaFin=" + fechaFin + 
    "&page=" + page + 
    "&chunk="+ chunk);
  }

  saveOneFuncion(funcion : Funcion){
    return this._httpClient.post(environment.API_ENDPOINT+"funcion/",funcion);
  }

  saveManyFunciones(funciones : Funcion[]){
    return this._httpClient.post(environment.API_ENDPOINT+"funcion/many",funciones);
  }
}
