import { DatosDeUsuario } from "src/app/models/usuario.model";
import { EstadosComponenteUsuario } from "./user.component.states";

export interface UsuarioComponentModel {

    estado: EstadosComponenteUsuario;
    borrable: boolean;  
    editable: boolean;
    datosDeUsuario?: DatosDeUsuario;
    error?: Error;
    id: number;

}