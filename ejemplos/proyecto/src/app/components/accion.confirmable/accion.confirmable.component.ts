import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'accion-confirmable',
  templateUrl: './accion.confirmable.component.html',
  styleUrls: ['./accion.confirmable.component.css']
})
export class AccionConfirmableComponent {

  @Input()
  caption!: string;
  @Input()
  captionConfirmacion: string = "Aceptar";
  @Input()
  captionCancelacion: string = "Cancelar";
  @Input()
  cancelacionActivada: boolean = true;
  @Input()
  confirmacionActivada: boolean = true;

  @Output()
  onSolicitado = new EventEmitter<void>();
  @Output()
  onConfirmado = new EventEmitter<void>();
  @Output()
  onCancelado = new EventEmitter<void>();

  solicitado: boolean;

  constructor() { 
    this.solicitado = false;
  }

  clickEnAccion(){
    this.solicitado = true;
    this.onSolicitado.emit();
  }
  clickEnConfirmacion(){
    this.solicitado = false;
    this.onConfirmado.emit();
  }
  clickEnCancelacion(){
    this.solicitado = false;
    this.onCancelado.emit();
  }

}
