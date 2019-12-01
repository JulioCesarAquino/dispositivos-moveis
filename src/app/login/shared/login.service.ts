import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Login } from './login';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFireDatabase) { }

  insert(contato: Login) {
    this.db.list('login').push(contato)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(contato: Login, key: string) {
    this.db.list('login').update(key, contato)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAll() {
    return this.db.list('login')
      .snapshotChanges()
      .pipe(map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`contato/${key}`).remove();
  }
}
