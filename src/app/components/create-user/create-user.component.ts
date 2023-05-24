import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/misc';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  // model: User = new User(); // empty user

  // for semplicity we create a filled user
  model: User = {
    id: 0,
    name: 'John Doe' + Math.floor(Math.random() * 100).toString(),
    email:
      'john.doe@domain.' + Math.floor(Math.random() * 100).toString() + '.com',
    phone: Math.floor(Math.random() * 10000000000).toString(),
  };

  constructor(public userService: UserService) {}

  createUser() {
    this.userService.addUser(this.model); // add the user to the users$ observable
    // this.model = new User(); // reset the model

    // for semplicity we create a filled user
    this.model = {
      id: 0,
      name: 'John Doe' + Math.floor(Math.random() * 100).toString(),
      email:
        'john.doe@domain.' +
        Math.floor(Math.random() * 100).toString() +
        '.com',
      phone: Math.floor(Math.random() * 10000000000).toString(),
    };
  }
}
