import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassesPage } from './classes.page';

describe('classesPage', () => {
  let component: ClassesPage;
  let fixture: ComponentFixture<ClassesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
