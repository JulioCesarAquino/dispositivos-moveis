import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterDataService {

  private contatoSource = new BehaviorSubject({ contato: null, key: '' });
  currentContato = this.contatoSource.asObservable();

  constructor() { }

  changeContato(contato: Register, key: string) {
    this.contatoSource.next({ contato, key });
  }
}
