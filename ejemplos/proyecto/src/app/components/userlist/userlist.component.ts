import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user/user.service';
import { nuevoUsuarioEnEdicion, nuevoUsuarioEnEliminacion, operacionFinalizada } from 'src/app/state/usuarios/usuarios.actions';
import { UsuariosState } from 'src/app/state/usuarios/usuarios.state';

enum Estados {
  CARGANDO_DATOS = 0,
  DATOS_CARGADOS = 1,
  ERROR_EN_CARGA = 2,
  ALGUNO_SELECCIONADO = 3,
  TODOS_SELECCIONADOS = 4
}

@Component({
  selector: 'listado-usuarios',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  static idGenerator: number = 0;
  readonly id = "list-component-" + UserlistComponent.idGenerator++;

  @Input()
  usuariosEditables: boolean = false;

  @Input()
  usuariosBorrables: boolean = false;

  state: number = Estados.CARGANDO_DATOS;

  todosLosUsuarios: Array<DatosDeUsuario> = [];
  usuariosAMostrar: Array<DatosDeUsuario> = [];
  filtro: string = '';

  usuariosSeleccionados: Array<DatosDeUsuario> = [];

  usuarioEnBorrado?: DatosDeUsuario

  // En algun momento recibiré un cambio en el estado global de los usuarios
  // Lo tendremos que procesar:
  // Si no hay operaciones pendientes, yo puedo hacer nuevas operaciones
  // Si hay operaciones pendientes, yo no puedo hacer nuevas operaciones
  // Lo que si... es que si hay una operacion pendiente MIA ... yo sigo sin poder hacer operaciones nuevas... pero si debo
  // continuar con esa operacion que tengo pendiente YO

  // Cuando se haga un click en borrar... vamos a asignar la variable usuarioEnBorrado?

  usuarioEnEdicion?: DatosDeUsuario

  puedeHacerEsteComponenteOperaciones: boolean = true;

  get Estados() {
    return Estados;
  }

  constructor(private usuarioService: UsuarioService, private store: Store<{ usuarios: UsuariosState }>) {
    // Si no hay operaciones pendientes,... o la que hay es mia... puedo operar... si no, no puedo.
    store.select(state => state.usuarios).subscribe({
      next: (usuariosState) => {
        this.puedeHacerEsteComponenteOperaciones = !usuariosState.pendingOperation
          || usuariosState.pendingOperation.component === this.id
        if (usuariosState.pendingOperation && usuariosState.pendingOperation.component === this.id) {
          this.usuarioEnBorrado = usuariosState.pendingOperation.type === 'delete' ? usuariosState.pendingOperation.user : undefined
          this.usuarioEnEdicion = usuariosState.pendingOperation.type === 'edit' ? usuariosState.pendingOperation.user : undefined
        }else{
          this.usuarioEnBorrado = undefined
          this.usuarioEnEdicion = undefined
        }
      }
    });
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.todosLosUsuarios = usuarios;
        this.calcularUsuariosAMostrar();
        this.state = Estados.DATOS_CARGADOS;
      },
      error: (err) => {
        this.state = Estados.ERROR_EN_CARGA;
      }
    });
  }
  private cambioSeleccion() {
    if (this.usuariosSeleccionados.length === 0)
      this.state = Estados.DATOS_CARGADOS;
    else if (this.usuariosSeleccionados.length === this.usuariosAMostrar.length)
      this.state = Estados.TODOS_SELECCIONADOS;
    else
      this.state = Estados.ALGUNO_SELECCIONADO;
  }
  seleccionar(usuario: DatosDeUsuario) {
    // Solo si no está ya
    if (!this.usuariosSeleccionados.includes(usuario)) {
      this.usuariosSeleccionados.push(usuario);
      this.cambioSeleccion();
    }
  }
  deseleccionar(usuario: DatosDeUsuario) {
    // Si está lo quitamos
    if (this.usuariosSeleccionados.includes(usuario)) {
      this.usuariosSeleccionados = this.usuariosSeleccionados.filter((usuarioSeleccionado) => {
        return usuarioSeleccionado.id !== usuario.id;
      });
      this.cambioSeleccion();
    }
  }
  borradoIniciado(usuario: DatosDeUsuario) {
    this.store.dispatch(nuevoUsuarioEnEliminacion({ user: usuario, component: this.id }));
  }
  borradoCancelado(usuario: DatosDeUsuario) {
      this.store.dispatch(operacionFinalizada({}));
  }
  edicionFinalizada(usuario: DatosDeUsuario) {
    this.store.dispatch(operacionFinalizada({}));
  }
  borradoFinalizado(usuario: DatosDeUsuario) {
    this.store.dispatch(operacionFinalizada({}));
    this.borrarUsuario(usuario)
  }
  edicionCancelada(usuario: DatosDeUsuario) {
    this.store.dispatch(operacionFinalizada({}));
  }
  edicionIniciada(usuario: DatosDeUsuario) {
    this.store.dispatch(nuevoUsuarioEnEdicion({ user: usuario, component: this.id }));
  }
  borrarUsuario(usuarioSeleccionado: DatosDeUsuario) {
    this.usuarioService.borrarUsuario(usuarioSeleccionado.id).subscribe({
      next: () => {
        console.log(this.todosLosUsuarios)
        this.todosLosUsuarios = this.todosLosUsuarios.filter((usuario) => usuario.id !== usuarioSeleccionado.id);
        console.log(this.todosLosUsuarios)
        this.calcularUsuariosAMostrar();
        this.usuariosSeleccionados = this.usuariosSeleccionados.filter((usuario) => usuario.id !== usuarioSeleccionado.id);
        this.cambioSeleccion();
      },
      error: (err) => {
        //this.state = Estados.ERROR_EN_CARGA; // TODO: Estados nuevos.
        console.log(err);
      }
    });
  }
  seleccionarTodos() {
    this.usuariosSeleccionados = this.usuariosAMostrar.slice();
    this.cambioSeleccion();
  }
  deseleccionarTodos() {
    this.usuariosSeleccionados = [];
    this.cambioSeleccion();
  }
  borrarSeleccionados() {
    this.usuariosSeleccionados.forEach((usuarioSeleccionado) => this.borrarUsuario(usuarioSeleccionado));
  }
  esBorrable(usuario: DatosDeUsuario) {
    return this.puedeHacerEsteComponenteOperaciones
      && this.usuariosBorrables
      && this.state === Estados.DATOS_CARGADOS
      && this.usuarioEnEdicion === undefined
      && (this.usuarioEnBorrado === undefined || this.usuarioEnBorrado === usuario)
  }
  esEditable(usuario: DatosDeUsuario) {
    return this.puedeHacerEsteComponenteOperaciones
      && this.usuariosEditables
      && this.state === Estados.DATOS_CARGADOS
      && this.usuarioEnBorrado === undefined
      && (this.usuarioEnEdicion === undefined || this.usuarioEnEdicion === usuario)
  }
  mostrarBotonSeleccionarTodos() {
    return this.usuariosBorrables && this.usuarioEnEdicion === undefined && this.usuarioEnBorrado === undefined && (this.state === Estados.DATOS_CARGADOS || this.state === Estados.ALGUNO_SELECCIONADO);
  }
  mostrarBotonDeseleccionarTodos() {
    return this.usuariosBorrables && (this.state === Estados.TODOS_SELECCIONADOS || this.state === Estados.ALGUNO_SELECCIONADO);
  }
  mostrarBotonBorrar() {
    return this.usuariosBorrables && (this.state === Estados.TODOS_SELECCIONADOS || this.state === Estados.ALGUNO_SELECCIONADO);
  }
  private referencia?: any
  establecerFiltro(filtro: string) {
    filtro = filtro.toLowerCase();
    console.log(filtro, this.filtro);
    if (filtro !== this.filtro) {
      this.filtro = filtro;
      if (this.referencia)
        clearTimeout(this.referencia);
      this.referencia = setTimeout(() => this.calcularUsuariosAMostrar(), 200);
    }
  }
  comoIdentificoCadaComponente(index: number, usuario: DatosDeUsuario) {
    return usuario.id;
  }
  private calcularUsuariosAMostrar() {
    this.usuariosAMostrar = this.todosLosUsuarios.filter((usuario) => {
      return usuario.nombre.toLowerCase().includes(this.filtro) ||
        usuario.apellido.toLowerCase().includes(this.filtro) ||
        usuario.email.toLowerCase().includes(this.filtro)
        ;
    });
  }
}