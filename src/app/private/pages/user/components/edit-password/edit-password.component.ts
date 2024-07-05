import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, mail, logOutOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { passwordMatchValidatorProfile } from 'src/app/core/helpers/validators-new-password';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-edit-password',
  standalone:true,
  imports:[CommonModule,IonicModule,ReactiveFormsModule],
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
})
export class EditPasswordComponent  implements OnInit {
  IsNewPassword: boolean = false;
  IsPassword: boolean = false;
  IsConfirmationPassword: boolean = false;
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  PasswordForm!: FormGroup;

  constructor() {
    this.registerPasswordForm();
    this.registerIcons();
  }

  ngOnInit() {}


  private registerIcons() {
    addIcons({
      personOutline,
      mail,
      logOutOutline,
      eyeOffOutline,
      eyeOutline
    });
  }
  getformHasError(form:FormGroup,field: string, rule: string): boolean | undefined {
    return form.get(field)?.hasError(rule);
  }
  getFormHasTouch(form:FormGroup,field: string): boolean | undefined {
    return form.get(field)?.touched;
  }

  private registerPasswordForm() {
    this.PasswordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        new_password: [
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
        validators: passwordMatchValidatorProfile,
      }
    );
  }
  SeePassword(text: string) {
    if (text == 'password') {
      this.IsPassword = !this.IsPassword;
    } else if (text == 'new_password') {
      this.IsNewPassword = !this.IsNewPassword;
    } else {
      this.IsConfirmationPassword = !this.IsConfirmationPassword;
    }
  }
  onSubmitPassword(){
    if (this.PasswordForm.valid) {
      /**
       * ! ENVIAR PETICIÓN HTTP
       *  */
      console.log(this.PasswordForm.value);
    } else {
      /**
       * ! MOSTRAR TOAST DE FORMULARIO INVALIDO
       *  */
      this.toastService.presentToastError('¡Formulario invalido!');
    }
  }
}
