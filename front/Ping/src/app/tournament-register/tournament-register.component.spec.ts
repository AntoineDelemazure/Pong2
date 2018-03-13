import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentRegisterComponent } from './tournament-register.component';

describe('TournamentRegisterComponent', () => {
  let component: TournamentRegisterComponent;
  let fixture: ComponentFixture<TournamentRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
