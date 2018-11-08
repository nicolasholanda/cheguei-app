import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  horarios = [];
  opcao = "Entrada"
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    
  }
  marca(): void{
    if(this.horarios.length < 4){
      this.horarios.push( {hora: new Date(), opcao: this.opcao} );
      if(this.opcao=="Entrada"){ this.opcao="Saída" }
      else{ this.opcao="Entrada"}
    }
    else{
      this.alertCtrl.create({
        title: "Atenção",
        subTitle: "Você já marcou o máximo de pontos por hoje.",
        buttons: ['OK']
      }).present();
    }
  }
}
