import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastQueue: string[] = [];
  private isToastPresenting = false;
  constructor(private toastController: ToastController) { }

  async presentToastError(message: string) {
    this.toastQueue.push(message);
    this.presentNextToast();
  }
  async presentToastSucess(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass:'custom-toast-success',
    });
    toast.present();
  }
  private async presentNextToast() {
    if (this.isToastPresenting || this.toastQueue.length === 0) {
      return;
    }

    this.isToastPresenting = true;
    const message = this.toastQueue.shift();

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast-error',
    });

    toast.onDidDismiss().then(() => {
      this.isToastPresenting = false;
      this.presentNextToast();
    });

    await toast.present();
  }
}
