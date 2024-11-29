import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil, WebcamModule } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [CommonModule, WebcamModule]
})
export class CameraComponent {
  public showWebcam = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  public videoOptions: MediaTrackConstraints = {

  };
  public errors: WebcamInitError[] = [];

  public webcamImages: WebcamImage[] = [];  
  public croppedImage: string | null = null; 
  public textContent: string = '';  
  public selectedTheme: string = ''; 

  private trigger: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService,  private imageService: ImageService ) {}

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    // Agregar la nueva imagen a la lista de imágenes
    this.webcamImages.push(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get videoWidth(): number {
    return typeof this.videoOptions.width === 'number'
      ? this.videoOptions.width
      : this.videoOptions.width?.ideal ?? 1280;
  }

  public get videoHeight(): number {
    return typeof this.videoOptions.height === 'number'
      ? this.videoOptions.height
      : this.videoOptions.height?.ideal ?? 720;
  }

  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    const mime = arr[0]?.match(/:(.*?);/)?.[1] ?? '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }


  public downloadImage(): void {
    if (this.webcamImages.length > 0) {
      const latestImage = this.webcamImages[this.webcamImages.length - 1]; 
      const link = document.createElement('a');
      link.href = latestImage.imageAsDataUrl;
      link.download = 'magicbooth-webcam-image.png';
      link.click();
    } else {
      console.log('No image to download');
    }
  }

  public uploadImage(): void {
     if (this.webcamImages.length > 0) { 
      const latestImage = this.webcamImages[this.webcamImages.length - 1];
       const imageBlob = this.dataURLtoBlob(latestImage.imageAsDataUrl); 
       const imageFile = new File([imageBlob], 'webcam-image.png', { type: imageBlob.type });
        this.authService.uploadImage(imageFile).subscribe( 
          (response) => { console.log('Image uploaded successfully', response);
          },
          (error) => { console.error('Error uploading image', error); 
          } 
        ); 
        } else {
               console.log('No image to upload');
        } 
    }

}