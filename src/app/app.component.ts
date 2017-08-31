import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  login = { title: 'Login', component: LoginPage}

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
      this.initializeApp();

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'List', component: ListPage }
      ];

      if(!localStorage.getItem('token')){
        
        this.pages.push(this.login);
        console.log(this.pages);
        this.rootPage = LoginPage;
      } else {
        this.pages.pop();
      }

      console.log(this.pages);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
