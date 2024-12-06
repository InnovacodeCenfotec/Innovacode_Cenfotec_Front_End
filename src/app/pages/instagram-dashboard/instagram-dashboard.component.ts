import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IImage } from '../../interfaces';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-instagram-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-dashboard.component.html',
  styleUrls: ['./instagram-dashboard.component.scss']
})
export class InstagramDashboardComponent implements OnInit {
  images$ = this.imageService.images$;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllImages(); 
  }

  likeImage(imageId: number): void {
    this.imageService.postLike(imageId);
    const updatedImages = this.imageService.images$().map(image => {
      if (image.id === imageId) {
        const updatedImage = { ...image, likes: (image.likesCount || 0) };
        console.log(`Imagen ${imageId} tiene ahora ${updatedImage.likes} likes`); 
        return updatedImage;
      }
      return image;
    });
  
    // Actualiza la señal de imágenes con los nuevos likes
    this.imageService.images$.set(updatedImages);

    this.imageService.getAllImages();
  }

}