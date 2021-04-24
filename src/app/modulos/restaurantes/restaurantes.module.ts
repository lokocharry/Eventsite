import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearClienteComponent } from './componentes/crear-cliente/crear-cliente.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { GMapModule } from 'primeng/gmap';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CrudRestaurantesComponent } from './componentes/crud-restaurantes/crud-restaurantes.component';
import { TableModule } from 'primeng/table';
import { FilterService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
	declarations: [
		CrearClienteComponent,
		CrudRestaurantesComponent,
		InicioComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputTextModule,
		CardModule,
		InputTextModule,
		PasswordModule,
		InputSwitchModule,
		CheckboxModule,
		InputNumberModule,
		KeyFilterModule,
		GMapModule,
		ButtonModule,
		TableModule,
		DialogModule,
		MessageModule
	],
	providers: [
		FilterService
	]
})
export class RestaurantesModule { }
