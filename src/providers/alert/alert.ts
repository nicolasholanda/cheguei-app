import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';


@Injectable()
export class AlertProvider {

  constructor(public alertCtrl:AlertController, public device:Device) {}

  invalido(){
    this.alertCtrl.create(
      {title:"Usuário inválido!",
      subTitle:`Dispositivo não cadastrado.`,
      buttons: ['Ok']
    }).present();
  }

  msg_sucesso(msg){
    this.alertCtrl.create(
      {title:"Sucesso",
      subTitle:msg,
      buttons: ['Ok']
    }).present();
  }

  bemVindo(){
    this.alertCtrl.create({
      title:"Bem-Vindo!",
      subTitle:"Seja bem-vindo ao Cheguei.",
      buttons: ['Ok']
    }).present();
  }

  falha(mensagem){
    this.alertCtrl.create({
      title:"Algo errado.",
      subTitle:`${mensagem}`,
      buttons: ['Ok']
    }).present();
  }

  cadastro(){
    this.alertCtrl.create({
      title:"Cadastro",
      subTitle:`Solicite o cadastro do seguinte UUID: ${this.device.uuid}`,
      buttons: ['Ok']
    }).present();
  }

  maximoPontos(){
    this.alertCtrl.create({
      title: "Atenção",
      subTitle: "Você já marcou o máximo de pontos por hoje. Volte amanhã.",
      buttons: ['OK']
    }).present();
  }

}
