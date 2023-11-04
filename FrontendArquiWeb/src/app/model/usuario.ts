import { Roles } from "./roles";

export class Usuario{
    usuarioId: number= 0;
    usuarioCorreo: string = "";
    usuarioContrasena: string = "";
    usuarioTelefono: number= 0;
    usuarioNombre: string= "";
    usuarioApellido: string= "";
    usuarioDni: string= "";
    usuarioEdad: number= 0;
    usuarioCiudad: string= "";
    
    usuarioFoto: string="";
    usuarioRazonsocial: string= "";
    usuarioDireccion: string= "";
    usuarioRuc: string= "";
    usuarioEnabled: boolean= true;
    roles: Roles = new Roles();
}