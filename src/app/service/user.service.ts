import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: User[] = [{
    id: 1,
    name: "Disha",
    email: "disha220598@gmailcom",
    address: "ABC",
    class: "10A",
    phoneNumber: "123456789",
    isActive: true
  }];

  constructor() { }

  getUsers(){
    return this.userList;
  }

  getUserById(id: number){
    return this.userList.find(x => x.id == id);
  }

  addUser(user: User){
    user.id = new Date().getTime();
    this.userList.push(user);
  }

  updateUser(user: User){
    const userIndex = this.userList.findIndex(x => x.id == user.id);
    if(userIndex != null && userIndex != undefined){
      this.userList[userIndex] = user;
    }
  }

  removeUser(id:number){
    this.userList = this.userList.filter(x => x.id != id);
  }
}
