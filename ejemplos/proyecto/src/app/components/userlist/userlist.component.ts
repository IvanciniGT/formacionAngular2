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

  cambioSeleccion(){
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

  borrar(usuarioSeleccionado: DatosDeUsuario){
    this.usuarioService.borrarUsuario(usuarioSeleccionado.id).subscribe({
      next: () => {
        this.todosLosUsuarios = this.todosLosUsuarios.filter((usuario) => {
          usuario.id !== usuarioSeleccionado.id;
        });
        this.calcularUsuariosAMostrar();
        this.usuariosSeleccionados = this.usuariosSeleccionados.filter((usuario) => {
          usuario.id !== usuarioSeleccionado.id;
        });
        this.cambioSeleccion();
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
    this.usuariosSeleccionados.forEach((usuarioSeleccionado) => this.borrar(usuarioSeleccionado));
  }

  mostrarBotonSeleccionarTodos(){
    return this.state === Estados.DATOS_CARGADOS || this.state === Estados.ALGUNO_SELECCIONADO;
  }

  mostrarBotonDeseleccionarTodos(){
    return this.state === Estados.TODOS_SELECCIONADOS || this.state === Estados.ALGUNO_SELECCIONADO;
  }

  mostrarBotonBorrar  (){
    return this.state === Estados.TODOS_SELECCIONADOS || this.state === Estados.ALGUNO_SELECCIONADO;
  }

  establecerFiltro(filtro: string){
    this.filtro = filtro;
    this.calcularUsuariosAMostrar();
  }

  calcularUsuariosAMostrar(){
    this.usuariosAMostrar = this.todosLosUsuarios.filter((usuario) => {
      return usuario.nombre.toLowerCase().includes(this.filtro)   ||
             usuario.apellido.toLowerCase().includes(this.filtro) ||
             usuario.email.toLowerCase().includes(this.filtro)
      ;
    });
  }

}
