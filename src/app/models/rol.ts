import { Permission } from "./permissions";

export class Rol{
    id : number = 0;
    nombre : string = '';
    permisos : Permission[] = [];    
}