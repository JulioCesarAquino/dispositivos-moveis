import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterQuestPage } from './register-quest.page';

describe('register-questPage', () => {
  let component: RegisterQuestPage;
  let fixture: ComponentFixture<RegisterQuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterQuestPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterQuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
