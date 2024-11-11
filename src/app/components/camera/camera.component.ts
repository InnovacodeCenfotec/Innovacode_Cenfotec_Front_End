import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil, WebcamModule } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };
  public errors: WebcamInitError[] = [];

  public webcamImage: WebcamImage | null = null;
  public croppedImage: string | null = null; 
  public textContent: string = '';  // Space for the text input
  public selectedTheme: string = '';  // For the theme selection

  private trigger: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

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
    this.webcamImage = webcamImage;
    this.uploadImage(webcamImage);
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

  private uploadImage(webcamImage: WebcamImage): void {
    const formData = new FormData();
    formData.append('image', this.dataURLtoBlob(webcamImage.imageAsDataUrl));

    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');

    this.http.post('api/yolo/detect', formData, { headers, responseType: 'blob' })
      .subscribe({
        next: (response: Blob) => {
          const urlCreator = window.URL || window.webkitURL;
          this.croppedImage = urlCreator.createObjectURL(response);
          console.log('Upload success');
        },
        error: (error) => {
          console.error('Upload error', error);
        }
      });
  }


  public generateBackground(): void {
    console.log('Generating background...');
    // Logic for generating background
  }

  public generateTheme(): void {
    console.log('Generating theme...');
    // Logic for generating theme
  }

  public generateAI(): void {
    console.log('Generating content with AI...');
    // Logic for AI generation
  }

  public downloadImage(): void {
    if (this.webcamImage) {
      const link = document.createElement('a');
      link.href = this.webcamImage.imageAsDataUrl;
      link.download = 'webcam-image.png';
      link.click();
    } else {
      console.log('No image to download');
    }
  }

  public shareImage(): void {
    if (this.webcamImage) {
      console.log('Sharing image...');
      // Logic for sharing the image
    } else {
      console.log('No image to share');
    }
  }

  public uploadImageFromFile(): void {
    if (this.webcamImage) {
      console.log('Uploading image...');
      // Logic for sharing the image
    } else {
      console.log('No image to upload');
    }
  }

  public onThemeChange(event: any): void {
    this.selectedTheme = event.target.value;
    console.log('Selected theme:', this.selectedTheme);
    // Apply the theme (you can implement actual theme changes here)
  }
}

