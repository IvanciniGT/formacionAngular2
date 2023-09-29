import { createAction, props } from '@ngrx/store';

// Esto es una función generadora de acciones despachables
export const accionEstablecerTexto = createAction(
    '[Texto] Cargar texto',     // Nombre identificativo de la acción
    props<{ texto: string }>()  // Datos que se pasan a la acción
);
export const accionEliminarTexto = createAction(
    '[Texto] Eliminar texto',     // Nombre identificativo de la acción
    props<any>()  // Datos que se pasan a la acción
);

// De alguna manera, lo que estamos definiendo son también INTERFACES (API)