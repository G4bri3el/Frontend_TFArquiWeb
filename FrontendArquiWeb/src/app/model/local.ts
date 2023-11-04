import { Usuario } from "./usuario";

export class Local{
    localid: number = 0;
    localdireccion: string = "";
    localnombre: string = "";
    localfoto: string = "";
    usuario: Usuario= new Usuario();
}