import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { add, eye, eyeOffOutline, eyeOutline, lockClosed, personAddOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../../core/helpers/validators';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [  CommonModule, FormsModule,NavbarComponent,IonicModule,RouterModule,ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  IsPassword:boolean=false;
  IsConfirmationPassword:boolean=false;
  private toastService=inject(ToastService);

  constructor(private fb: FormBuilder) {
    addIcons({
      eyeOffOutline,
      eyeOutline,
      lockClosed,
      eye,
      add,
      personAddOutline
    })
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    },{
      validators: passwordMatchValidator
    });
  }

  ngOnInit() {
  }
  SeePassword(text:string){
    if(text=='password'){
      this.IsPassword=!this.IsPassword;
    }else{
      this.IsConfirmationPassword=!this.IsConfirmationPassword;
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
      this.toastService.presentToastError("¡Formulario invalido!")
    }
  }

  getformHasError(field:string,rule:string){
    return this.registerForm.get(field)?.hasError(rule);
  }
  getFormHasTouch(field:string){
    return this.registerForm.get(field)?.touched;
  }
}
