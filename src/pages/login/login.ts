import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import { AlertProvider } from '../../providers/alert/alert';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
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
      console.log(this.user)
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
        this.alertCtrl.falha(err.message);
      }
    }, 3000);
    
  }
}
