import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTournoisComponent } from './liste-tournois.component';

describe('ListeTournoisComponent', () => {
  let component: ListeTournoisComponent;
  let fixture: ComponentFixture<ListeTournoisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTournoisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTournoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
