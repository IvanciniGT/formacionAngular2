import { TestBed } from '@angular/core/testing';

import { UsuarioService } from '../user.service';
import { UsuarioServiceImpl } from './user.impl.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, // Quiero trabajar con peticiones HTTP desde Angular
      ],
    
    });
    service = TestBed.inject(UsuarioServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
