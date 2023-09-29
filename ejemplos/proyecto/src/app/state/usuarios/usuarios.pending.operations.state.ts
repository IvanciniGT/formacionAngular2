import { DatosDeUsuario } from "src/app/models/usuario.model";

export interface UsuarioPendingOperation {
    type: 'edit' | 'delete';
    user: DatosDeUsuario
    component: any ;
}
