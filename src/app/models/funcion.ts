import { Pelicula } from "./pelicula";
import { Sala } from "./sala";

export class Funcion{
    id : number;
    pelicula : Pelicula = new Pelicula();
    sala : Sala = new Sala();
    fecha_hora : string;
    fecha_hora_final : string;
    precio_general : number;
    precio_desc : number;
    estado : boolean;
}