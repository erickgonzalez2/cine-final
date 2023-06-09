import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { Producto } from 'src/app/models/producto';
import { ProductoInsumos } from 'src/app/models/producto-insumos';
import { Unidad } from 'src/app/models/unidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _httpClient : HttpClient) { }



  getUnitById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"unidad/id/"+id);
  }

  saveUnit(unidad : Unidad){
    return this._httpClient.post(environment.API_ENDPOINT+"unidad/",unidad);
  }

  updateUnit(unidad : Unidad,id : number){
    return this._httpClient.put(environment.API_ENDPOINT+"unidad/update/"+id,unidad);
  }

  findUnits(nombres :  string,page : number, chunk : number){
    return this._httpClient.get(environment.API_ENDPOINT+"unidad/find"+ 
    "?nombres="+ nombres + 
    "&page=" + page + 
    "&chunk="+ chunk);
  }

  getAllUnits(){
    return this._httpClient.get(environment.API_ENDPOINT+"unidad/all");
  }

  getInsumoById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"insumo/id/"+id);
  }

  saveInsumo(insumo : Insumo){
    return this._httpClient.post(environment.API_ENDPOINT+"insumo/",insumo);
  }

  updateInsumo(insumo: Insumo,id : number){
    return this._httpClient.put(environment.API_ENDPOINT+"insumo/update/"+id,insumo);
  }

  findInsumos(nombres :  string,unidades : string[],page : number, chunk : number,tipoOrdenamientoPrecio : number,tipoOrdenamientoStock : number){
    return this._httpClient.get(environment.API_ENDPOINT+"insumo/find"+
    "?nombres="+ nombres +
    "&unidades="+ unidades + 
    "&page=" + page + 
    "&chunk="+ chunk + 
    "&tipoOrdenamientoPrecio="+ tipoOrdenamientoPrecio +
    "&tipoOrdenamientoStock="+ tipoOrdenamientoStock)
  }

  getAllInsumos(){
    return this._httpClient.get(environment.API_ENDPOINT+"insumo/all");
  }

  getProductById(id : number){
    return this._httpClient.get(environment.API_ENDPOINT+"producto/"+id);
  }

  saveProducto(producto : Producto,productosInsumos : ProductoInsumos[]){
    let CreateProductRequest = {
      producto : producto,
      productosInsumos : productosInsumos
    };
    return this._httpClient.post(environment.API_ENDPOINT+"producto/",CreateProductRequest);
  }

  updateProducto(producto : Producto,productosInsumos : ProductoInsumos[],id : number){
    let UpdateProductRequest = {
      producto : producto,
      productosInsumos : productosInsumos
    };
    return this._httpClient.put(environment.API_ENDPOINT+"producto/update/"+id,UpdateProductRequest); 
  }

  findProducts(nombres :  string,productType : string[],page : number,chunk : number,tipoOrdenamientoPrecio : number,tipoOrdenamientoStock : number){
    return this._httpClient.get(environment.API_ENDPOINT+"producto/find"+
    "?nombres="+ nombres +
    "&productType="+ productType + 
    "&page=" + page + 
    "&chunk="+ chunk + 
    "&tipoOrdenamientoPrecio="+ tipoOrdenamientoPrecio +
    "&tipoOrdenamientoStock="+ tipoOrdenamientoStock)
  }
}
