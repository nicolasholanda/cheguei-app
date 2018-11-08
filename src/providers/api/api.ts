import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: HttpClient) {
    
  }

  getFuncionario(id): Observable<any> {
    let url = `http://localhost/cheguei-backend/api/v1/funcionarios/show.php?funcionario_id=${id}`;
    return this.http.get(url);
  }

}
