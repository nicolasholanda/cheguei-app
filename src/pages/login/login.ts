import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider) {
  }

  validaUser = () => {
    this.api.getFuncionario();
    this.navCtrl.push(HomePage);
  }

}
