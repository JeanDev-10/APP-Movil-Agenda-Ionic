import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, mail, logOutOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-edit-profile',
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  implements OnInit {
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  registerForm!: FormGroup;

  constructor() {
    this.registerRegisterForm();
    this.registerIcons();
  }

  ngOnInit() {}
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
  getformHasError(form:FormGroup,field: string, rule: string): boolean | undefined {
    return form.get(field)?.hasError(rule);
  }
  getFormHasTouch(form:FormGroup,field: string): boolean | undefined {
    return form.get(field)?.touched;
  }
  private registerRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  private registerIcons() {
    addIcons({
      personOutline,
      mail,
      logOutOutline,
      eyeOffOutline,
      eyeOutline
    });
  }
}
