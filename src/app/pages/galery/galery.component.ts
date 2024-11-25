import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage, IUser } from '../../interfaces';
import { UserService } from '../../services/user.service';
import { ImageComponent } from "../../components/image/image.component";
import { ImageGeneratorComponent } from "../../components/image-generator/image-generator.component";
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [ImageComponent, ImageGeneratorComponent],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss'
})
export class GaleryComponent {
  public userName: string = '';
  userId!: number;
  rows: IImage[][] = [];
  public imageList: IImage[] = [];
  service = inject(ImageService);
  private cdr = inject(ChangeDetectorRef);
  
  constructor(public router: Router) {
    let user = localStorage.getItem('auth_user');
    if(user) {
      this.userName = JSON.parse(user)?.name;
      this.userId = JSON.parse(user)?.id;
    } 
    let promise = new Promise(() => {
      this.service.getAllImagesByUserId(this.userId);
      effect(() => {
        this.rows = [];
        this.imageList = [];
        this.imageList = this.service.images$();
        this.splitPropiedadesIntoRows();
      });
    });
  }

  
  splitPropiedadesIntoRows(imageList: IImage[] = this.imageList) {
   
    this.rows = [];
    
    for (let i = 0; i < imageList.length; i += 3) {
      this.rows.push(imageList.slice(i, i + 3));
      
    }
    this.cdr.detectChanges();
  }
}
