import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.sass']
})
export class TabsPage implements OnInit {

  isTeacheFlag;

  constructor(private storage: Storage) {}

  ngOnInit(): void {
    this.storage.get('isteacher').then(res => {
      this.isTeacheFlag = res;
    });
  }
}
