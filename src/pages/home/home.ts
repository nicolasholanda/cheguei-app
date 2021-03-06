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
    if(this.horarios.length>0){
      if(this.horarios[this.horarios.length-1].opcao==(undefined || null) || this.horarios[this.horarios.length-1].opcao=="Saída"){
        this.opcao="Entrada"
      }
      else{ this.opcao="Saída"}
    }
  }

  logout(){
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }

  atualizaFreq(refresher):void{
    try{
      this.api.atualizaHorarioLocal();
      setTimeout(()=>{
        refresher.complete();
      },2000)
    }
    catch{
      console.log("Erro...")
      refresher.complete();
    }
  }

  marca(): void{
    if(this.horarios.length < 4){
      let now = {hora: new Date(), opcao: this.opcao}
      this.api.atualizaHorarios( now )
      if(this.opcao=="Saída"){
        this.opcao="Entrada"
      }
      else{ this.opcao="Saída"}
    }
    else{
      this.alertCtrl.maximoPontos();
      this.logout();
    }
  }
}
