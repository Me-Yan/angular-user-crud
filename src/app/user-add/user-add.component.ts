import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  display;  // control the modal

  userForm: FormGroup;

  createForm() {
    this.userForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(16)
        ]
      ],
      age: [
        '',
        [
          Validators.required,
          Validators.pattern('/^([0-9]|([1-9][0-9])|([1-9][0-9]{2}))$/')
        ]
      ],
      sex: [
        '',
        [
          Validators.required
        ]
      ],
      area: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  submitForm() {
    this.display = true;
  }

  onConfirmModal(event) {
    if (event) {
      if (this.userForm.valid) {
        this.display = event;
        console.log(this.userForm.value);
      }
    } else {
      this.display = event;
    }
  }

  ngOnInit() {
    this.display = false;
    this.createForm();
  }

}
