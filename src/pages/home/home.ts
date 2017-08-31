import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'; 

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  toast: any;
  isLoggedIn: boolean = false;

  constructor(public app: App, public navCtrl: NavController,
    public authService: AuthServiceProvider, public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      if(!localStorage.getItem('token')){
        navCtrl.setRoot(LoginPage);
      }
  }

  logout(){
    this.authService.logout().then((result) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    })
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  presentToast(msg){
    this.toast = this.toastCtrl.create({
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
