import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import {
  add,
  arrowForwardCircle,
  eye,
  eyeOffOutline,
  eyeOutline,
  lockClosed,
  personAddOutline,
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../../core/helpers/validators';
import { ToastService } from 'src/app/core/services/toast.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    LottieComponent,
  ],
})
export default class RegisterPage implements OnInit {
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
  registerForm!: FormGroup;
  IsPassword: boolean = false;
  IsConfirmationPassword: boolean = false;

  constructor() {
    this.registerIcons();
    this.registerRegisterForm();

  }

  ngOnInit() {}
  SeePassword(text: string) {
    if (text == 'password') {
      this.IsPassword = !this.IsPassword;
    } else {
      this.IsConfirmationPassword = !this.IsConfirmationPassword;
    }
  }
  onSubmit() {
    if (this.registerForm.valid) {
      /**
       * ! ENVIAR PETICIÓN HTTP
       *  */
      console.log(this.registerForm.value);
    } else {
      /**
       * ! MOSTRAR TOAST DE FORMULARIO INVALIDO
       *  */
      this.toastService.presentToastError('¡Formulario invalido!');
    }
  }

  getformHasError(field: string, rule: string): boolean | undefined {
    return this.registerForm.get(field)?.hasError(rule);
  }
  getFormHasTouch(field: string): boolean | undefined {
    return this.registerForm.get(field)?.touched;
  }
  private registerIcons(){
    addIcons({
      eyeOffOutline,
      eyeOutline,
      lockClosed,
      arrowForwardCircle,
      eye,
      add,
      personAddOutline,
    });
  }
  private registerRegisterForm(){
    this.registerForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }
}
