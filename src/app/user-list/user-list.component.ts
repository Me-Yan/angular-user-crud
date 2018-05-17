import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {

    constructor(private userService: UserService) { }

    userList: UserModel[];

    ngOnInit() {
        this.userService.listUser().subscribe(
            data => {
                this.userList = data;
            }
        );
    }
}
