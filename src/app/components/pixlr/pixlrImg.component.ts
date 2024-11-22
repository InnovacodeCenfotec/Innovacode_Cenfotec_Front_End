import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Editor } from '@pixlrlte/pixlr-sdk';

@Component({
  selector: 'app-pixlr',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pixlrImg.component.html',
  styleUrls: ['./pixlrImg.component.scss']
})
export class PixlrComponent  {
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;
  uploadedFileName: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('/api/images/upload', formData).subscribe({
      next: (response) => {
        this.uploadedImageUrl = response.imageUrl; // URL returned by backend
        this.uploadedFileName = response.fileName;
      },
      error: (err) => {
        console.error('Upload failed:', err);
      },
    });
  }

}
