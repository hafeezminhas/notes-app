import { Injectable } from '@angular/core';
import {RegisterUser} from "../models/register-user";
import {HttpService} from "./http.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  register(payload: RegisterUser) {
  	return this.http.Post(`auth/signup`, payload);
  }

  searchUsers(search?: string) {
  	console.log(search);
  	if(search)
  		return this.http.Get(`users/search?search=${search}`);

  	return this.http.Get(`users/search`);
  }
}
