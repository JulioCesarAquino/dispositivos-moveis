import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { LoginService } from './shared/login.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private storage: Storage,
  ) { }

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  errorMessage = '';
  login: Observable<any>;

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Campo obrigatorio.' },
      { type: 'pattern', message: 'Entre com um email valido .' }
    ],
    password: [
      { type: 'required', message: 'Campo obrigatorio.' },
      { type: 'minlength', message: 'A senha deve ter mais de 5 caracteres.' }
    ]
  };

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        // console.log(res);
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/register/' + userId).once('value').then((snapshot) => {
          if (snapshot.val().isTeacher === true) {
            this.navCtrl.navigateForward('/explain-teacher');
            this.storage.set('isteacher', '1');
          } else if (snapshot.val().isTeacher === false) {
            this.storage.set('isteacher', '0');
            this.navCtrl.navigateForward('/explain');
          }
        });
        this.errorMessage = '';
      }, err => {
        this.errorMessage = err.message;
      });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
