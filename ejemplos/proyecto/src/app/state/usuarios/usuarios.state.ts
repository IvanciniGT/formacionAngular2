import { UsuarioPendingOperation } from "./usuarios.pending.operations.state";

export interface UsuariosState {
    pendingOperation: UsuarioPendingOperation | null;
}

export const initialUsuarioState: UsuariosState = {
    pendingOperation: null
}