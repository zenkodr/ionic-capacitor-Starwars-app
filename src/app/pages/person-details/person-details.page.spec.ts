//referred to https://github.com/herbae/starwarsapp, for some of the code on this page, but later altered it
// also referred to tutorials from https://ionicacademy.com/ionic-crash-course/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonDetailsPage } from './person-details.page';

describe('PersonDetailsPage', () => {
  let component: PersonDetailsPage;
  let fixture: ComponentFixture<PersonDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
