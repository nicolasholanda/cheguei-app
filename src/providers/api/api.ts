import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../alert/alert';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class ApiProvider {
  func;

  constructor(public http:HTTP, public device: Device, public storage:Storage, public alertCtrl:AlertProvider) {
    this.storage.ready().then(()=>{
      
    })
  }

  validaFuncionario() {
    this.storage.get('funcionario')
    .then(response => {
      if(response!=(null||undefined)){
        this.func = JSON.parse(response)
        this.atualizaHorarioLocal()
      }
    })
    if(this.func == (undefined || null)){
      let url = "http://ajatdesenvolvimento.com.br/blog/cheguei/api/v1/funcionarios"
      this.http.setDataSerializer("json");
      this.http.post(`${url}/login.php`, {"mac_address": this.device.uuid}, {'content-type':'application/json;charset=UTF-8'})
      .then(data => { 
        this.func = JSON.parse(data.data).funcionarios[0]
        this.getHorarios()
        this.sortFrequencia()
        this.storage.set("funcionario", JSON.stringify(this.func))
      })
      .catch(err => { alert(err.message) })
    }
  }

  getFuncionario(){
    return this.func
  }

  sortFrequencia(){
    this.func.frequencia.sort( (date1, date2) => {
      return new Date(date2)<new Date(date1)
    })
  }

  atualizaHorarioLocal(){
    let now = new Date()
    let hj = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`
    this.func.frequencia.filter( horario => {
      if(horario.hora.search(hj)!=-1){return true}
    })
    this.sortFrequencia()
  }

  getHorarios(){
    if(this.func.frequencia!=(null || undefined)){
      let now = new Date()
      let aux = []
      let hj = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
      this.func.frequencia.forEach( hora => {
        if(hora.hora_entrada.search(hj) != -1 ){
          aux.push( {hora:new Date(hora.hora_entrada.replace("-", "/")), opcao:"Entrada"})
        }
        else if (hora.hora_saida.search(hj) != -1){
          aux.push( {hora:new Date(hora.hora_saida.replace("-", "/")), opcao:"Saída"})
        }
      })
      this.func.frequencia = aux;
    }
  }

  atualizaHorarios(hora){
    let url = "http://ajatdesenvolvimento.com.br/blog/cheguei/api/v1/frequencia"
    let h = hora.hora
    let horaString = `${h.getFullYear()}-${h.getMonth()+1}-${h.getDate()} ${h.toLocaleTimeString()}`

    this.func.frequencia.push(hora)
    this.storage.set('funcionario', JSON.stringify(this.func) );
    if(hora.opcao == 'Entrada'){
      this.http.post(`${url}/create.php`,
      {
        "funcionario_id": this.func.id,
        "hora_entrada": horaString
      }, {})
      .catch(err => {alert(err.message)})
    }
    else{
      this.http.post(`${url}/update.php`,
      {
        "hora_saida":horaString,
        "funcionario_id": this.func.id
      }, {})
      .catch(err => {alert(err.message)})
    }
  }

}
