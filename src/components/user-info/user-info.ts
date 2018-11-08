import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {
  result: Observable<any>;
  funcionario;

  constructor(public apiProvider: ApiProvider) {
    this.result = this.apiProvider.getFuncionario(1);
    this.result.subscribe( func => {
      this.funcionario = func;
    });
  }

}