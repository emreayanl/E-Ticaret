import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductEditComponent } from './admin-product-edit';

describe('AdminProductEditComponent', () => {
  let component: AdminProductEditComponent;
  let fixture: ComponentFixture<AdminProductEditComponent>; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
