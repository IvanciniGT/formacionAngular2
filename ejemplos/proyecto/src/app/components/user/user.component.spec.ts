import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './user.component';
import { UsuarioService } from 'src/app/services/user/user.service';
import { UsuarioFakeService } from 'src/app/services/user/impl/user.fake.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioComponent],
      imports: [
        ReactiveFormsModule, // Quiero trabajar con formularios reactivos
      ],
      // Puedo poner mi propia implementación del Servicio de Usuario (FAKE)
      providers: [
        { provide: UsuarioService, useClass: UsuarioFakeService }
      ]
    });
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    component.data = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería estar en estado "NORMAL" al crearse', () => {
    expect(component.datos.state).toBe(component.estados.NORMAL);
  });
  it('Debería mostrar el nombre del usuario', () => {
    expect(fixture.nativeElement.querySelector('#nombre').textContent).toContain('Pepe');
  });
});
