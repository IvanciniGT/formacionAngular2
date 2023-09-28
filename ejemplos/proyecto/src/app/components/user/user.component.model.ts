import { DatosDeUsuario } from "src/app/models/usuario.model";
import { ComponentModel } from "../../lib/component.state.machine/component.model";
import { ComponentState } from "../../lib/component.state.machine/component.state";
import { EstadosComponenteUsuario } from "./user.component.states";
import { ComponentProperties } from "src/app/lib/component.state.machine/component.properties";

export interface UsuarioComponentProperties extends ComponentProperties{
    userId?: number;
    updatable: boolean;
    deletable: boolean;
}

export class UsuarioComponentModel implements ComponentModel, UsuarioComponentProperties{
    state: ComponentState;
    userData?: DatosDeUsuario;
    error?: Error;
    userId?: number
    updatable: boolean = false
    deletable: boolean = false
    constructor() {
        this.state = EstadosComponenteUsuario.INICIO;
    }

}
