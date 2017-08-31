import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  LoadingController, ToastController, MenuController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  toast: any;
  loginData = {email: '', password:''};
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authService: AuthServiceProvider, public loadingController: LoadingController,
    private toastController: ToastController) {
  }

  ionViewDidLoad() {
  }

  doLogin(){
    this.showLoader();
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.message.token);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    })
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  showLoader(){
    this.loading = this.loadingController.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  presentToast(msg){
    this.toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    this.toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    this.toast.present();
  }

}
