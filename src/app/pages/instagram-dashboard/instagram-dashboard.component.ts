import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instagram-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-dashboard.component.html',
  styleUrl: './instagram-dashboard.component.scss'
})
export class InstagramDashboardComponent {
  images = [
    { src: '../../../../assets/img/gallery/gallery0.png', alt: 'Ejemplo 1' },
    { src: '../../../../assets/img/gallery/gallery1.png', alt: 'Ejemplo 2' },
    { src: '../../../../assets/img/gallery/gallery2.png', alt: 'Ejemplo 3' },
    { src: '../../../../assets/img/gallery/gallery3.png', alt: 'Ejemplo 4' },
    { src: '../../../../assets/img/gallery/gallery4.png', alt: 'Ejemplo 5' },
    { src: '../../../../assets/img/gallery/gallery5.png', alt: 'Ejemplo 6' },
    { src: '../../../../assets/img/gallery/gallery6.png', alt: 'Ejemplo 7' },
    { src: '../../../../assets/img/gallery/gallery7.png', alt: 'Ejemplo 8' },
    { src: '../../../../assets/img/gallery/gallery0.png', alt: 'Ejemplo 1' },
    { src: '../../../../assets/img/gallery/gallery1.png', alt: 'Ejemplo 2' },
    { src: '../../../../assets/img/gallery/gallery2.png', alt: 'Ejemplo 3' },
    { src: '../../../../assets/img/gallery/gallery3.png', alt: 'Ejemplo 4' },
    { src: '../../../../assets/img/gallery/gallery4.png', alt: 'Ejemplo 5' },
    { src: '../../../../assets/img/gallery/gallery5.png', alt: 'Ejemplo 6' },
    { src: '../../../../assets/img/gallery/gallery6.png', alt: 'Ejemplo 7' },
    { src: '../../../../assets/img/gallery/gallery7.png', alt: 'Ejemplo 8' }
  ];

  favorites: number[] = [];

  toggleFavorite(index: number): void {
    if (this.favorites.includes(index)) {
      this.favorites = this.favorites.filter(fav => fav !== index);
    } else {
      this.favorites.push(index);
    }
  }
}
