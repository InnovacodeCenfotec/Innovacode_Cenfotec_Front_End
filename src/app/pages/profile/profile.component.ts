import { ProfileService } from './../../services/profile.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
// import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
triggerFileInput() {
throw new Error('Method not implemented.');
}
upload($event: Event) {
throw new Error('Method not implemented.');
}
  url?: string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  avatarUrl: string = '../../../../assets/img/profile.png'; // Imagen predeterminada
  selectedFile: File | null = null;
  public profileService = inject(ProfileService);
activities: any;

//   constructor(private http: HttpClient) {
//     this.profileService.getUserInfoSignal();
//   } {}

//   upload(event: any) {
//     const file = event?.target.files[0];

//     if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         // Llama al servicio para subir el archivo
//         this.profileService.uploadFile(formData).subscribe({
//             next: (response) => {
//                 this.url = response.url; // Actualiza la URL recibida del backend
//                 console.log('Imagen subida con éxito:', this.url);
//             },
//             error: (err) => console.error('Error al subir la imagen:', err),
//         });
//     }
// }


  //  // Disparar el input oculto
  //  triggerFileInput(): void {
  //   this.fileInput.nativeElement.click();
  // }

  // // Manejar el archivo seleccionado
  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.selectedFile = file;

  //     // Actualizar vista previa
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.avatarUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);

  //     // Subir la imagen al backend
  //     this.uploadImage();
  //   }
  // }

  // // Subir la imagen al backend
  // uploadImage(): void {
  //   if (!this.selectedFile) return;

  //   const formData = new FormData();
  //   formData.append('profilePicture', this.selectedFile);

  //   const uploadUrl = 'https://tu-backend-url.com/api/upload'; // Cambia esta URL

  //   this.http.post(uploadUrl, formData).subscribe({
  //     next: (response) => console.log('Imagen subida con éxito:', response),
  //     error: (err) => console.error('Error al subir la imagen:', err),
  //   });
  // }
}
