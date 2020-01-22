import { Injectable } from '@angular/core';
import {HttpConfiguration} from "../app-commons/helpers/http-configuration";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
	private actionUrl: string;

	constructor(private http: HttpClient, private configuration: HttpConfiguration) {
		this.actionUrl = configuration.serverWithApiUrl;
	}

	public Get<T>(url: string, options?: any): Observable<T | HttpEvent<T>> {
		return this.http.get<T>(`${this.actionUrl}/${url}`, options);
	}

	public GetSingle<T>(entity: string, id: string): Observable<T> {
		return this.http.get<T>(`${this.actionUrl}/${entity}/${id}`);
	}

	public Post<T>(entity: string, payload: any, headers?: any): Observable<any> {
		return this.http.post<T>(`${this.actionUrl}/${entity}`, payload, headers);
	}

	public Put<T>(entity: string, id: string, itemToUpdate: any): Observable<T> {
		return this.http.put<T>(`${this.actionUrl}/${entity}/${id}`, itemToUpdate);
	}

	public Delete<T>(url: string): Observable<T> {
		return this.http.delete<T>(`${this.actionUrl}/${url}`);
	}
}
