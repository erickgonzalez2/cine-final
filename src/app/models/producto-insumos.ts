import { Insumo } from "./insumo";
import { Producto } from "./producto";

export class ProductoInsumos{
    id : number = 0;
    producto : Producto = new Producto();
    insumo : Insumo = new Insumo();
    cantidad_descarga : number = 0;
}