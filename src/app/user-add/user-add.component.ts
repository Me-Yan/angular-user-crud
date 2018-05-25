import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  display;  // control the modal

  userForm: FormGroup;

  createForm() {
    this.userForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(16),
          this.validateNameIsExist
        ]
      ],
      age: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9]|[1-9][0-9]|1[0-9]{2})$')
        ]
      ],
      sex: [
        '男',
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

  validateNameIsExist(formControl: FormControl) {
    const nameField = formControl.value;
    if (!nameField) {
      return {
        validateNameIsExist: {
          valid: true
        }
      };
    }

    let userInfoList: UserModel[];
    this.userService.listUser().subscribe(data => {
      userInfoList = data;
    });

    let flag = false;
    for (const userItem of userInfoList) {
      if (nameField === userItem.name) {
        flag = true;
        break;
      }
    }

    if (flag) {
      return {
        validateNameIsExist: {
          valid: false
        }
      };
    } else {
      return {
        validateNameIsExist: {
          valid: true
        }
      };
    }
  }

  ngOnInit() {
    this.display = false;
    this.createForm();
  }

}
