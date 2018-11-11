import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  horarios = [];
  opcao = "Entrada"
  funcionario;

  constructor(public navCtrl: NavController, public alertCtrl: AlertProvider, public navParams:NavParams, public api:ApiProvider) {
    this.funcionario = navParams.get('funcionario');
    this.horarios = this.funcionario.frequencia;
    this.horarios.forEach(horario => {
      horario = {hora: new Date(horario.hora), opcao: horario.opcao}
    })
    if(this.horarios[this.horarios.length-1]=="Saída" || this.horarios[this.horarios.length-1]==undefined){
      this.opcao="Entrada"
    }
    else{ this.opcao="Saída"}
    console.log(this.horarios)
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  marca(): void{
    if(this.horarios.length < 4){
      let now = {hora: new Date().getTime(), opcao: this.opcao}
      this.api.atualizaHorarios( now )
      if(this.opcao=="Saída"){
        this.opcao="Entrada"
      }
      else{ this.opcao="Saída"}
    }
    else{
      this.alertCtrl.maximoPontos();
    }
  }
}
