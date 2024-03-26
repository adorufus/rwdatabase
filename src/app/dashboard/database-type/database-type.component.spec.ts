import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTypeComponent } from './database-type.component';

describe('DatabaseTypeComponent', () => {
  let component: DatabaseTypeComponent;
  let fixture: ComponentFixture<DatabaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatabaseTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
