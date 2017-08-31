import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  LoadingController, ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'; 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: any;
  toast: any;
  regData = {username:'', password:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthServiceProvider, public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  doSignUp(){
    this.showLoader();
    this.authService.register(this.regData).then((result) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
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
