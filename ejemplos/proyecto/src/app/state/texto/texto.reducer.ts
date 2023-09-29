import { createReducer, on } from "@ngrx/store";
import { initialTextoState } from "./texto.state";
import { accionEliminarTexto, accionEstablecerTexto } from "./texto.actions";

export const textosReducer = createReducer(
    // Estado inicial
    initialTextoState,
    // Acciones que modifican el estado... y el código asociado a cada acción
    on(accionEstablecerTexto, (state, { texto }) => {
        return {
            ...state,
            valor: texto
        };
    }),
    on(accionEliminarTexto, (state, _ ) => {
        return {
            ...state,
            valor: null
        };
    })
);