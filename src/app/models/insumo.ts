import { Unidad } from "./unidad";

export class Insumo{

    id : number;
    nombre : string;
    stock : number;
    unidad : Unidad = new Unidad();
    precio : number;

}