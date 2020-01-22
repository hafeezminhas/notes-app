import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {RegisterUser} from "../models/register-user";
import {map} from "rxjs/operators";
import {Note} from "../models/note";
import {UrlSerializer} from "@angular/router";
import {SharedNote} from "../models/shared-note";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

	constructor(private http: HttpService) { }

	getNotes(page: number = 1, limit: number = 10, search?: string) {
		let url: any = `notes?page=${page}&limit=${limit}`;
		if(search) {
			url += `&search=${search}`;
		}
		console.log(url);
		return this.http.Get(url);
	}

	getNote(id: string) {
		return this.http.GetSingle(`notes`, id);
	}

	createNote(payload: Note) {
		return this.http.Post(`notes`, payload);
	}

	updateNote(id: string, payload: Note) {
		return this.http.Put(`notes`,id , payload);
	}

	deleteNote(id: string) {
		return this.http.Delete(`notes/${id}`);
	}

	getSharedNotes() {
		return this.http.Get(`users/sharednotes`);
	}

	shareNote(id: string, payload: SharedNote) {
		return this.http.Post(`notes/${id}/share`, payload);
	}
}
