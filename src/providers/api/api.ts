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
      this.storage.clear()
    })
  }

  validaFuncionario() {
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
      .catch(err => { this.alertCtrl.falha("Falha durante a validação") })
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
    this.func.frequencia.filter( horario => {
      if(new Date(horario.hora).toLocaleDateString()==now.toLocaleDateString()){return true}
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
          aux.push( {hora:new Date(hora.hora_entrada.replace("-", "/")), opcao:"Entrada", id:hora.id})
          if (hora.hora_saida.search(hj) != -1){
            aux.push( {hora:new Date(hora.hora_saida.replace("-", "/")), opcao:"Saída"})
          }
        }
      })
      this.func.frequencia = aux;
    }
  }

  atualizaHorarios(hora){
    let url = "http://ajatdesenvolvimento.com.br/blog/cheguei/api/v1/frequencia"
    let h = hora.hora
    let horaString = `${h.getFullYear()}-${h.getMonth()+1}-${h.getDate()} ${h.toLocaleTimeString()}`

    if(hora.opcao == 'Entrada'){
      this.http.post(`${url}/create.php`,
      {
        "funcionario_id": this.func.id,
        "hora_entrada": horaString
      }, {})
      .catch(err => {
          if(JSON.parse(err.error).message=="Entrada registrada!"){
            hora.id = JSON.parse(err.error).frequencia_id
            this.func.frequencia.push(hora)
            this.storage.set('funcionario', JSON.stringify(this.func) );
            this.alertCtrl.msg_sucesso("Entrada registrada!")
          }
          else{
            this.alertCtrl.falha("Algo deu errado")
          }
       })
    }
    else{
      this.http.post(`${url}/update.php`,
      {
        "funcionario_id": this.func.id,
        "hora_saida":horaString,
        "frequencia_id": +this.func.frequencia[this.func.frequencia.length-1].id
      }, {})
      .catch(err => {
        if(JSON.parse(err.error).message=="Saída registrada!"){
          this.func.frequencia.push(hora)
          this.storage.set('funcionario', JSON.stringify(this.func) );
          this.alertCtrl.msg_sucesso("Saída registrada!")
        }
        else{
          this.alertCtrl.falha("Algo deu errado")
        }
      })
    }
  }
}
