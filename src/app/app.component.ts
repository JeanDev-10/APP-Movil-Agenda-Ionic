import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform, IonText } from '@ionic/angular/standalone';
import { LoadingComponent } from './core/components/loading/loading.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonText, IonApp, IonRouterOutlet, LoadingComponent],
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
     this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinnerService.hide();
      }
    });
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
    if (prefersDark.matches) {
      document.body.classList.toggle('dark');
    }
  }
}
