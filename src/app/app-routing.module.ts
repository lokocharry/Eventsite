import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { restaurantesroutes } from "./modulos/restaurantes/restaurantes.routes";
const routes: Routes = [
	...restaurantesroutes
];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
