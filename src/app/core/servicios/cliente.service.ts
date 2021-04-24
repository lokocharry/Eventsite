import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ClienteService {

	constructor(private http: HttpClient) {

	}

	post(cliente: any) {
		const apiUrl = environment.apiUrl;
		let body: any = {};
		body.wizard = cliente;
		body.wizard.user.phone = { "code": "+57", "number": body.wizard.user.phone }
		return this.http.post<any>(apiUrl, body).toPromise();
	}

}
