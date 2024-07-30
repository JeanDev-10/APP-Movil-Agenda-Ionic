import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mail,
  logOutOutline,
  eyeOffOutline,
  eyeOutline,
  pencilOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/core/services/user.service';
import { Data } from 'src/app/auth/models/auth.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private _userService = inject(UserService);
  registerForm!: FormGroup;
  isEditing: boolean = false;
  backUpForm: any;
  userInformation!: Data;
  @Output() avatarName = new EventEmitter<{
    firstName: string;
    lastName: string;
  }>();
  constructor() {
    this.registerRegisterForm();
    this.registerIcons();
    this.getUserInformationApi();
    this.registerForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(),
        distinctUntilChanged(
          (prev, curr) =>
            prev.firstName === curr.firstName && prev.lastName === curr.lastName
        )
      )
      .subscribe((values) => {
        this.avatarName.emit({
          firstName: values.firstName,
          lastName: values.lastName,
        });
      });
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this._userService.editProfile(this.registerForm.value).subscribe({
        next: () => {
          this.toastService.presentToastSucess('¡Perfil actualizado!');
          this.setInformationProfile({
            firstname: this.firstName?.value,
            lastname: this.lastName?.value,
          });
          this.isEditing = false;
          this.registerForm.disable();
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.isEditing = !this.isEditing;
      this.registerForm.enable();
      this.toastService.presentToastError('¡Formulario inválido!');
    }
  }
  getformHasError(
    form: FormGroup,
    field: string,
    rule: string
  ): boolean | undefined {
    return form.get(field)?.hasError(rule);
  }
  getFormHasTouch(form: FormGroup, field: string): boolean | undefined {
    return form.get(field)?.touched;
  }
  private registerRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.registerForm.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.registerForm.enable();
    } else {
      this.onSubmit();
    }
  }
  cancelEdit() {
    this.isEditing = false;
    this.registerForm.disable();
    this.registerForm.reset(this.backUpForm);
  }
  private registerIcons() {
    addIcons({
      personOutline,
      mail,
      logOutOutline,
      eyeOffOutline,
      eyeOutline,
      pencilOutline,
      closeCircleOutline,
    });
  }
  private getUserInformationApi() {
    this._userService
      .profile()
      .pipe(map((res) => res.data))
      .subscribe({
        next: (data) => {
          this.userInformation = data;
          this.setInformationProfile(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  private setInformationProfile(data: any) {
    const initialData = {
      firstName: data?.firstname,
      lastName: data?.lastname,
    };
    this.registerForm.patchValue(initialData);
    this.backUpForm = { ...initialData };
  }
}
