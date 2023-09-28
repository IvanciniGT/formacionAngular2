import { DatosDeUsuario } from "src/app/models/usuario.model";
import { ComponentModel } from "../../lib/component.state.machine/component.model";
import { ComponentState } from "../../lib/component.state.machine/component.state";
import { EstadosComponenteUsuario } from "./user.component.states";
import { ComponentProperties } from "src/app/lib/component.state.machine/component.properties";

export interface UsuarioComponentProperties extends ComponentProperties{
    userId?: number;
    updatable: boolean;
    deletable: boolean;
    seleccionable: boolean;
    seleccionado: boolean;
}

export class UsuarioComponentModel implements ComponentModel, UsuarioComponentProperties{
    // No van asociadas a cambios de estado
    userId?: number
    updatable: boolean = false
    deletable: boolean = false
    seleccionable: boolean =false;
    seleccionado: boolean = false;
    // Van asociadas a cambios de estado
    state: ComponentState  = EstadosComponenteUsuario.INICIO;
    userData?: DatosDeUsuario;
    error?: Error;

}
