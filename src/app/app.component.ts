import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
      this.initializeApp();
  }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.styleDefault();
            // this.splashScreen.hide();

            this.checkDarkTheme();
        });

    }

    checkDarkTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        if ( prefersDark.matches ) {
            document.body.classList.toggle( 'dark' );
        }
    }
}
