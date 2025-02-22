import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { LoaderService } from './templates/auth/service/service/LoaderService';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
  
})
export class AppComponent   implements OnInit{
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;
  constructor(private platform: Platform,public loader: LoaderService,private storage: Storage) {
    StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
  }
  async ngOnInit() {
    await this.storage.create();
  }

  isLoading: Subject<boolean> = this.loader.isLoading;
}
