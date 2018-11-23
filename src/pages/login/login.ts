import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import { AlertProvider } from '../../providers/alert/alert';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider, public alertCtrl:AlertProvider,
    public loading:LoadingController) {
      
  }
  cadastro(){
    this.alertCtrl.cadastro();
  }

  validaUser():void {
    let load = this.loading.create({content:"Autenticando..."});
    load.present();
    this.api.validaFuncionario();
    
    setTimeout( () =>{
      this.user = this.api.getFuncionario();
      try{
        if(this.user.nome == (undefined || null )){
          load.dismiss();
          this.alertCtrl.invalido();
        }
        else{
          load.dismiss();
          this.alertCtrl.bemVindo();
          this.navCtrl.setRoot(HomePage, {funcionario:this.user}, {animate: true, direction: 'forward'});
        }
      }
      catch(err){
        load.dismiss();
        this.alertCtrl.falha("Cheque sua conexão.");
      }
    }, 3000);
    
  }
}
