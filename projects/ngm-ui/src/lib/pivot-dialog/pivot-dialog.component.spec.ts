import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotDialogComponent } from './pivot-dialog.component';

describe('PivotDialogComponent', () => {
  let component: PivotDialogComponent;
  let fixture: ComponentFixture<PivotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
