import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  usersChanged = new Subject<User[]>();
  user: User = new User("nachocarazo18@gmail.com", "password");

  constructor() {}

}
