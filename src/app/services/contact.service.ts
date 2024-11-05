import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base-service';
import { IContact, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService<IContact> {
  protected override source: string = 'contact/sendEmail'; 
  private contactListSignal = signal<IContact[]>([]); //Lista vacias para que nuestro codigo de componente reacciona a los cambios

  get contact$()  { //Obtener el valor de signal cada vez que cambia
    return this.contactListSignal;
  }

  public search: ISearch = { 
    page: 1,
    size: 10
  }
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);

  sendEmail(contact: IContact) {
    this.add(contact).subscribe({
      next: (response:any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred sending the email','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    })
  }

  /*sendEmail(contactForm: any): Observable<any>  {
    return this.http.post("http:/localhost:8080/api/contact/email", contactForm)
  }*/

}
