import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from '../../../services/file-upload.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { IUser } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent {

  avatarUrl: string = '../../../../assets/img/profile.png'; // Imagen predeterminada
  selectedFile: File | null = null;
  activities: any;
  url?: string;
  name: any;
  lastname: any;
  phoneNumber: any;
  address: any;
  biography: any;
  password: any;
  confirmPassword: any;

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('name') nameModel!: NgModel;
  @ViewChild('lastname') lastnameModel!: NgModel;
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;
  @ViewChild('confirmPassword') confirmPasswordModel!: NgModel;

  public user: IUser = {password: '', confirmPassword: ''}
  public profileService = inject(ProfileService);
  public signUpError!: String;
  public validSignup!: boolean;
  public isSubmitting = false;

  constructor(private http: HttpClient, private fileUploadService : FileUploadService, private router: Router, private authService: AuthService) {
    this.profileService.getUserInfoSignal();
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToProfile(): void {
    this.router.navigate(['/app/profile']);
  }

  upload($event: Event) {
    throw new Error('Method not implemented.');
  }

   // Disparar el input oculto
   triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Manejar el archivo seleccionado
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Actualizar vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Subir la imagen al backend
      this.uploadImage();
    }
  }

  // Subir la imagen al backend
  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile);

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        this.url = response.url;
        // Actualizar la URL en el perfil del usuario 
        this.avatarUrl = response.url ?? '../../../../assets/img/profile.png'; // Default to placeholder image
        console.log('Imagen subida con éxito:', this.url);
        },
      error: (err) => console.error('Error al subir la imagen:', err),
    })
  }

  public handleSignup(event: Event) {
    event.preventDefault();
    [this.nameModel, this.lastnameModel, this.emailModel, this.passwordModel, this.confirmPasswordModel].forEach(model => {
      if (!model.valid) {
        model.control.markAsTouched();
      }
    });

    const passwordsMatch = this.user.password === this.user.confirmPassword;
    if (!passwordsMatch) {
      this.signUpError = "Passwords do not match";
      return;
    }else {
      this.signUpError = "";
    }

    if (this.nameModel.valid && this.lastnameModel.valid && this.emailModel.valid && this.passwordModel.valid && passwordsMatch) {
      this.isSubmitting = true;
      this.authService.signup(this.user).subscribe({
        next: () => {
          this.validSignup = true;
          this.isSubmitting = false;
        },
        error: (err: any) => {
          this.signUpError = err.description;
          this.isSubmitting = false;
        },
      });
    }
  }
}
