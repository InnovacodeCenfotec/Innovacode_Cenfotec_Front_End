import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IImage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService<IImage>{
  protected override source: string = 'cloudinary/'; 
  private imageListSignal = signal<IImage[]>([]);

  get images$() {
    return this.imageListSignal;
  }

  getAllImagesByUserId(userId: number): void {
    this.http.get<IImage[]>(`${this.source}user/${userId}`).subscribe({
      next: (response: IImage[]) => {
        this.imageListSignal.set(response);  // Actualiza la señal con las imágenes recibidas
      },
      error: (error: any) => {
        console.error('Error fetching images:', error);
      }
    });
  }
  
  

}
