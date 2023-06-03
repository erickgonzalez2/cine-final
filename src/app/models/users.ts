import { Rol } from "./rol";

export class User{
    id : number;
    nombre : string;
    apellido_paterno : string;
    apellido_materno : string;
    username : string;
    password : string;
    estado : boolean;
    rol : Rol = new Rol();    
}