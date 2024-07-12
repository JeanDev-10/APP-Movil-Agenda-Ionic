import {
  arrowForwardCircle,
  eyeOffOutline,
  eyeOutline,
  personAddOutline,
} from 'ionicons/icons';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    RouterModule,
    LottieComponent,
  ],
})
export default class LoginPage implements OnInit {
  /**
   * ?Inyectando servicios
   */
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  /**
   * ? CONFIGURACIÓN ANIMACIONES
   */
  options: AnimationOptions = {
    path: '/assets/animations/register-login.json',
  };

  styles = {
    width: '50%',
    height: 'auto',
    margin: '0 auto',
    marginTop: '2em',
  };

  /**
   * ?Variables
   */
  loginForm!: FormGroup;
  IsPassword: boolean = false;
  constructor() {
    this.registerIcons();
    this.registerLoginForm();
  }

  ngOnInit() {}
  SeePassword() {
    this.IsPassword = !this.IsPassword;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      /**
       * ! ENVIAR PETICIÓN HTTP
       *  */
      console.log(this.loginForm.value);
    } else {
      /**
       * ! MOSTRAR TOAST DE FORMULARIO INVALIDO
       *  */
      this.toastService.presentToastError('¡Formulario invalido!');
    }
  }

  getformHasError(field: string, rule: string): boolean | undefined {
    return this.loginForm.get(field)?.hasError(rule);
  }
  getFormHasTouch(field: string): boolean | undefined {
    return this.loginForm.get(field)?.touched;
  }
  private registerIcons() {
    addIcons({
      eyeOffOutline,
      eyeOutline,
      personAddOutline,
      arrowForwardCircle,
    });
  }
  private registerLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
  }
}
