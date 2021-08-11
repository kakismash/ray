import { SessionStorageService } from 'src/service/session-storage.service';
import { User } from 'src/model/user.model';
import { AuthService } from '../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!:            User;
  options!:         FormGroup;
  emailControl!:    FormControl;
  passwordControl!: FormControl;

  constructor(private fb:                    FormBuilder,
              private authService:           AuthService,
              private sessionStorageService: SessionStorageService,
              private router:                Router                 ) {

    this.user            = new User();
    this.emailControl    = new FormControl(this.user.email, [Validators.required]);
    this.passwordControl = new FormControl(this.user.password, [Validators.required]);
    this.options         = fb.group({
      email:    this.emailControl,
      password: this.passwordControl
    });
              }

  ngOnInit(): void {
  }

  login(): void {
    this.authService
        .login(this.user)
        .subscribe(user => {
          const o: User = new User();
          Object.assign(o, user);
          this.sessionStorageService.save(o);
          this.router.navigate(['/admin/store']);
        }, err => {
          console.log(err);
        });
  }

}
