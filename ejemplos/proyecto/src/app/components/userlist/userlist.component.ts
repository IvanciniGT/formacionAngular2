import { Component, Input, OnInit } from '@angular/core';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user/user.service';


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
export class UserlistComponent implements OnInit{

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
  usuarioEnEdicion?: DatosDeUsuario

  get Estados(){
    return Estados;
  }

  constructor(private usuarioService:UsuarioService){
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

  private cambioSeleccion(){
    if(this.usuariosSeleccionados.length === 0)
      this.state = Estados.DATOS_CARGADOS;
    else if(this.usuariosSeleccionados.length === this.usuariosAMostrar.length)
      this.state = Estados.TODOS_SELECCIONADOS;
    else
      this.state = Estados.ALGUNO_SELECCIONADO;
  }

  seleccionar(usuario: DatosDeUsuario){
    // Solo si no está ya
    if(!this.usuariosSeleccionados.includes(usuario)){
      this.usuariosSeleccionados.push(usuario);
      this.cambioSeleccion();
    }
  }

  deseleccionar(usuario: DatosDeUsuario){
    // Si está lo quitamos
    if(this.usuariosSeleccionados.includes(usuario)){
      this.usuariosSeleccionados = this.usuariosSeleccionados.filter((usuarioSeleccionado) => {
        return usuarioSeleccionado.id !== usuario.id;
      });
      this.cambioSeleccion();
    }
  }
  borradoIniciado(usuario:DatosDeUsuario){
    this.usuarioEnBorrado = usuario;
  }
  borradoCancelado(usuario:DatosDeUsuario){
    if(this.usuarioEnBorrado === usuario)
      this.usuarioEnBorrado = undefined;
    else
      console.error("TENGO UN BUG QUE TE CAGAS")
  }

  edicionCancelada(usuario:DatosDeUsuario){
    if(this.usuarioEnEdicion === usuario)
      this.usuarioEnEdicion = undefined;
    else
      console.error("TENGO UN BUG QUE TE CAGAS")
  }
  edicionIniciada(usuario:DatosDeUsuario){
    this.usuarioEnEdicion = usuario;
  }

  borrarUsuario(usuarioSeleccionado: DatosDeUsuario){
    this.usuarioService.borrarUsuario(usuarioSeleccionado.id).subscribe({
      next: () => {
        console.log(this.todosLosUsuarios)
        this.todosLosUsuarios = this.todosLosUsuarios.filter((usuario) => usuario.id !== usuarioSeleccionado.id);
        console.log(this.todosLosUsuarios)
        this.calcularUsuariosAMostrar();
        this.usuariosSeleccionados = this.usuariosSeleccionados.filter((usuario) => usuario.id !== usuarioSeleccionado.id);
        this.cambioSeleccion();
        this.usuarioEnBorrado = undefined;
      },
      error: (err) => {
        //this.state = Estados.ERROR_EN_CARGA; // TODO: Estados nuevos.
        console.log(err);
      }
    });
  }

  seleccionarTodos(){
    this.usuariosSeleccionados = this.usuariosAMostrar.slice();
    this.cambioSeleccion();
  }

  deseleccionarTodos(){
    this.usuariosSeleccionados = [];
    this.cambioSeleccion();
  }

  borrarSeleccionados(){
    this.usuariosSeleccionados.forEach((usuarioSeleccionado) => this.borrarUsuario(usuarioSeleccionado));
  }
  esBorrable(usuario:DatosDeUsuario){
    return this.usuariosBorrables &&  this.state === Estados.DATOS_CARGADOS && this.usuarioEnEdicion === undefined && (this.usuarioEnBorrado === undefined || this.usuarioEnBorrado === usuario)
  }
  esEditable(usuario:DatosDeUsuario){
    return this.usuariosEditables && this.state === Estados.DATOS_CARGADOS && this.usuarioEnBorrado === undefined && (this.usuarioEnEdicion === undefined || this.usuarioEnEdicion === usuario)
  }

  mostrarBotonSeleccionarTodos(){
    return this.usuariosBorrables && this.usuarioEnEdicion === undefined  && this.usuarioEnBorrado === undefined && (this.state === Estados.DATOS_CARGADOS || this.state === Estados.ALGUNO_SELECCIONADO);
  }

  mostrarBotonDeseleccionarTodos(){
    return this.usuariosBorrables && (this.state === Estados.TODOS_SELECCIONADOS || this.state === Estados.ALGUNO_SELECCIONADO);
  }

  mostrarBotonBorrar  (){
    return this.usuariosBorrables && (this.state === Estados.TODOS_SELECCIONADOS || this.state === Estados.ALGUNO_SELECCIONADO);
  }

  private referencia?:any
  establecerFiltro(filtro: string){
    filtro = filtro.toLowerCase();
    console.log(filtro, this.filtro);
    if(filtro !== this.filtro) {
      this.filtro = filtro;
      if(this.referencia)
        clearTimeout(this.referencia);
      this.referencia = setTimeout(() => this.calcularUsuariosAMostrar(), 200);
    }
  }

  comoIdentificoCadaComponente(index: number, usuario: DatosDeUsuario){
    return usuario.id;
  }

  private calcularUsuariosAMostrar(){
    this.usuariosAMostrar = this.todosLosUsuarios.filter((usuario) => {
      return usuario.nombre.toLowerCase().includes(this.filtro)   ||
             usuario.apellido.toLowerCase().includes(this.filtro) ||
             usuario.email.toLowerCase().includes(this.filtro)
      ;
    });
  }

}
