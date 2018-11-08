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

  getFuncionario() {
    let url = `http://localhost/cheguei-master/api/v1/funcionarios/login.php`;
    this.http.post(
      url, 
      {data:{"mac_address":"20:91:28:30"}},
      {headers: {'Content-Type': 'applicaton/json'}})
      .subscribe(data => {
      console.log(data);
    });
  }

}
