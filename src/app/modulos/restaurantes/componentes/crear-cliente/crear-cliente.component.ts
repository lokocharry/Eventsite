import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from "../../../../core/servicios/cliente.service";
import { BloqueoService } from "../../../../core/servicios/block.service";
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';

declare var google;

@Component({
	selector: 'crear-cliente',
	templateUrl: './crear-cliente.component.html',
	styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

	public geocoder = new google.maps.Geocoder();
	@ViewChild(Password, { static: false })
	public password: Password;

	public form: FormGroup;
	public valoresIniciales: any;

	public options: any;
	public overlays: any[];

	constructor(private fb: FormBuilder, private clienteService: ClienteService, private bloqueoService: BloqueoService, private messageService: MessageService) {
		this.crearControlesFormulario();
	}

	ngOnInit() {
		this.options = {
			center: { lat: 4.713063477449131, lng: -74.0688947715385 },
			zoom: 6,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	}

	async handleMapClick(event) {
		this.overlays = [
			new google.maps.Marker({ position: { lat: event.latLng.lat(), lng: event.latLng.lng() }, title: "Ubicación" }),
		];
		await this.geocodeDireccion({ lat: this.overlays[0].position.lat(), lng: this.overlays[0].position.lng() }, this.geocoder).then(
			(response: any[]) => {
				const direccion = response.filter(e => e.types.includes('street_address'))[0];
				this.form.get('location')['controls'].address.setValue(direccion.formatted_address.split(',')[0].trim());
				this.form.get('city')['controls'].long_name.setValue(direccion.address_components.filter(e => e.types.includes('locality'))[0].long_name);
				this.form.get('country')['controls'].long_name.setValue(direccion.address_components.filter(e => e.types.includes('country'))[0].long_name);
				this.form.get('location')['controls'].latitude.setValue(direccion.geometry.location.lat());
				this.form.get('location')['controls'].longitude.setValue(direccion.geometry.location.lng());
			},
			error => {
				console.log(error);
			}
		);
	}

	crearControlesFormulario() {
		this.form = this.fb.group({
			user: this.fb.group({
				first_name: ['', [Validators.required, Validators.minLength(3)]],
				last_name: ['', [Validators.required, Validators.minLength(3)]],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(6)]],
				phone: [''],
			}),
			customer: this.fb.group({
				name: ['', [Validators.required, Validators.minLength(3)]],
				service_delivery: [false, Validators.required],
				service_take_away: [false, Validators.required],
				service_book: [false, Validators.required],
				service_table: [false, Validators.required],
				number_of_branches: [null, Validators.required]
			}),
			location: this.fb.group({
				latitude: ['', Validators.required],
				longitude: ['', Validators.required],
				address: ['', Validators.required],
			}),
			city: this.fb.group({
				long_name: ['', Validators.required],
			}),
			country: this.fb.group({
				long_name: ['', Validators.required],
			})
		});
		this.valoresIniciales = this.form.value;
	}

	geocodeDireccion(latlng, geocoder) {
		return new Promise(function(resolve, reject) {
			geocoder.geocode({ location: latlng },
				(
					results,
					status
				) => {
					if (status === "OK") {
						resolve(results)
					} else {
						reject(new Error('No se pudo encontrar la ubicación ' + latlng));
					}
				}
			);
		})
	}

	guardarRestaurante() {
		this.bloqueoService.cambiarEstadoBloqueo(true);
		this.bloqueoService.cambiarTextoBloqueo('Creando CLiente');
		this.clienteService.post(this.form.value).then(
			_response => {
				this.messageService.add({ severity: 'success', summary: 'Restaurantes', detail: 'Cliente creado correctamente' });
				this.form.reset(this.valoresIniciales);
				this.password.value = null;
				this.bloqueoService.cambiarEstadoBloqueo(false);
			},
			error => {
				this.bloqueoService.cambiarEstadoBloqueo(false);
				this.messageService.add({ severity: 'error', summary: 'Restaurantes', detail: 'Error al crear Cliente' });
				console.log(error);
			}
		);
	}

}
