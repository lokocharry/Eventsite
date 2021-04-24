import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRestaurantesComponent } from './crud-restaurantes.component';

describe('CrudRestaurantesComponent', () => {
	let component: CrudRestaurantesComponent;
	let fixture: ComponentFixture<CrudRestaurantesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CrudRestaurantesComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CrudRestaurantesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
