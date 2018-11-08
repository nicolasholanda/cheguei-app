import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {
  result: Observable<any>;
  funcionario:any={
    nome: "João Catinga",
    id: 201882,
    cargo: "Pedreiro"
  };

  constructor(public apiProvider: ApiProvider) {
    
  }

}