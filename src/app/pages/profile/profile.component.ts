import { FileUploadService } from './../../services/file-upload.service';
import { ProfileService } from './../../services/profile.service';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  avatarUrl: string = '../../../../assets/img/profile.png'; // Imagen predeterminada
  selectedFile: File | null = null;
  public profileService = inject(ProfileService);
  activities: any;
  url?: string;

  constructor(private http: HttpClient, private fileUploadService : FileUploadService, private router: Router) {
    this.profileService.getUserInfoSignal();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToProfileUpdate(): void {
    this.router.navigate(['/app/profile-update']);
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
}
