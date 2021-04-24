import { Component } from '@angular/core';
import { BloqueoService } from './core/servicios/block.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public bloqueado: boolean;

	public textoBloqueo: string;

	public title = 'eventsite';

	items: MenuItem[];

	constructor(private bloqueoService: BloqueoService) {
		this.bloqueoService.estadoBloqueo.subscribe(estado => {
			this.bloqueado = estado;
		}
		);
		this.bloqueoService.textoBloqueo.subscribe(texto => {
			this.textoBloqueo = texto;
		}
		);
	}

	ngOnInit() {
		this.items = [
			{
				label: 'Menú',
				icon: 'pi pi-pw pi-file',
				expanded: true,
				items: [
					{ label: 'Crear Cliente', icon: 'pi pi-user-plus', routerLink: '/crear-cliente' },
					{ separator: true },
					{ label: 'CRUD Restaurantes', icon: 'pi pi-apple', routerLink: '/restaurantes' }
				]
			}
		];
	}
}
