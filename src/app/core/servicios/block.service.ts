import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class BloqueoService {

	private estadoBloqueoSource = new BehaviorSubject<boolean>(false);
	private textoBloqueoSource = new BehaviorSubject<string>('');

	public estadoBloqueo = this.estadoBloqueoSource.asObservable();
	public textoBloqueo = this.textoBloqueoSource.asObservable();

	constructor() { }

	cambiarEstadoBloqueo(estado: boolean) {
		this.estadoBloqueoSource.next(estado);
	}
	
	cambiarTextoBloqueo(texto: string) {
		this.textoBloqueoSource.next(texto);
	}

}