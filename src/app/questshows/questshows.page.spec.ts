import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestshowsPage } from './questshows.page';

describe('QuestshowsPage', () => {
  let component: QuestshowsPage;
  let fixture: ComponentFixture<QuestshowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestshowsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestshowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
