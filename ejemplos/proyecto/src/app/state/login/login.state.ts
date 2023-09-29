// Aquí defino los datos (estado) que quiero controlar dentro del apartado "texto" del estado global de la aplicación
export interface LogedUserState {
    userId?: any;
    token?: any;
    language: string;
    theme: string;
    condicionesDeUsoApp: boolean;
    settings: {
        showNotifications: boolean;
        showOffline: boolean;
        showUser: boolean;
    };
}

// Damos un valor inicial a ese estado
export const initialLogedUserState: LogedUserState = {
    userId: null,
    token: null,
    condicionesDeUsoApp: false,
    language: 'es',
    theme: 'light',
    settings: {
        showNotifications: true,
        showOffline: false,
        showUser: true
    }
};
