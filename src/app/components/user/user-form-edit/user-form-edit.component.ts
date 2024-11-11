import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form-edit.component.html',
  styleUrl: './user-form-edit.component.scss'
})
export class UserFormEditComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() userFormEdit!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() callUpdateMethod: EventEmitter<IUser> = new EventEmitter<IUser>();

  callSave() {
    let order: IUser = {
      email: this.userFormEdit.controls['email'].value,
      name: this.userFormEdit.controls['name'].value,
      lastname: this.userFormEdit.controls['lastname'].value,
      password: this.userFormEdit.controls['password'].value,
      updatedAt: this.userFormEdit.controls['updatedAt'].value,
    }
    if(this.userFormEdit.controls['id'].value) {
      order.id = this.userFormEdit.controls['id'].value;
    } 
    if(order.id) {
      this.callUpdateMethod.emit(order);
    } else {
      this.callSaveMethod.emit(order);
    }
  }
}
