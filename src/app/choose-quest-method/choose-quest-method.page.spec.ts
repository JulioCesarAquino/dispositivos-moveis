import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseQuestMethodPage } from './choose-quest-method.page';

describe('ChooseQuestMethodPage', () => {
  let component: ChooseQuestMethodPage;
  let fixture: ComponentFixture<ChooseQuestMethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseQuestMethodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseQuestMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
