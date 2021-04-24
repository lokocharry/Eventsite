import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestaurantesModule } from "./modulos/restaurantes/restaurantes.module";
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutes,
		HttpClientModule,
		RestaurantesModule,
		BlockUIModule,
		ToastModule,
		ConfirmPopupModule,
		MenubarModule
	],
	providers: [
		MessageService,
		ConfirmationService,
		PrimeNGConfig
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
