import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RestauranteService {

	public apiRestaurantesUrl: string;

	constructor(private http: HttpClient) {
		this.apiRestaurantesUrl = environment.apiRestaurantesUrl;
	}

	cargarRestaurantes() {
		const url = this.apiRestaurantesUrl;
		return this.http.get<any>(url).toPromise();
	}

	crear(restaurante: any) {
		const url = this.apiRestaurantesUrl;
		return this.http.post<any>(url, restaurante).toPromise();
	}

	actualizar(restaurante: any, id: string) {
		const url = this.apiRestaurantesUrl + '/' + id;
		return this.http.put<any>(url, restaurante).toPromise();
	}

	eliminar(id: string) {
		const url = this.apiRestaurantesUrl + '/' + id;
		return this.http.delete<any>(url).toPromise();
	}

}
