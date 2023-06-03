import { Insumo } from "./insumo";
import { ProductoInsumos } from "./producto-insumos";

export class Producto{
    id : number ; 
    codigo : string;
    nombre : string;
    estado : Boolean;
    precio : number;
    costo : number;
    tipoProducto : string;
    stock : number;
    productoInsumos : ProductoInsumos[] = [];    
}