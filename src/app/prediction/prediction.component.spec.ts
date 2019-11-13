import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { predictionComponent } from './prediction.component';

describe('KpisComponent', () => {
  let component: predictionComponent;
  let fixture: ComponentFixture<predictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ predictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(predictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


