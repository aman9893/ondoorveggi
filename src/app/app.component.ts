import { Component, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { LoaderService } from './templates/auth/service/service/LoaderService';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
  
})
export class AppComponent {
  // https://github.com/ionic-team/ionic-framework/issues/21630#issuecomment-683007162
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;

  constructor(private platform: Platform,public loader: LoaderService) {
    // SafeAreaController.injectCSSVariables();
    StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});

    // By default Ionic doesn't close app on back click, so we handle that here
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
  }

  isLoading: Subject<boolean> = this.loader.isLoading;
}
