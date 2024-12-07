import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IContact } from '../../../interfaces';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  @Input() title: string = '';
  @Input() contactForm!: FormGroup;
  @Output() callSendMethod: EventEmitter<IContact> = new EventEmitter<IContact>();


  sendEmail() {
    console.log('Save button clicked')
    let contact: IContact = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      subject: this.contactForm.controls['subject'].value,
      message: this.contactForm.controls['message'].value
    }
    this.callSendMethod.emit(contact);
  }
}
