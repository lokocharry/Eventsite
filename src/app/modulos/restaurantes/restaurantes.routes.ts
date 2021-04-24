import { Routes } from '@angular/router';
import { CrearClienteComponent } from "./componentes/crear-cliente/crear-cliente.component";
import { CrudRestaurantesComponent } from "./componentes/crud-restaurantes/crud-restaurantes.component";
import { InicioComponent } from './componentes/inicio/inicio.component';

export const restaurantesroutes: Routes = [
	{
		path: '', component: InicioComponent
	},
	{
		path: 'crear-cliente', component: CrearClienteComponent
	},
	{
		path: 'restaurantes', component: CrudRestaurantesComponent
	}
];
