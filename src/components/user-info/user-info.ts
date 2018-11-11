import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {
  result: Observable<any>;
  _funcionario
  @Input()
  set funcionario(func){
    this._funcionario = func;
  }
  get funcionario(){
    return this._funcionario;
  }

  constructor(public apiProvider: ApiProvider, public storage:Storage) {
    console.log(this._funcionario)
  }

}