import { IonContent, IonProgressBar } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { SpinnerService } from './../../services/spinner.service';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [LottieComponent, AsyncPipe, IonContent, IonProgressBar],
})
export class LoadingComponent {
  private readonly spinnerService = inject(SpinnerService);
  isLoading$!: Subject<boolean>;
  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
  };

  styles = {
    width: '100%',
    height: 'auto',
  };
  constructor() {
    this.isLoading$ = this.spinnerService.isLoading$;
  }
}
