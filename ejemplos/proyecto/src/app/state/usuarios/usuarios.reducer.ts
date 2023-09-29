import { createReducer, on } from "@ngrx/store";
import { initialUsuarioState } from "./usuarios.state";
import { nuevoUsuarioEnEdicion, nuevoUsuarioEnEliminacion, operacionFinalizada } from "./usuarios.actions";
import { UsuarioPendingOperation } from "./usuarios.pending.operations.state";

export const usuariosReducer = createReducer(
    // Estado inicial
    initialUsuarioState,
    // Acciones que modifican el estado... y el código asociado a cada acción
    on(nuevoUsuarioEnEdicion, (state, { user, component}) => {
        let pendingOperation: UsuarioPendingOperation;
        pendingOperation = {
            type: 'edit',
            user: user,
            component: component
        }

        return {
            ...state,
            pendingOperation
        };
    }),
    on(nuevoUsuarioEnEliminacion, (state, { user, component }) => {
        return {
            ...state,
            pendingOperation: {
                type: 'delete',
                user: user,
                component: component
            } as UsuarioPendingOperation
        };
    }),
    on(operacionFinalizada, (state, _ ) => {
        return {
            ...state,
            pendingOperation: null
        };
    })
);