import { Permission } from "./permissions";

export class UserType{
    constructor(
        public id : number,
        public string : string,
        public permisos : Permission[],
    ) {}
}