import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestauranteService } from "../../../../core/servicios/restaurante.service";
import { BloqueoService } from "../../../../core/servicios/block.service";
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'crud-restaurantes',
	templateUrl: './crud-restaurantes.component.html',
	styleUrls: ['./crud-restaurantes.component.scss']
})
export class CrudRestaurantesComponent implements OnInit {

	public form: FormGroup;
	public valoresIniciales: any;
	public restaurantes: any[];
	public restaurante: any;
	public mostarDialogoCrear: boolean;
	public mostarDialogoDetalle: boolean;
	public accion: string;
	public cargando: boolean;

	constructor(private fb: FormBuilder, private restauranteService: RestauranteService, private bloqueoService: BloqueoService, private messageService: MessageService, private confirmationService: ConfirmationService) {
		this.crearControlesFormulario();
	}

	ngOnInit() {
		this.cargarResataurantes();
	}

	cargarResataurantes() {
		this.cargando = true;
		this.restauranteService.cargarRestaurantes().then(
			response => {
				this.restaurantes = response;
				this.cargando = false;
			},
			error => {
				this.messageService.add({ severity: 'success', summary: 'Restaurantes', detail: 'Error al cargar Restaurantes' });
				this.cargando = false;
				console.log(error);
			}
		);
	}

	crearControlesFormulario() {
		this.form = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(3)]],
			service_delivery: [false, Validators.required],
			service_take_away: [false, Validators.required],
			service_book: [false, Validators.required],
			service_table: [false, Validators.required],
			number_of_branches: [null, Validators.required],
			address: [''],
		});
		this.valoresIniciales = this.form.value;
	}

	abrirDialogoFormulario(accion: string, restaurante?: any) {
		this.accion = accion;
		if (accion == 'PUT') {
			this.form.reset(restaurante);
			this.restaurante;
		} else {
			this.form.reset(this.valoresIniciales);
		}
		this.mostarDialogoCrear = true;
	}

	abrirDialogoDetalle(restaurante: any) {
		this.restaurante = restaurante;
		this.mostarDialogoDetalle = true;
	}

	guardarRestaurante() {
		this.bloqueoService.cambiarEstadoBloqueo(true);
		this.bloqueoService.cambiarTextoBloqueo('Guardando Restaurante');
		let request: Promise<any>;
		switch (this.accion) {
			case "POST":
				request = this.restauranteService.crear(this.form.value);
				break;
			case "PUT":
				request = this.restauranteService.actualizar(this.form.value, this.restaurante._id);
				break;
		}
		request.then(
			_response => {
				this.cargarResataurantes();
				this.mostarDialogoCrear = false;
				this.messageService.add({ severity: 'success', summary: 'Restaurantes', detail: 'Restaurante guardado correctamente' });
				this.bloqueoService.cambiarEstadoBloqueo(false);
			},
			error => {
				console.log(error);
				this.bloqueoService.cambiarEstadoBloqueo(false);
				this.messageService.add({ severity: 'error', summary: 'Restaurantes', detail: 'Error al guardar Restaurante' });
			}
		)
	}

	confirmatEliminarRestaurante(event, restaurante: any) {
		this.confirmationService.confirm({
			target: event.target,
			message: 'Desea eliminar este restaurante?',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Si',
			rejectLabel: 'No',
			accept: () => {
				this.eliminarRestaurante(restaurante)
			},
			reject: () => {

			}
		});
	}

	eliminarRestaurante(restaurante: any) {
		this.bloqueoService.cambiarEstadoBloqueo(true);
		this.bloqueoService.cambiarTextoBloqueo('Eliminando Restaurante');
		this.restauranteService.eliminar(restaurante._id).then(
			_response => {
				this.cargarResataurantes();
				this.mostarDialogoCrear = false;
				this.messageService.add({ severity: 'success', summary: 'Restaurantes', detail: 'Restaurante eliminado correctamente' });
				this.bloqueoService.cambiarEstadoBloqueo(false);
			},
			error => {
				console.log(error);
				this.bloqueoService.cambiarEstadoBloqueo(false);
				this.messageService.add({ severity: 'error', summary: 'Restaurantes', detail: 'Error al eliminar Restaurante' });
			}
		)
	}

}
