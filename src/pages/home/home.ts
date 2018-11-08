import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  horarios = [];
  opcao = "Entrada"
  constructor(public navCtrl: NavController) {
  }
  marca(): void{
    if(this.horarios.length < 4){
      this.horarios.push( {hora: new Date(), opcao: this.opcao} );
      if(this.opcao=="Entrada"){ this.opcao="Saída" }
      else{ this.opcao="Entrada"}
    }
    else{
      alert("Só amanhã agora, meu barão");
    }
  }
}
