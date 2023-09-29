// Aquí defino los datos (estado) que quiero controlar dentro del apartado "texto" del estado global de la aplicación
export interface TextoState {
    valor: string | null;
}

// Damos un valor inicial a ese estado
export const initialTextoState: TextoState = {
    valor: null
};