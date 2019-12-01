import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { Register } from './shared/register';
import { RegisterService } from './shared/register.service';
import { RegisterDataService } from './shared/register-data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.sass'],
})
export class RegisterPage implements OnInit {

  register: Register;
  key = '';

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Campo obrigatorio.' },
      { type: 'pattern', message: 'Entre com um email valido .' }
    ],
    password: [
      { type: 'required', message: 'Campo obrigatorio.' },
      { type: 'minlength', message: 'A senha deve ter mais de 5 caracteres.' }
    ],
    isTeacher: [
      { type: 'required', message: 'Campo obrigatorio.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private registerDataService: RegisterDataService,
    public alertController: AlertController
  ) { }

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
      isTeacher: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.register = new Register();
    this.registerDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) {
        this.register = new Register();
        this.register.isTeacher = data.contato.nome;
        this.key = data.key;
      }
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.registerService.insert(this.register);
        this.register = new Register();
        this.presentAlert();
        this.navCtrl.back();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      subHeader: 'Bem vindo!',
      message: 'Conta criada com sucesso! Favor logar!',
      buttons: ['Fechar']
    });

    await alert.present();
  }

}
