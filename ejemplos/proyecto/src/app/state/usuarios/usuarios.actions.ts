import { createAction, props } from '@ngrx/store';
import { DatosDeUsuario } from 'src/app/models/usuario.model';

// Esto es una función generadora de acciones despachables
export const nuevoUsuarioEnEdicion = createAction(
    '[Usuarios] Usuario en Edicion',     // Nombre identificativo de la acción
    props<{ user: DatosDeUsuario, component: string }>()  // Datos que se pasan a la acción
);
export const nuevoUsuarioEnEliminacion = createAction(
    '[Usuarios] Usuario en Eliminacion',     // Nombre identificativo de la acción
    props<{ user: DatosDeUsuario, component: string }>()  // Datos que se pasan a la acción
);

export const operacionFinalizada = createAction(
    '[Usuarios] Operacion finalizada',     // Nombre identificativo de la acción
    props<any>()  // Datos que se pasan a la acción
);

// De alguna manera, lo que estamos definiendo son también INTERFACES (API)