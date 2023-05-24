import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/misc';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users = new BehaviorSubject<User[]>([]); // behavior subject is a special type of observable that allows us to set the initial value of the observable

  // because of security reasons we don't want to expose the behavior subject as it is. We want to expose it as an observable.

  // create a getter for the users$ observable
  get users$() {
    return this._users.asObservable(); // return the users$ observable
  }

  constructor() {
    this.loadUsers(); // load the users from the local storage
  }

  // create a method to insert an user in the users$ observable
  addUser(user: User) {
    const users = this._users.getValue(); // get the current value of the users$ observable

    user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1; // set the id of the new user to the last id of the users array + 1

    users.push(user); // push the new user to the users array
    this._users.next(users); // set the new value of the users$ observable

    // save the users in the local storage
    this.saveUsers();
  }

  // create a method to update an user in the users$ observable
  updateUser(user: User) {
    const users = this._users.getValue(); // get the current value of the users$ observable
    const index = users.findIndex((u) => u.id === user.id); // find the index of the user to be updated
    users[index] = user; // update the user
    this._users.next(users); // set the new value of the users$ observable

    // this is the same as the 3 lines above but with the map operator
    // this.users$.next(
    //   this.users$.getValue().map((u) => (u.id === user.id ? user : u))
    // );

    // save the users in the local storage
    this.saveUsers();
  }

  // create a method to delete an user in the users$ observable
  deleteUser(id: number) {
    const users = this._users.getValue(); // get the current value of the users$ observable
    const index = users.findIndex((u) => u.id === id); // find the index of the user to be deleted
    users.splice(index, 1); // delete the user
    this._users.next(users); // set the new value of the users$ observable

    // this is the same as the 3 lines above but with the filter operator
    // this.users$.next(this.users$.getValue().filter((u) => u.id !== id));

    // save the users in the local storage
    this.saveUsers();
  }

  // create a method to get an user in the users$ observable
  getUser(id: number) {
    return this._users.pipe(
      map((users) => users.find((u) => u.id === id)) // find the user with the given id
    );
  }

  // create a method to save the user list in the local storage
  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this._users.getValue())); // set the users array in the local storage
  }

  // create a method to get the user list from the local storage
  loadUsers() {
    const users = localStorage.getItem('users'); // get the users array from the local storage
    if (users) {
      this._users.next(JSON.parse(users)); // set the users array in the users$ observable
    }
  }
}
