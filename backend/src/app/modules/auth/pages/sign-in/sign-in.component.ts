import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  formLogin!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  errorMessage:string = '';

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.formLogin.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async login() {
    this.submitted = true;
    this.errorMessage = '';

    const { username, password } = this.formLogin.value;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }

    try {
      const res = await axios.post(`${environment.api_url}/auth/login`, {
        username: username,
        password: password,
      }, {
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        }
      });
      const data = await res.data;
      if (!data.status) {
        this.errorMessage = data.error_message;
        window.scrollTo(0,0);

        setTimeout(() => {
          this.errorMessage = '';
        }, 1500);

        return;
      }

      const token = data.token;
      window.localStorage.setItem(environment.api_token_identifier, token);
      console.log('mausk')
      this._router.navigateByUrl('/dashboard');
      console.log('mausk2')
    } catch (error) {
      console.log(error);
      this.errorMessage = 'Sorry, something went wrong. Please try again later!';
    }
  }
}
