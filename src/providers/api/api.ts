import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../alert/alert';

@Injectable()
export class ApiProvider {
  func;

  constructor(public http: HttpClient, public device: Device, public storage:Storage, public alertCtrl:AlertProvider) {
    this.storage.ready().then(()=>{

    })
  }

  validaFuncionario() {
    /*
    this.http.post('http://localhost/cheguei-master/api/v1/funcionarios/login.php',
    {body:{'mac_address':this.device.uuid}},
    {headers:{'Content-Type':'application/javascript'}}).toPromise()
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err.message)
    })*/
    this.http.post("http://ajatdesenvolvimento.com.br/blog/cheguei/api/v1/funcionarios/login.php",
    {'body':{'mac_address':'b88b32d7262b2f3b'}},{'headers':{'Content-Type':'application/json'}} ).toPromise()
    .then(data => {
      alert(data)
    })
    .catch( err =>{
      alert(err.message)
    })

  }

  getFuncionario(){
    return this.func
  }

  atualizaHorarios(hora){
    this.func.frequencia.push(hora)
    this.storage.set('funcionario', JSON.stringify(this.func) );
  }

}
