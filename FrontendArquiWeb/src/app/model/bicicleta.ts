import { Local } from "./local"

export class Bicicleta{
    bicicletaid: number = 0
    bicicletamodelo: string = ""
    bicicletaestado: boolean = true //disponible 
    bicicletaprecio: number = 0
    bicicletanumaro: number = 0
    bicicletadetalles: string = ""
    bicicletafoto: string = ""
    local: Local = new Local()

}